// CreateBlogForm.jsx
import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, Bold, Italic, Eye, Calendar, Tag } from 'lucide-react';

const CreateBlogForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Coffee Tips',
    tags: [],
    featuredImage: '',
    isPublished: false,
    scheduledDate: '',
    status: 'draft'
  });

  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare final data for submission
    const blogData = {
      ...formData,
      readTime: Math.ceil(formData.content.split(/\s+/).length / 200), // Auto-calculate read time
      views: 0,
      likes: 0,
      comments: []
    };

    // If scheduled date is set, update status
    if (blogData.scheduledDate) {
      blogData.status = 'scheduled';
      blogData.isPublished = false;
    } else if (blogData.isPublished) {
      blogData.status = 'published';
      blogData.publishedDate = new Date();
    }

    // Call the onSubmit function passed as prop
    await onSubmit(blogData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="glass-strong rounded-2xl max-w-4xl w-full my-8 border border-amber-500/30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-amber-500/20">
          <h2 className="text-2xl font-bold text-white">Create New Blog Post</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-amber-500/10 transition-colors"
          >
            <X className="w-5 h-5 text-amber-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-amber-300 font-medium mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog title..."
                  className="w-full glass p-3 rounded-xl border border-amber-500/30 text-white placeholder-amber-300/50 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-amber-300 font-medium mb-2">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Brief summary of your blog post..."
                  className="w-full glass p-3 rounded-xl border border-amber-500/30 text-white placeholder-amber-300/50 focus:outline-none min-h-[80px]"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-amber-300 font-medium mb-2">Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your blog content here..."
                  className="w-full glass p-3 rounded-xl border border-amber-500/30 text-white placeholder-amber-300/50 focus:outline-none min-h-[200px]"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-amber-300 font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full glass p-3 rounded-xl border border-amber-500/30 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Coffee Tips">Coffee Tips</option>
                  <option value="Brewing Guide">Brewing Guide</option>
                  <option value="Health Benefits">Health Benefits</option>
                  <option value="Coffee Stories">Coffee Stories</option>
                  <option value="News">News</option>
                  <option value="Recipes">Recipes</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-amber-300 font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag..."
                    className="flex-1 glass p-3 rounded-xl border border-amber-500/30 text-white placeholder-amber-300/50 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                  />
                  <button
                    type="button"
                    onClick={handleTagAdd}
                    className="glass px-4 py-2 rounded-xl border border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
                  >
                    <Tag className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-amber-300 font-medium mb-2">Featured Image URL</label>
                <input
                  type="text"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full glass p-3 rounded-xl border border-amber-500/30 text-white placeholder-amber-300/50 focus:outline-none"
                />
              </div>

              {/* Scheduling */}
              <div>
                <label className="block text-amber-300 font-medium mb-2">Schedule Post</label>
                <input
                  type="datetime-local"
                  name="scheduledDate"
                  value={formData.scheduledDate}
                  onChange={handleChange}
                  className="w-full glass p-3 rounded-xl border border-amber-500/30 text-white focus:outline-none"
                />
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-amber-300">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="rounded border-amber-500/30 text-amber-500"
                  />
                  <span>Publish immediately</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl glass border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:from-amber-600 hover:to-orange-700 transition-all"
              >
                Save Blog Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogForm;