'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gift,
  Tag,
  Percent,
  Clock,
  Zap,
  Star,
  TrendingUp,
  Calendar,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  Timer
,
  Menu
} from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  type: 'percentage' | 'fixed' | 'bonus';
  validUntil: string;
  code?: string;
  icon: string;
  gradient: string;
  isHot?: boolean;
  isNew?: boolean;
  requirements?: string;
}

export default function OffersPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'new' | 'limited' | 'vip'>('all');

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const offers: Offer[] = [
    {
      id: '1',
      title: '新年特惠',
      description: 'PRO 年付套餐限时优惠，立省 30%',
      discount: '30% OFF',
      type: 'percentage',
      validUntil: '2024-02-10',
      code: 'NEWYEAR2024',
      icon: '🎊',
      gradient: 'from-red-500 to-orange-500',
      isHot: true
    },
    {
      id: '2',
      title: '新用户专享',
      description: '首次订阅任意套餐，赠送 1000 积分',
      discount: '+1000',
      type: 'bonus',
      validUntil: '2024-02-28',
      icon: '🎁',
      gradient: 'from-green-500 to-emerald-500',
      isNew: true,
      requirements: '仅限新注册用户'
    },
    {
      id: '3',
      title: '团队优惠',
      description: '3人及以上团队订阅，每人优惠 ¥20/月',
      discount: '¥20',
      type: 'fixed',
      validUntil: '2024-03-01',
      code: 'TEAM20',
      icon: '👥',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: '4',
      title: '限时升级',
      description: 'FREE 用户升级 PRO，首月半价',
      discount: '50% OFF',
      type: 'percentage',
      validUntil: '2024-02-15',
      code: 'UPGRADE50',
      icon: '⚡',
      gradient: 'from-purple-500 to-pink-500',
      isHot: true
    },
    {
      id: '5',
      title: '推荐有礼',
      description: '成功推荐 5 位好友，获得 1 个月免费 PRO',
      discount: '免费',
      type: 'bonus',
      validUntil: '长期有效',
      icon: '🤝',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: '6',
      title: '学生优惠',
      description: '在校学生认证后享受 8 折优惠',
      discount: '20% OFF',
      type: 'percentage',
      validUntil: '长期有效',
      code: 'STUDENT20',
      icon: '🎓',
      gradient: 'from-indigo-500 to-purple-500',
      requirements: '需要学生认证'
    }
  ];

  const filteredOffers = offers.filter(offer => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'new') return offer.isNew;
    if (selectedCategory === 'limited') return offer.validUntil !== '长期有效';
    if (selectedCategory === 'vip') return offer.discount.includes('免费') || offer.discount.includes('50%');
    return true;
  });

  const categories = [
    { id: 'all', label: '全部优惠', count: offers.length },
    { id: 'new', label: '新人专享', count: offers.filter(o => o.isNew).length },
    { id: 'limited', label: '限时特惠', count: offers.filter(o => o.validUntil !== '长期有效').length },
    { id: 'vip', label: 'VIP 专属', count: 2 }
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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">优惠活动</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">限时优惠，立即抢购</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">我的优惠券</span>
            </motion.button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 rounded-3xl p-8 text-white mb-8 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Timer className="w-5 h-5" />
                <span className="font-medium">限时特惠 · 倒计时 48:23:15</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">新年钜惠，最高立省 30%</h2>
              <p className="text-xl text-white/90 mb-6">
                全场优惠活动火热进行中，PRO 年付套餐限时特价
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-lg transition-all">
                  立即抢购
                </button>
                <button className="px-6 py-3 bg-white/20 backdrop-blur text-white font-semibold rounded-xl hover:bg-white/30 transition-all">
                  查看详情
                </button>
              </div>
            </div>
          </motion.div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">可用优惠券</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <Tag className="w-8 h-8 text-orange-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">累计节省</p>
                  <p className="text-2xl font-bold text-gray-900">¥580</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">即将过期</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <Clock className="w-8 h-8 text-red-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">会员等级</p>
                  <p className="text-2xl font-bold text-gray-900">VIP 2</p>
                </div>
                <Award className="w-8 h-8 text-purple-500" />
              </div>
            </motion.div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
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

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className={`h-2 bg-gradient-to-r ${offer.gradient}`} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{offer.icon}</div>
                    <div className="flex gap-2">
                      {offer.isHot && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded">
                          HOT
                        </span>
                      )}
                      {offer.isNew && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-bold rounded">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{offer.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{offer.description}</p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className={`text-2xl font-bold bg-gradient-to-r ${offer.gradient} bg-clip-text text-transparent`}>
                      {offer.discount}
                    </span>
                    {offer.type === 'percentage' && <span className="text-sm text-gray-500">优惠</span>}
                    {offer.type === 'bonus' && <span className="text-sm text-gray-500">积分</span>}
                    {offer.type === 'fixed' && <span className="text-sm text-gray-500">优惠</span>}
                  </div>

                  {offer.code && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-500">优惠码:</span>
                        <code className="flex-1 font-mono font-bold text-gray-900">{offer.code}</code>
                        <button
                          onClick={() => handleCopyCode(offer.code!)}
                          className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                        >
                          {copiedCode === offer.code ? '已复制' : '复制'}
                        </button>
                      </div>
                    </div>
                  )}

                  {offer.requirements && (
                    <p className="text-xs text-gray-500 mb-3">* {offer.requirements}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>有效期至 {offer.validUntil}</span>
                    </div>
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      立即使用 →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* VIP Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">升级 VIP，享更多优惠</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    VIP 会员专享折扣、积分翻倍、优先客服等特权
                  </p>
                </div>
              </div>
              <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg transition-all">
                了解 VIP 特权
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}