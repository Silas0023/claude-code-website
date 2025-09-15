'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  QrCode,
  Users,
  Bell,
  Calendar,
  TrendingUp,
  Heart,
  Share2,
  Smartphone,
  Check
,
  Menu
} from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function WeChatPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const articles = [
    {
      title: 'Claude Code 3.0 重磅更新',
      date: '2024-01-25',
      views: '5.2k',
      likes: 342,
      image: '🚀'
    },
    {
      title: '10个提升编程效率的技巧',
      date: '2024-01-23',
      views: '3.8k',
      likes: 256,
      image: '💡'
    },
    {
      title: 'AI 编程助手使用指南',
      date: '2024-01-20',
      views: '8.1k',
      likes: 521,
      image: '🤖'
    },
    {
      title: '代码重构最佳实践',
      date: '2024-01-18',
      views: '2.9k',
      likes: 189,
      image: '♻️'
    }
  ];

  const benefits = [
    {
      icon: <Bell className="w-5 h-5" />,
      title: '最新动态',
      description: '第一时间获取产品更新和新功能发布'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: '专属社群',
      description: '加入开发者社群，与同行交流经验'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: '技术分享',
      description: '每周深度技术文章和实战案例'
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: '粉丝福利',
      description: '专属优惠券和限时活动'
    }
  ];

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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">微信公众号</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">关注我们的官方公众号，获取最新资讯</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFollowing(!isFollowing)}
              className={`hidden sm:flex px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium rounded-full transition-all items-center gap-2 ${
                isFollowing
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
              }`}
            >
              {isFollowing ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">已关注</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">关注公众号</span>
                </>
              )}
            </motion.button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* QR Code Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <MessageSquare className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Claude Code 官方</h2>
                  <p className="text-sm text-gray-500 mb-6">微信号: ClaudeCodeAI</p>

                  {/* QR Code Placeholder */}
                  <div className="relative mx-auto w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-gray-400" />
                    <div className="absolute inset-0 bg-white/90 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📱</div>
                        <p className="text-sm text-gray-600">扫码关注</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Smartphone className="w-4 h-4" />
                    <span>使用微信扫一扫</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">12.5k</p>
                      <p className="text-xs text-gray-500">关注者</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">286</p>
                      <p className="text-xs text-gray-500">文章数</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4">关注福利</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{benefit.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Articles Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">热门文章</h2>
                  <p className="text-sm text-gray-500 mt-1">精选技术文章和教程</p>
                </div>

                <div className="divide-y divide-gray-100">
                  {articles.map((article, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4 p-6 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                        {article.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" />
                            {article.views} 阅读
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5" />
                            {article.likes}
                          </span>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Share2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </motion.a>
                  ))}
                </div>

                <div className="p-4 text-center">
                  <button className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
                    查看更多文章 →
                  </button>
                </div>
              </motion.div>

              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6"
              >
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">最新动态</h3>
                    <p className="text-sm text-gray-600">
                      我们刚刚发布了新的教程系列《从零开始学习 Claude Code》，包含 20+ 实战项目案例。
                      关注公众号获取完整教程！
                    </p>
                    <div className="flex gap-3 mt-3">
                      <button className="text-sm font-medium text-green-600 hover:text-green-700">
                        立即查看 →
                      </button>
                      <button className="text-sm font-medium text-gray-500 hover:text-gray-600">
                        稍后提醒
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}