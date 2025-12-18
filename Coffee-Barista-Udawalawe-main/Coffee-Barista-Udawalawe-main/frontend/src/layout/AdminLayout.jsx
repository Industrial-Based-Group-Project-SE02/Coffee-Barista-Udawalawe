import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Coffee,
  BookOpen,
  FileText,
  Tag,
  Image,
  Calendar,
  TrendingUp
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      path: '/admin',
      color: 'blue'
    },
    {
      title: 'Blog Management',
      icon: <BookOpen className="w-5 h-5" />,
      path: '/admin/blog',
      color: 'amber',
      submenu: [
        { title: 'All Posts', path: '/admin/blog' },
        { title: 'Create New', path: '/admin/blog/create' },
        { title: 'Categories', path: '/admin/blog/categories' },
        { title: 'Comments', path: '/admin/blog/comments' },
      ]
    },
    {
      title: 'Users',
      icon: <Users className="w-5 h-5" />,
      path: '/admin/users',
      color: 'green'
    },
    {
      title: 'Products',
      icon: <Package className="w-5 h-5" />,
      path: '/admin/products',
      color: 'purple'
    },
    {
      title: 'Orders',
      icon: <ShoppingCart className="w-5 h-5" />,
      path: '/admin/orders',
      color: 'orange'
    },
    {
      title: 'Feedbacks',
      icon: <FileText className="w-5 h-5" />,
      path: '/admin/feedback',
      color: 'pink',
      submenu: [
        { title: 'All Feedbacks', path: '/admin/feedback' },
        { title: 'Visible', path: '/admin/feedback/visible' },
        { title: 'Hidden', path: '/admin/feedback/hidden' },
      ]
    },
    {
      title: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/admin/analytics',
      color: 'teal'
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings',
      color: 'gray'
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 to-stone-900">
      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-strong {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl glass border border-amber-500/30 text-amber-300"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 glass-strong border-r border-amber-500/20 
        transform transition-transform duration-300 z-40 overflow-y-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl blur-lg opacity-60"></div>
              <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-2xl">
                <Coffee className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-white">Coffee Barista</h1>
              <p className="text-amber-300/70 text-sm">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <div key={item.path}>
              <Link
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all
                  ${location.pathname.startsWith(item.path) 
                    ? `bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/20 text-${item.color}-300 border border-${item.color}-500/30` 
                    : 'text-amber-300/70 hover:text-amber-200 hover:bg-amber-500/10'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <div className={`${location.pathname.startsWith(item.path) ? `text-${item.color}-400` : 'text-amber-400'}`}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.title}</span>
              </Link>
              
              {/* Submenu for Blog Management */}
              {item.title === 'Blog Management' && location.pathname.startsWith('/admin/blog') && (
                <div className="ml-12 space-y-1 mt-1">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.path}
                      to={subitem.path}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
                        ${location.pathname === subitem.path 
                          ? 'bg-amber-500/10 text-amber-300' 
                          : 'text-amber-300/60 hover:text-amber-200'
                        }
                      `}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="w-1 h-1 rounded-full bg-amber-400"></div>
                      {subitem.title}
                    </Link>
                  ))}
                </div>
              )}

              {/* Submenu for Feedbacks */}
              {item.title === 'Feedbacks' && location.pathname.startsWith('/admin/feedback') && (
                <div className="ml-12 space-y-1 mt-1">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.path}
                      to={subitem.path}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
                        ${location.pathname === subitem.path 
                          ? 'bg-pink-500/10 text-pink-300' 
                          : 'text-amber-300/60 hover:text-amber-200'
                        }
                      `}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                      {subitem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Admin Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-amber-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <p className="text-white font-semibold">Admin User</p>
              <p className="text-amber-300/60 text-sm">admin@coffeebarista.lk</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 md:p-6 min-h-screen">
        {/* Top Bar */}
        <div className="glass-strong rounded-2xl p-4 mb-6 border border-amber-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-white">
                {location.pathname === '/admin' && 'Dashboard'}
                {location.pathname === '/admin/blog' && 'Blog Management'}
                {location.pathname === '/admin/blog/create' && 'Create New Blog Post'}
                {location.pathname === '/admin/blog/categories' && 'Blog Categories'}
                {location.pathname === '/admin/blog/comments' && 'Blog Comments'}
                {location.pathname === '/admin/feedback' && 'Feedbacks'}
              </h1>
              <p className="text-amber-300/70">
                {location.pathname === '/admin' && 'Welcome to Coffee Barista Admin Panel'}
                {location.pathname.startsWith('/admin/blog') && 'Manage your blog content and articles'}
                {location.pathname === '/admin/feedback' && 'View and manage customer feedback submissions'}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl blur-lg opacity-20"></div>
                <div className="relative glass px-4 py-2 rounded-xl border border-amber-500/30">
                  <span className="text-amber-300 font-medium">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="bg-gradient-to-br from-stone-900/50 to-stone-800/50 rounded-2xl p-4 md:p-6">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-amber-300/50 text-sm">
          <p>© {new Date().getFullYear()} Coffee Barista Admin Panel</p>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;