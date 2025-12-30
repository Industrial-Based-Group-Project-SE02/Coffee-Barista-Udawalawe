import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Plus, Edit, Trash2, Eye, Upload, X,
  Calendar, Clock, Tag, Search, Filter
} from "lucide-react";

const AdminBlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "Coffee Tips",
    tags: [],
    readTime: 5,
    isPublished: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/blogs", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Error fetching blogs. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting blog...', { formData, imageFile, editingBlog });

    // Client-side validation with toast messages instead of browser's required
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    if (!editingBlog && !imageFile) {
      toast.error('Please attach a featured image');
      return;
    }

    setSubmitting(true);
    const loadingToastId = toast.loading(editingBlog ? "Updating blog..." : "Creating blog...");

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === "tags") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      if (imageFile) {
        formDataToSend.append("featuredImage", imageFile);
      }

      if (editingBlog) {
        await axios.put(
          `http://localhost:3000/api/blogs/${editingBlog._id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          }
        );
        toast.success("Blog updated!", { id: loadingToastId });
      } else {
        await axios.post(
          "http://localhost:3000/api/blogs",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          }
        );
        toast.success("Blog created!", { id: loadingToastId });
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      const msg = error?.response?.data?.message || "Error saving blog";
      toast.error(msg, { id: loadingToastId });
    } finally {
      setSubmitting(false);
      toast.dismiss();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    const delToastId = toast.loading("Deleting blog...");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
      toast.success("Blog deleted!", { id: delToastId });
    } catch (error) {
      console.error("Error deleting blog:", error);
      const msg = error?.response?.data?.message || "Error deleting blog";
      toast.error(msg, { id: delToastId });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "Coffee Tips",
      tags: [],
      readTime: 5,
      isPublished: true
    });
    setImageFile(null);
    setPreviewImage("");
    setEditingBlog(null);
    setShowForm(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Blog Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-6 py-3 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          New Blog Post
        </button>
      </div>

      {/* Blog Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-stone-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingBlog ? "Edit Blog" : "Create New Blog"}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-stone-700 rounded-full"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-amber-300 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-stone-700 border border-amber-500/30 rounded-lg p-3 text-white"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-amber-300 mb-2">Category</label>
                  <select
                    className="w-full bg-stone-700 border border-amber-500/30 rounded-lg p-3 text-white"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Coffee Tips">Coffee Tips</option>
                    <option value="Brewing Guide">Brewing Guide</option>
                    <option value="Health Benefits">Health Benefits</option>
                    <option value="Coffee Stories">Coffee Stories</option>
                    <option value="News">News</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-amber-300 mb-2">Featured Image *</label>
                <div className="border-2 border-dashed border-amber-500/30 rounded-lg p-6 text-center">
                  {previewImage ? (
                    <div className="relative">
                      <img src={previewImage} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setPreviewImage("");
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                      <p className="text-amber-300">Click to upload image</p>
                      <p className="text-amber-300/70 text-sm">PNG, JPG, WebP (Max 5MB)</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-amber-300 mb-2">Excerpt</label>
                <textarea
                  className="w-full bg-stone-700 border border-amber-500/30 rounded-lg p-3 text-white h-24"
                  placeholder="Brief summary of the article..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-2">Content *</label>
                <textarea
                  required
                  className="w-full bg-stone-700 border border-amber-500/30 rounded-lg p-3 text-white h-64"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  className="w-full bg-stone-700 border border-amber-500/30 rounded-lg p-3 text-white"
                  placeholder="coffee, brewing, tips"
                  value={formData.tags.join(", ")}
                  onChange={(e) => setFormData({
                    ...formData,
                    tags: e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag)
                  })}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-amber-300 mb-2">Read Time (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full bg-stone-700 border border-amber-500/30 rounded-lg p-3 text-white"
                    value={formData.readTime}
                    onChange={(e) => setFormData({...formData, readTime: parseInt(e.target.value)})}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                    className="w-5 h-5"
                  />
                  <label htmlFor="isPublished" className="text-amber-300">
                    Publish immediately
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-amber-500/30 text-amber-300 rounded-lg hover:bg-amber-500/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-lg hover:from-amber-600 hover:to-orange-700 ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {submitting ? (editingBlog ? "Updating..." : "Creating...") : (editingBlog ? "Update Blog" : "Create Blog")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blogs Table */}
      <div className="glass-strong rounded-2xl overflow-hidden border border-amber-500/20">
        <table className="w-full">
          <thead className="bg-stone-800">
            <tr>
              <th className="text-left p-4 text-amber-300">Title</th>
              <th className="text-left p-4 text-amber-300">Category</th>
              <th className="text-left p-4 text-amber-300">Status</th>
              <th className="text-left p-4 text-amber-300">Views</th>
              <th className="text-left p-4 text-amber-300">Date</th>
              <th className="text-left p-4 text-amber-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b border-amber-500/10 hover:bg-stone-800/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`http://localhost:3000${blog.featuredImage}`}
                      alt={blog.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-white font-medium">{blog.title}</p>
                      <p className="text-amber-300/70 text-sm">{blog.excerpt?.substring(0, 50)}...</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    blog.category === "Coffee Tips" ? "bg-amber-500/20 text-amber-300" :
                    "bg-orange-500/20 text-orange-300"
                  }`}>
                    {blog.category}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    blog.isPublished 
                      ? "bg-green-500/20 text-green-300" 
                      : "bg-red-500/20 text-red-300"
                  }`}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-4 text-amber-300">{blog.views}</td>
                <td className="p-4 text-amber-300/70">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                      className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingBlog(blog);
                        setFormData({
                          title: blog.title,
                          content: blog.content,
                          excerpt: blog.excerpt,
                          category: blog.category,
                          tags: blog.tags || [],
                          readTime: blog.readTime,
                          isPublished: blog.isPublished
                        });
                        setPreviewImage(`http://localhost:3000${blog.featuredImage}`);
                        setShowForm(true);
                      }}
                      className="p-2 bg-amber-500/20 text-amber-300 rounded-lg hover:bg-amber-500/30"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogManager;