'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Film,
  Play,
  Clock,
  Star,
  BookOpen,
  Award,
  TrendingUp,
  Filter,
  Search,
  ChevronRight
,
  Menu
} from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  rating: number;
  category: string;
  level: string;
  isNew?: boolean;
  isPro?: boolean;
}

export default function VideosPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const categories = [
    { id: 'all', label: '全部', count: 48 },
    { id: 'beginner', label: '入门教程', count: 12 },
    { id: 'advanced', label: '进阶技巧', count: 15 },
    { id: 'practice', label: '实战项目', count: 10 },
    { id: 'tips', label: '效率技巧', count: 11 }
  ];

  const videos: Video[] = [
    {
      id: '1',
      title: 'Claude Code 快速入门指南',
      thumbnail: '🎬',
      duration: '12:30',
      views: '15.2k',
      rating: 4.9,
      category: 'beginner',
      level: '初级',
      isNew: true
    },
    {
      id: '2',
      title: '10分钟掌握智能代码搜索',
      thumbnail: '🔍',
      duration: '10:15',
      views: '8.7k',
      rating: 4.8,
      category: 'tips',
      level: '初级'
    },
    {
      id: '3',
      title: '构建自动化测试工作流',
      thumbnail: '🚀',
      duration: '25:45',
      views: '6.3k',
      rating: 4.7,
      category: 'advanced',
      level: '高级',
      isPro: true
    },
    {
      id: '4',
      title: 'AI 驱动的代码重构实战',
      thumbnail: '🤖',
      duration: '18:20',
      views: '12.1k',
      rating: 4.9,
      category: 'practice',
      level: '中级'
    },
    {
      id: '5',
      title: '终端命令速查手册',
      thumbnail: '⚡',
      duration: '8:45',
      views: '9.5k',
      rating: 4.6,
      category: 'beginner',
      level: '初级'
    },
    {
      id: '6',
      title: '深入理解 Claude Code API',
      thumbnail: '📚',
      duration: '32:10',
      views: '4.2k',
      rating: 4.8,
      category: 'advanced',
      level: '高级',
      isPro: true
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <DashboardSidebar
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">视频教程</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">通过视频教程快速掌握 Claude Code</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">学习路径</span>
            </motion.button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索视频教程..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>
            <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">筛选</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.label}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Featured Course */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-medium">推荐课程</span>
                  <span className="px-2 py-0.5 bg-yellow-400/20 rounded text-xs font-medium">⭐ 4.9</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Claude Code 完整实战课程</h2>
                <p className="text-white/90 mb-4">从零基础到精通，系统学习 Claude Code 的所有功能</p>
                <div className="flex items-center gap-6 text-sm text-white/80">
                  <span className="flex items-center gap-1">
                    <Film className="w-4 h-4" />
                    28 节课
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    总时长 6小时
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    包含练习项目
                  </span>
                </div>
              </div>
              <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-lg transition-all">
                立即学习
              </button>
            </div>
          </motion.div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-5xl">{video.thumbnail}</span>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-gray-900 ml-1" />
                    </div>
                  </div>
                  {video.isNew && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
                      新发布
                    </span>
                  )}
                  {video.isPro && (
                    <span className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-medium rounded">
                      PRO
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {video.duration}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{video.level}</span>
                    <span>{video.views} 观看</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(video.rating)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{video.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700">
              加载更多视频
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}