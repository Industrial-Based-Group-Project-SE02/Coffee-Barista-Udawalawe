import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Calendar, Clock, Eye, Tag, Share2, Bookmark, ChevronLeft, Coffee } from "lucide-react";

const BlogArticle = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/blogs/${slug}`);
      setBlog(response.data.blog);
      
      // Fetch related blogs
      const related = await axios.get("http://localhost:3000/api/blogs", {
        params: { category: response.data.blog.category, limit: 3 }
      });
      setRelatedBlogs(related.data.blogs.filter(b => b.slug !== slug));
    } catch (error) {
      console.error("Error fetching blog:", error);
      try { const toast = (await import('react-hot-toast')).default; toast.error('Unable to load article.'); } catch (e) { /* ignore */ }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-4"></div>
          <p className="text-amber-300 text-lg">Brewing the article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <Coffee className="w-16 h-16 text-amber-500/50 mx-auto mb-4" />
          <h2 className="text-3xl text-amber-200 mb-2">Article not found</h2>
          <p className="text-amber-300/70">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={`http://localhost:3000${blog.featuredImage}`}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                blog.category === "Coffee Tips" ? "bg-amber-500/30 text-amber-300" :
                blog.category === "Brewing Guide" ? "bg-orange-500/30 text-orange-300" :
                "bg-yellow-500/30 text-yellow-300"
              }`}>
                {blog.category}
              </span>
              <div className="flex items-center gap-4 text-amber-300/80 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {blog.readTime} min read
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {blog.views} views
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black text-amber-100 mb-6">
              {blog.title}
            </h1>
            
            <p className="text-xl text-amber-200/90 max-w-3xl">
              {blog.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-3xl p-8 border border-amber-500/20 mb-8">
            {/* Author & Actions */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-amber-500/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
                  {blog.author[0]}
                </div>
                <div>
                  <p className="text-amber-100 font-bold">{blog.author}</p>
                  <p className="text-amber-300/70 text-sm">Coffee Expert</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="p-3 rounded-full glass hover:bg-amber-500/20 transition-colors">
                  <Share2 className="w-5 h-5 text-amber-400" />
                </button>
                <button className="p-3 rounded-full glass hover:bg-amber-500/20 transition-colors">
                  <Bookmark className="w-5 h-5 text-amber-400" />
                </button>
              </div>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-amber-100 prose-p:text-amber-200/80 prose-strong:text-amber-300 prose-a:text-amber-400 hover:prose-a:text-amber-300 prose-li:text-amber-200/80">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-amber-500/20">
                <h3 className="text-lg font-bold text-amber-100 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, idx) => (
                    <span key={idx} className="flex items-center gap-1 glass px-3 py-2 rounded-full text-sm">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-amber-100 mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.slice(0, 3).map((related) => (
                  <a
                    key={related._id}
                    href={`/blog/${related.slug}`}
                    className="group glass-strong rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-400/40 transition-all"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={`http://localhost:3000${related.featuredImage}`}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-amber-100 mb-2 line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-amber-300/70 text-sm line-clamp-2">
                        {related.excerpt}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;