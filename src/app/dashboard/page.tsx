'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  Menu,
  Zap,
  Activity,
  Users,
  CreditCard,
  BarChart3,
  Cpu,
  Database,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '@/components/DashboardSidebar';
import { apiService, ModelUsageStats } from '@/lib/api';
import AnimatedNumber from '@/components/AnimatedNumber';

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modelStats, setModelStats] = useState<ModelUsageStats[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);
  const [period, setPeriod] = useState<'daily' | 'monthly'>('monthly');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const fetchModelStats = async () => {
    const apiId = user?.userStats?.id || user?.userInfo?.id || 'e5507f6f-c267-4991-979d-84f919fa6410';

    setStatsLoading(true);
    try {
      console.log('Fetching model stats for:', apiId, period);
      const response = await apiService.getUserModelStats(apiId.toString(), period);
      console.log('Model stats response:', response);

      if (response.code === 200 && response.data && response.data.success) {
        setModelStats(response.data.data);
        console.log('Model stats set:', response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch model stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userStats?.id || user?.userInfo?.id) {
      fetchModelStats();
    }
  }, [user?.userStats?.id, user?.userInfo?.id, period]);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // 计算百分比变化
  const calculatePercentageChange = () => {
    return Math.floor(Math.random() * 30) + 10; // 模拟数据
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        user={user}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 lg:py-5 flex-shrink-0 shadow-sm">
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
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">欢迎回到 Claude Code 控制中心</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/dashboard/upgrade')}
              className="hidden sm:flex px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all items-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <Zap className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span className="hidden sm:inline">立即升级</span>
            </motion.button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-gray-50">
          {/* 顶部统计卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              transition={{
                delay: 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Activity className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex items-center gap-1 text-white/90 text-xs font-medium">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>+{calculatePercentageChange()}%</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">
                  <AnimatedNumber value={user?.userStats?.usage?.total?.requests || 119} />
                </h3>
                <p className="text-blue-50 text-sm font-medium">API 请求次数</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              transition={{
                delay: 0.2,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Database className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex items-center gap-1 text-white/90 text-xs font-medium">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>+{calculatePercentageChange()}%</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">
                  {user?.userStats?.usage?.total?.allTokens ?
                    (user.userStats.usage.total.allTokens / 1000000).toFixed(1) + 'M' :
                    '6.9M'
                  }
                </h3>
                <p className="text-purple-50 text-sm font-medium">Token 使用量</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <CreditCard className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex items-center gap-1 text-white/90 text-xs font-medium">
                    <ArrowDownRight className="w-3 h-3" />
                    <span>-12%</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">
                  {user?.userStats?.usage?.total?.formattedCost || '$3.82'}
                </h3>
                <p className="text-emerald-50 text-sm font-medium">本月消费</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              transition={{
                delay: 0.4,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-shadow duration-300 overflow-hidden group cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <BarChart3 className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex items-center gap-1 text-white/90 text-xs font-medium">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>+8%</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">
                  {user?.userStats?.usage?.total?.requests && user?.userStats?.usage?.total?.allTokens
                    ? Math.round(user.userStats.usage.total.allTokens / user.userStats.usage.total.requests / 1000) + 'K'
                    : '2.8K'
                  }
                </h3>
                <p className="text-orange-50 text-sm font-medium">平均 Token/请求</p>
              </div>
            </motion.div>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* API Key 信息 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{
                  delay: 0.5,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200
                }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-shadow hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">API 密钥</h2>
                      <p className="text-gray-500 text-sm">ID: {user?.userInfo?.id || '1347516272'}</p>
                    </div>
                  </div>
                  <motion.div
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="text-green-700 text-sm font-medium">活跃</span>
                  </motion.div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <code className="text-gray-700 font-mono text-sm break-all">
                      {user?.userInfo?.apiKey || 'sk-ant-api03-...'}
                    </code>
                    <button
                      onClick={() => handleCopy(user?.userInfo?.apiKey || '')}
                      className="ml-3 p-2.5 bg-white hover:bg-gray-50 rounded-lg transition-all flex-shrink-0 border border-gray-200 hover:shadow-md group"
                    >
                      {copied ?
                        <Check className="w-4 h-4 text-green-500" /> :
                        <Copy className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                      }
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Token 使用分布 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{
                  delay: 0.6,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200
                }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-shadow hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                      <Cpu className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Token 使用分析</h2>
                  </div>
                  <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setPeriod('daily')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        period === 'daily'
                          ? 'bg-white text-purple-600 shadow-md'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      今日
                    </button>
                    <button
                      onClick={() => setPeriod('monthly')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        period === 'monthly'
                          ? 'bg-white text-purple-600 shadow-md'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      本月
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-green-700">输入 Token</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {user?.userStats?.usage?.total?.inputTokens ?
                        (user.userStats.usage.total.inputTokens / 1000).toFixed(1) + 'K' :
                        '2.8K'
                      }
                    </div>
                    <div className="text-xs text-gray-600 mt-1">占比 15%</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-medium text-blue-700">输出 Token</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {user?.userStats?.usage?.total?.outputTokens ?
                        (user.userStats.usage.total.outputTokens / 1000).toFixed(1) + 'K' :
                        '43.8K'
                      }
                    </div>
                    <div className="text-xs text-gray-600 mt-1">占比 25%</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-xs font-medium text-purple-700">缓存创建</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {user?.userStats?.usage?.total?.cacheCreateTokens ?
                        (user.userStats.usage.total.cacheCreateTokens / 1000).toFixed(1) + 'K' :
                        '324K'
                      }
                    </div>
                    <div className="text-xs text-gray-600 mt-1">占比 35%</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-xs font-medium text-orange-700">缓存读取</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {user?.userStats?.usage?.total?.cacheReadTokens ?
                        (user.userStats.usage.total.cacheReadTokens / 1000000).toFixed(1) + 'M' :
                        '6.5M'
                      }
                    </div>
                    <div className="text-xs text-gray-600 mt-1">占比 25%</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-white" />
                      <span className="font-semibold text-white">总计使用</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-white">
                        {user?.userStats?.usage?.total?.allTokens ?
                          (user.userStats.usage.total.allTokens / 1000000).toFixed(1) :
                          '6.9'
                        }
                      </span>
                      <span className="text-white/90 font-medium">M Tokens</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* 实时状态 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{
                  delay: 0.7,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200
                }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-shadow hover:shadow-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">实时状态</h2>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">今日消费</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${user?.userStats?.limits?.currentDailyCost?.toFixed(2) || '3.82'}
                    </span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-sm"
                      initial={{ width: 0 }}
                      animate={{
                        width: user?.userStats?.limits?.dailyCostLimit
                          ? `${Math.min((user.userStats.limits.currentDailyCost / user.userStats.limits.dailyCostLimit) * 100, 100)}%`
                          : '22%'
                      }}
                      transition={{
                        duration: 2,
                        type: "spring",
                        stiffness: 50,
                        damping: 20,
                        delay: 0.5
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">已使用</span>
                    <span className="text-xs text-gray-500">限额 $50.00</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center border border-blue-200">
                    <div className="text-2xl font-bold text-gray-900">
                      <AnimatedNumber value={user?.userStats?.usage?.total?.requests || 119} />
                    </div>
                    <div className="text-xs text-blue-700 font-medium">总请求</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center border border-purple-200">
                    <div className="text-2xl font-bold text-gray-900">∞</div>
                    <div className="text-xs text-purple-700 font-medium">并发数</div>
                  </div>
                </div>
              </motion.div>

              {/* 权限状态 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{
                  delay: 0.8,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200
                }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-shadow hover:shadow-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">权限状态</h2>
                </div>

                <div className="space-y-3">
                  {user?.userStats?.restrictions?.enableModelRestriction ? (
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-700">模型限制已启用</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">完全访问权限</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-700">API 访问正常</span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* 模型使用统计 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.9,
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">AI 模型性能</h2>
                  <p className="text-gray-500 text-sm">详细使用分析</p>
                </div>
              </div>
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setPeriod('daily')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    period === 'daily'
                      ? 'bg-white text-indigo-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  今日
                </button>
                <button
                  onClick={() => setPeriod('monthly')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    period === 'monthly'
                      ? 'bg-white text-indigo-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  本月
                </button>
              </div>
            </div>

            {statsLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
                <span className="text-gray-500 font-medium">正在加载模型数据...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {modelStats.map((model, index) => (
                  <motion.div
                    key={model.model}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{
                      delay: 1 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-md"></div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{model.model.replace('claude-', 'Claude ')}</h3>
                          <p className="text-gray-500 text-sm">{model.requests} 次请求</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {model.formatted.total}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">总费用</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs font-medium text-gray-600">输入</span>
                        </div>
                        <div className="text-sm font-bold text-gray-900">{(model.inputTokens / 1000).toFixed(1)}K</div>
                        <div className="text-xs text-gray-500">{model.formatted.input}</div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs font-medium text-gray-600">输出</span>
                        </div>
                        <div className="text-sm font-bold text-gray-900">{(model.outputTokens / 1000).toFixed(1)}K</div>
                        <div className="text-xs text-gray-500">{model.formatted.output}</div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-xs font-medium text-gray-600">缓存创建</span>
                        </div>
                        <div className="text-sm font-bold text-gray-900">{(model.cacheCreateTokens / 1000).toFixed(1)}K</div>
                        <div className="text-xs text-gray-500">{model.formatted.cacheWrite}</div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-xs font-medium text-gray-600">缓存读取</span>
                        </div>
                        <div className="text-sm font-bold text-gray-900">{(model.cacheReadTokens / 1000000).toFixed(1)}M</div>
                        <div className="text-xs text-gray-500">{model.formatted.cacheRead}</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">总令牌数</span>
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {(model.allTokens / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-sm"
                          initial={{ width: 0 }}
                          animate={{
                            width: modelStats.length > 1
                              ? `${(model.allTokens / Math.max(...modelStats.map(m => m.allTokens))) * 100}%`
                              : '100%'
                          }}
                          transition={{
                            duration: 1.5,
                            delay: 1.2 + index * 0.15,
                            type: "spring",
                            stiffness: 40,
                            damping: 15
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                {modelStats.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">暂无{period === 'daily' ? '今日' : '本月'}模型数据</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowLogoutConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>

                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mx-auto mb-4">
                  <LogOut className="w-8 h-8 text-red-600" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  确认退出
                </h3>
                <p className="text-gray-500 text-center mb-6">
                  您确定要退出登录吗？退出后需要重新登录才能访问仪表板。
                </p>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                  >
                    取消
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmLogout}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    确认退出
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}