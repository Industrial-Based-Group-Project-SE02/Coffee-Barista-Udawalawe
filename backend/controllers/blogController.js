import Blog from "../models/Blog.js";

// Create new blog (No admin check for now)
export const createBlog = async (req, res) => {
  try {
    console.log("Creating blog with data:", req.body);

    // Parse tags robustly: support JSON array string, comma list, or array
    let tags = [];
    if (req.body.tags) {
      if (Array.isArray(req.body.tags)) {
        tags = req.body.tags;
      } else if (typeof req.body.tags === 'string') {
        // Try parsing JSON like '["tag1","tag2"]'
        try {
          const parsed = JSON.parse(req.body.tags);
          if (Array.isArray(parsed)) {
            tags = parsed;
          } else {
            // fallback to comma split
            tags = req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
          }
        } catch (e) {
          tags = req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
        }
      }
    }

    // Determine featured image path from uploaded file if present
    let featuredImagePath = req.body.featuredImage || "/uploads/blogs/default.jpg";
    if (req.file && req.file.filename) {
      // store path consistent with static serving
      featuredImagePath = `/uploads/blogs/${req.file.filename}`;
    }

    // Generate a slug and ensure uniqueness
    const generateSlug = (title) => title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[^\n\w\s\-]/gi, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

       let baseSlug = req.body.title ? generateSlug(req.body.title) : `blog-${Date.now()}`;
    let slug = baseSlug;
    let suffix = 1;
    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${suffix++}`;
    }

    // Create blog with data from request body
    const blogData = {
      title: req.body.title,
      slug,
      content: req.body.content,
      excerpt: req.body.excerpt || (req.body.content ? req.body.content.substring(0, 150) + "..." : "Blog excerpt"),
      category: req.body.category || "Coffee Tips",
      tags,
      readTime: req.body.readTime || Math.max(1, Math.ceil((req.body.content || '').split(/\s+/).length / 200)),
      isPublished: req.body.isPublished !== undefined ? (req.body.isPublished === 'true' || req.body.isPublished === true) : true,
      featuredImage: featuredImagePath,
      author: req.body.author || "Coffee Barista Team"
    };

    console.log("Blog data to save:", blogData);

    const blog = new Blog(blogData);
    await blog.save();

    console.log("Blog saved successfully:", blog._id);

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: blog
    });
  } catch (error) {
    console.error("❌ Error creating blog:", error);

    // Handle duplicate key errors specifically
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate key error",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating blog",
      error: error.message,
      stack: error.stack // Added for debugging
    });
  }
};

// Get all published blogs (Public)
export const getAllBlogs = async (req, res) => {
  try {
    const { category, tag, page = 1, limit = 10 } = req.query;
    
    const query = { isPublished: true };
    
    if (category) query.category = category;
    if (tag) query.tags = tag;
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-content');
    
    const total = await Blog.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      blogs
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
      error: error.message
    });
  }
};

// Get single blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }
    
    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching blog",
      error: error.message
    });
  }
};

// Update blog (No admin check for now)
export const updateBlog = async (req, res) => {
  try {
    console.log("Updating blog ID:", req.params.id);
    console.log("Update data:", req.body);

    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    const updates = { ...req.body };

    // Parse tags like in create
    if (req.body.tags) {
      if (Array.isArray(req.body.tags)) {
        updates.tags = req.body.tags;
      } else if (typeof req.body.tags === 'string') {
        try {
          const parsed = JSON.parse(req.body.tags);
          updates.tags = Array.isArray(parsed) ? parsed : req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
        } catch (e) {
          updates.tags = req.body.tags.split(',').map(t => t.trim()).filter(Boolean);
        }
      }
    }

    // If a new file was uploaded, update featuredImage
    if (req.file && req.file.filename) {
      updates.featuredImage = `/uploads/blogs/${req.file.filename}`;
    }

    // If title changed, regenerate slug and ensure uniqueness
    if (req.body.title && req.body.title !== blog.title) {
      const generateSlug = (title) => title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[^\n\w\s\-]/gi, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

         let baseSlug = generateSlug(req.body.title);
      let slug = baseSlug;
      let suffix = 1;
      while (await Blog.findOne({ slug, _id: { $ne: req.params.id } })) {
        slug = `${baseSlug}-${suffix++}`;
      }
      updates.slug = slug;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Duplicate key error', error: error.message });
    }
    res.status(500).json({
      success: false,
      message: "Error updating blog",
      error: error.message
    });
  }
};

// Delete blog (No admin check for now)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    await blog.deleteOne();
    
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting blog",
      error: error.message
    });
  }
};

// Get blog statistics (No admin check for now)
export const getBlogStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ isPublished: true });
    const totalViews = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]);
    const popularBlogs = await Blog.find()
      .sort({ views: -1 })
      .limit(5)
      .select('title views slug');
    const categoryStats = await Blog.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalBlogs,
        publishedBlogs,
        totalViews: totalViews[0]?.totalViews || 0,
        popularBlogs,
        categoryStats
      }
    });
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching blog stats",
      error: error.message
    });
  }
};