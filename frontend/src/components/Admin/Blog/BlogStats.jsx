import React from 'react';
import { TrendingUp, Eye, Clock, Calendar, Award, Coffee } from 'lucide-react';

const BlogStats = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Views', value: '12,456', icon: <Eye className="w-5 h-5" />, trend: '+12%', color: 'blue' },
          { label: 'Total Likes', value: '1,245', icon: <Award className="w-5 h-5" />, trend: '+8%', color: 'green' },
          { label: 'Total Comments', value: '342', icon: <Clock className="w-5 h-5" />, trend: '+15%', color: 'amber' },
          { label: 'Avg. Read Time', value: '5.2 min', icon: <Calendar className="w-5 h-5" />, trend: '+2%', color: 'purple' }
        ].map((stat, i) => (
          <div key={i} className="glass-strong p-5 rounded-2xl border border-amber-500/20">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                {stat.icon}
              </div>
              <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {stat.trend}
              </span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-amber-200/70 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogStats;