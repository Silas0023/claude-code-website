'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  Menu,
  Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from '@/components/DashboardSidebar';
import { apiService, ModelUsageStats } from '@/lib/api';
import PieChart from '@/components/PieChart';

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modelStats, setModelStats] = useState<ModelUsageStats[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);
  const [period, setPeriod] = useState<'daily' | 'monthly'>('monthly');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const fetchModelStats = async () => {
    // 使用实际的API ID，可能是用户的API key或ID
    const apiId = user?.userStats?.id || user?.userInfo?.id || 'e5507f6f-c267-4991-979d-84f919fa6410';
    
    setStatsLoading(true);
    try {
      console.log('Fetching model stats for:', apiId, period);
      const response = await apiService.getUserModelStats(apiId.toString(), period);
      console.log('Model stats response:', response);
      
      // 解析嵌套的响应结构
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
          {/* 简洁的顶部统计卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{user?.userStats?.usage?.total?.requests || '119'}</h3>
              <p className="text-gray-600 text-sm">请求次数</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <Zap className="w-5 h-5 text-purple-600" />
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">总计</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.userStats?.usage?.total?.allTokens ? 
                  (user.userStats.usage.total.allTokens / 1000000).toFixed(1) + 'M' : 
                  '6.9M'
                }
              </h3>
              <p className="text-gray-600 text-sm">令牌数量</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-xl">💰</div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">费用</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.userStats?.usage?.total?.formattedCost || '$3.82'}
              </h3>
              <p className="text-gray-600 text-sm">本月消费</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">平均</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.userStats?.usage?.total?.requests && user?.userStats?.usage?.total?.allTokens
                  ? Math.round(user.userStats.usage.total.allTokens / user.userStats.usage.total.requests / 1000) + 'K'
                  : '2.8K'
                }
              </h3>
              <p className="text-gray-600 text-sm">每次请求</p>
            </motion.div>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - API Key and Token Usage */}
            <div className="lg:col-span-2 space-y-6">
              {/* 简洁的API Key信息 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">🔑</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">API Key</h2>
                      <p className="text-gray-500 text-sm">ID: {user?.userInfo?.id || '1347516272'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 text-sm font-medium">活跃</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <code className="text-gray-700 font-mono text-sm break-all">
                      {user?.userInfo?.apiKey || 'sk-ant-api03-...'}
                    </code>
                    <button
                      onClick={() => handleCopy(user?.userInfo?.apiKey || '')}
                      className="ml-3 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-600" />}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* 简洁的Token使用分布 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">令牌分布</h2>
                  </div>
                  <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setPeriod('daily')}
                      className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                        period === 'daily' 
                          ? 'bg-white text-purple-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      今日
                    </button>
                    <button
                      onClick={() => setPeriod('monthly')}
                      className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                        period === 'monthly' 
                          ? 'bg-white text-purple-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      本月
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-700">输入</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {user?.userStats?.usage?.total?.inputTokens ? 
                        (user.userStats.usage.total.inputTokens / 1000).toFixed(1) + 'K' :
                        '2.8K'
                      }
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-700">输出</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {user?.userStats?.usage?.total?.outputTokens ? 
                        (user.userStats.usage.total.outputTokens / 1000).toFixed(1) + 'K' :
                        '43.8K'
                      }
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-700">缓存创建</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {user?.userStats?.usage?.total?.cacheCreateTokens ? 
                        (user.userStats.usage.total.cacheCreateTokens / 1000).toFixed(1) + 'K' :
                        '324K'
                      }
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-700">缓存读取</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {user?.userStats?.usage?.total?.cacheReadTokens ? 
                        (user.userStats.usage.total.cacheReadTokens / 1000000).toFixed(1) + 'M' :
                        '6.5M'
                      }
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-semibold">总计</span>
                    </div>
                    <span className="text-xl font-bold">
                      {user?.userStats?.usage?.total?.allTokens ? 
                        (user.userStats.usage.total.allTokens / 1000000).toFixed(1) + 'M' :
                        '6.9M'
                      }
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Status */}
            <div className="space-y-6">
              {/* 简洁状态面板 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">实时状态</h2>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">每日消费</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${user?.userStats?.limits?.currentDailyCost?.toFixed(2) || '3.82'}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: user?.userStats?.limits?.dailyCostLimit 
                          ? `${Math.min((user.userStats.limits.currentDailyCost / user.userStats.limits.dailyCostLimit) * 100, 100)}%`
                          : '22%'
                      }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <div className="text-xl font-bold text-gray-900">
                      {user?.userStats?.usage?.total?.requests || '119'}
                    </div>
                    <div className="text-xs text-gray-500">请求</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <div className="text-xl font-bold text-gray-900">∞</div>
                    <div className="text-xs text-gray-500">并发</div>
                  </div>
                </div>
              </motion.div>

              {/* 简化的限制信息 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">权限</h2>
                </div>

                <div className="space-y-3">
                  {user?.userStats?.restrictions?.enableModelRestriction ? (
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-700">模型限制已启用</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">完全访问权限</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* 简洁模型使用统计 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">AI 模型</h2>
                  <p className="text-gray-500 text-sm">性能分析</p>
                </div>
              </div>
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setPeriod('daily')}
                  className={`px-3 py-1 text-sm font-medium rounded transition-all ${
                    period === 'daily' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  今日
                </button>
                <button
                  onClick={() => setPeriod('monthly')}
                  className={`px-3 py-1 text-sm font-medium rounded transition-all ${
                    period === 'monthly' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  本月
                </button>
              </div>
            </div>

              {statsLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <span className="text-gray-600 font-medium">正在加载模型数据...</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {modelStats.map((model, index) => (
                    <motion.div 
                      key={model.model} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{model.model.replace('claude-', 'Claude ')}</h3>
                            <p className="text-gray-600 text-sm">{model.requests} 次请求</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {model.formatted.total}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">总费用</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs font-medium text-gray-700">输入</span>
                          </div>
                          <div className="text-sm font-bold text-gray-900">{(model.inputTokens / 1000).toFixed(1)}K</div>
                          <div className="text-xs text-gray-500">{model.formatted.input}</div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-xs font-medium text-gray-700">输出</span>
                          </div>
                          <div className="text-sm font-bold text-gray-900">{(model.outputTokens / 1000).toFixed(1)}K</div>
                          <div className="text-xs text-gray-500">{model.formatted.output}</div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-xs font-medium text-gray-700">缓存创建</span>
                          </div>
                          <div className="text-sm font-bold text-gray-900">{(model.cacheCreateTokens / 1000).toFixed(1)}K</div>
                          <div className="text-xs text-gray-500">{model.formatted.cacheWrite}</div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-xs font-medium text-gray-700">缓存读取</span>
                          </div>
                          <div className="text-sm font-bold text-gray-900">{(model.cacheReadTokens / 1000000).toFixed(1)}M</div>
                          <div className="text-xs text-gray-500">{model.formatted.cacheRead}</div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">总令牌数</span>
                          <span className="text-lg font-bold text-blue-600">{(model.allTokens / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-blue-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ 
                              width: modelStats.length > 1 
                                ? `${(model.allTokens / Math.max(...modelStats.map(m => m.allTokens))) * 100}%`
                                : '100%'
                            }}
                            transition={{ duration: 2, delay: 1.5 + index * 0.1, ease: "easeOut" }}
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
    </div>
  );
}