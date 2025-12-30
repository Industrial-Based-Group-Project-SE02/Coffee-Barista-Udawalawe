import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Calendar, Clock, Eye, Tag, ChevronRight, Search, Filter, Coffee } from "lucide-react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { id: "all", name: "All Topics", color: "amber" },
    { id: "Coffee Tips", name: "Coffee Tips", color: "orange" },
    { id: "Brewing Guide", name: "Brewing Guide", color: "yellow" },
    { id: "Health Benefits", name: "Health Benefits", color: "green" },
    { id: "Coffee Stories", name: "Coffee Stories", color: "red" },
    { id: "News", name: "News", color: "blue" }
  ];

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = { page: currentPage, limit: 9 };
      if (selectedCategory !== "all") params.category = selectedCategory;
      
      const response = await axios.get("http://localhost:3000/api/blogs", { params });
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      // show a user-friendly toast
      try { const toast = (await import('react-hot-toast')).default; toast.error('Unable to load blogs.'); } catch (e) { /* ignore */ }
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-950 via-stone-900 to-stone-950 py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <div className="flex items-center gap-3 text-amber-400 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
                <Coffee className="w-8 h-8" />
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Coffee Chronicles
            </h1>
            
            <p className="text-xl lg:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Discover stories, brewing tips, and the art behind every perfect cup. 
              Your journey to coffee mastery starts here.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative glass-strong rounded-2xl p-2 border border-amber-500/30 shadow-xl">
                <div className="flex items-center">
                  <Search className="w-6 h-6 text-amber-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Search articles, tips, and stories..."
                    className="w-full bg-transparent border-none outline-none px-4 py-4 text-amber-100 placeholder-amber-300/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-6 py-3 rounded-full font-bold transition-all ${
                selectedCategory === cat.id
                  ? `bg-gradient-to-r from-${cat.color}-500 to-${cat.color}-600 text-white shadow-lg scale-105`
                  : "glass text-amber-200 hover:bg-amber-500/20 hover:border-amber-500/40"
              } border border-amber-500/20`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            <p className="mt-4 text-amber-300">Brewing fresh content...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <Coffee className="w-16 h-16 text-amber-500/50 mx-auto mb-4" />
            <h3 className="text-2xl text-amber-200">No articles found</h3>
            <p className="text-amber-300/70">Try a different search or category</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog.slug}`}
                  className="group card-3d glass-strong rounded-3xl overflow-hidden border border-amber-500/20 hover:border-amber-400/40 transition-all duration-500 hover:shadow-2xl"
                >
                  {/* Featured Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={`http://localhost:3000${blog.featuredImage}`}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        blog.category === "Coffee Tips" ? "bg-amber-500/20 text-amber-300" :
                        blog.category === "Brewing Guide" ? "bg-orange-500/20 text-orange-300" :
                        "bg-yellow-500/20 text-yellow-300"
                      }`}>
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-amber-300/70 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(blog.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blog.readTime} min read
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-amber-100 mb-3 group-hover:text-amber-300 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-amber-200/70 mb-4 line-clamp-3">
                      {blog.excerpt || blog.content.substring(0, 150)}...
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {blog.tags?.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="flex items-center gap-1 text-xs bg-amber-500/10 text-amber-300 px-2 py-1 rounded">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-amber-400">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{blog.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="glass px-4 py-2 rounded-lg border border-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      currentPage === idx + 1
                        ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-500"
                        : "glass border-amber-500/20 hover:bg-amber-500/20"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="glass px-4 py-2 rounded-lg border border-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;