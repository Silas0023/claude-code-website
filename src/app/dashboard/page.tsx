'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Terminal,
  Zap,
  Shield,
  Code,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Users,
  Gift,
  Gauge,
  Activity,
  Menu
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 lg:py-5 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">仪表板概览</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">欢迎回到 Claude Code 用户中心</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-full hover:shadow-lg transition-all items-center gap-2 text-sm sm:text-base"
            >
              <Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span className="hidden sm:inline">立即升级</span>
            </motion.button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50">
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-orange-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-gray-600">本月使用次数</span>
                <div className="p-1.5 sm:p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-orange-600" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">2,345</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-medium text-green-600 bg-green-100 px-1.5 sm:px-2 py-0.5 rounded">+12.5%</span>
                <span className="text-xs text-gray-500">较上月</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-gray-600">节省的小时数</span>
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                  <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">185</h3>
              <p className="text-xs text-gray-500 mt-2">累计节省时间</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-100 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-gray-600">成功率</span>
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">98.5%</h3>
              <p className="text-xs text-gray-500 mt-2">执行成功率</p>
            </motion.div>
          </div>

          {/* Usage and Subscription Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Current Points Card - Takes 2 columns on lg */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">当前积分</h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">空间时段 (12:48)</p>
                </div>
                <button className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 font-medium self-start sm:self-auto">
                  查看所有套餐 →
                </button>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="flex items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">2,000</span>
                  <span className="text-lg sm:text-xl text-gray-400">/ 2,000</span>
                </div>

                <div className="mb-3 sm:mb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm mb-2 gap-1">
                    <span className="text-gray-600">FREE用户每天使用上限为3000积分</span>
                    <span className="text-orange-600 font-medium">清零</span>
                  </div>
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500">已用</span>
                    <p className="font-medium text-gray-900">0 积分/小时</p>
                  </div>
                  <div>
                    <span className="text-gray-500">上次补充时间</span>
                    <p className="font-medium text-gray-900">-</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Current Subscription Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">当前订阅</h2>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">当前计划</span>
              </div>

              <div className="text-center mb-4 sm:mb-6">
                <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-orange-100 rounded-full mb-2 sm:mb-3">
                  <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-orange-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">FREE</h3>
                <p className="text-xs sm:text-sm text-gray-500">体验 Claude Code 的基础功能，适合轻度使用和初次体验</p>
              </div>

              <button className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-xl hover:shadow-lg transition-all text-sm sm:text-base">
                立即激活码
              </button>

              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">每日 3000 积分额度</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">基础模型访问</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <AlertCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-300 flex-shrink-0" />
                  <span className="text-gray-400 line-through">高级功能访问</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Invite Friends Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <div className="flex items-center gap-3">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-xl">
                  <Users className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">邀请好友</h2>
              </div>
              <button className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 font-medium self-start sm:self-auto">
                还没有邀请用户 →
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Gift className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-700">
                  邀请好友注册并订阅，您和好友都将获得 <span className="text-orange-600 font-bold">500 积分奖励</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">我的邀请码</label>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value="KPE8NN"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-mono text-center text-sm sm:text-base"
                  />
                  <button
                    onClick={() => handleCopy('KPE8NN')}
                    className="p-2 sm:p-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    {copied ? <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" /> : <Copy className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">我的邀请链接</label>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value="https://www.aicodemirror.com/register?invitecode=KPE8NN"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs sm:text-sm"
                  />
                  <button className="p-2 sm:p-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors">
                    <ExternalLink className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 border-2 border-transparent hover:border-blue-200 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-xl">
                  <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">快速搜索</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">瞬间搜索您的代码库</p>
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                    <code className="text-green-600 text-xs font-mono">$ claude search "function"</code>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 border-2 border-transparent hover:border-green-200 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-green-100 rounded-xl">
                  <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">安全分析</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">分析代码安全性</p>
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                    <code className="text-green-600 text-xs font-mono">$ claude analyze security</code>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}