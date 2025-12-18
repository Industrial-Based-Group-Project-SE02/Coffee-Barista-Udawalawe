import React from 'react';
import { 
  Coffee, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  DollarSign, 
  Star,
  Activity,
  Calendar,
  Clock,
  Package,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,245', icon: <Users className="w-6 h-6" />, change: '+12%', color: 'blue' },
    { label: 'Total Orders', value: '342', icon: <ShoppingBag className="w-6 h-6" />, change: '+8%', color: 'green' },
    { label: 'Total Revenue', value: 'LKR 125,400', icon: <DollarSign className="w-6 h-6" />, change: '+15%', color: 'amber' },
    { label: 'Avg. Rating', value: '4.8/5', icon: <Star className="w-6 h-6" />, change: '+0.2', color: 'purple' },
  ];

  const quickActions = [
    { title: 'Manage Blog', description: 'Create and edit blog posts', icon: <Package className="w-5 h-5" />, path: '/admin/blog', color: 'amber' },
    { title: 'View Orders', description: 'Process customer orders', icon: <ShoppingBag className="w-5 h-5" />, path: '/admin/orders', color: 'green' },
    { title: 'User Management', description: 'Manage user accounts', icon: <Users className="w-5 h-5" />, path: '/admin/users', color: 'blue' },
    { title: 'Analytics', description: 'View business insights', icon: <TrendingUp className="w-5 h-5" />, path: '/admin/analytics', color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="glass-strong rounded-2xl p-6 border border-amber-500/20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl blur-xl opacity-60"></div>
            <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-3xl">
              <Coffee className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Welcome back, Admin!</h2>
            <p className="text-amber-300/70">Here's what's happening with your coffee shop today.</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-strong p-5 rounded-2xl border border-amber-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                {stat.icon}
              </div>
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-amber-200/70 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <Link
            key={i}
            to={action.path}
            className="group glass-strong p-5 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all hover:scale-105"
          >
            <div className={`p-3 rounded-xl bg-${action.color}-500/10 text-${action.color}-400 mb-4 inline-block`}>
              {action.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
              {action.title}
            </h3>
            <p className="text-amber-300/70 text-sm">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass-strong rounded-2xl p-6 border border-amber-500/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-400" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[
            { user: 'John Doe', action: 'placed a new order', time: '5 min ago' },
            { user: 'Sarah Smith', action: 'wrote a blog comment', time: '15 min ago' },
            { user: 'Mike Johnson', action: 'created a new account', time: '30 min ago' },
            { user: 'Emma Wilson', action: 'subscribed to newsletter', time: '1 hour ago' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl glass">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
                {activity.user[0]}
              </div>
              <div className="flex-1">
                <p className="text-white">
                  <span className="font-semibold">{activity.user}</span> {activity.action}
                </p>
                <p className="text-amber-300/60 text-sm">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;