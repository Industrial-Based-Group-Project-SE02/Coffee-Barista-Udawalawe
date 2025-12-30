import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User,
  TrendingUp,
  BookOpen,
  CheckCircle,
  XCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

const BlogList = () => {
  const [blogs] = useState([
    {
      _id: '1',
      title: 'The Art of Perfect Espresso',
      excerpt: 'Learn the secrets behind pulling the perfect shot...',
      category: 'Brewing Guide',
      author: 'Master Barista',
      status: 'published',
      publishedDate: '2024-01-15T10:30:00Z',
      readTime: 5,
      views: 1245,
      likes: 89,
      comments: 12,
      featuredImage: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=400'
    },
    {
      _id: '2',
      title: 'Health Benefits of Coffee',
      excerpt: 'Discover how your daily cup can boost your health...',
      category: 'Health Benefits',
      author: 'Dr. Wellness',
      status: 'published',
      publishedDate: '2024-01-10T14:20:00Z',
      readTime: 7,
      views: 2156,
      likes: 156,
      comments: 24,
      featuredImage: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400'
    },
    {
      _id: '3',
      title: 'Coffee Culture Around the World',
      excerpt: 'Explore how different cultures enjoy their coffee...',
      category: 'Coffee Stories',
      author: 'Coffee Explorer',
      status: 'draft',
      publishedDate: '2024-01-05T09:15:00Z',
      readTime: 8,
      views: 0,
      likes: 0,
      comments: 0,
      featuredImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400'
    },
  ]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-amber-500/20">
              <th className="p-4 text-left text-amber-300 font-semibold">Blog Post</th>
              <th className="p-4 text-left text-amber-300 font-semibold">Category</th>
              <th className="p-4 text-left text-amber-300 font-semibold">Status</th>
              <th className="p-4 text-left text-amber-300 font-semibold">Stats</th>
              <th className="p-4 text-left text-amber-300 font-semibold">Date</th>
              <th className="p-4 text-left text-amber-300 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b border-amber-500/10 hover:bg-amber-500/5">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img 
                        src={blog.featuredImage} 
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{blog.title}</h4>
                      <p className="text-amber-300/70 text-sm line-clamp-1">{blog.excerpt}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="w-3 h-3 text-amber-400" />
                        <span className="text-xs text-amber-300/60">{blog.author}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-sm">
                    {blog.category}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                    blog.status === 'published' 
                      ? 'bg-green-500/10 text-green-400 border-green-500/30'
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                  }`}>
                    {blog.status === 'published' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Eye className="w-3 h-3 text-amber-400" />
                      <span className="text-amber-300">{blog.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span className="text-amber-300">{blog.likes}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-amber-300 text-sm">
                    {formatDate(blog.publishedDate)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
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

export default BlogList;