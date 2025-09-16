'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Check,
  X,
  Star,
  Crown,
  Rocket,
  Shield,
  Users,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Menu,
  Infinity,
  Code,
  Globe,
  Cpu,
  Heart,
  Diamond
} from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { apiService, SubscriptionPlan } from '@/lib/api';
import AnimatedNumber from '@/components/AnimatedNumber';

interface Plan {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: number;
  originalPrice?: number;
  period: string;
  description: string;
  features: {
    text: string;
    included: boolean;
    highlight?: boolean;
  }[];
  isPopular?: boolean;
  badge?: string;
  gradient: string;
  shadowColor: string;
}

export default function UpgradePage() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        const response = await apiService.getSubscriptionPlans();
        if (response.code === 200 || response.code === 0) {
          setSubscriptionPlans(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch subscription plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionPlans();
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const convertToDisplayPlans = (): Plan[] => {
    const basePlans: Plan[] = [
      {
        id: 'free',
        name: '免费版',
        icon: <Sparkles className="w-6 h-6" />,
        price: 0,
        period: billingPeriod === 'monthly' ? '/月' : '/年',
        description: '适合个人开发者体验使用',
        gradient: 'from-gray-400 to-gray-500',
        shadowColor: 'shadow-gray-500/20',
        features: [
          { text: '每日 3,000 积分额度', included: true },
          { text: '基础 AI 模型访问', included: true },
          { text: '代码搜索功能', included: true },
          { text: '社区支持', included: true },
          { text: '高级 AI 模型', included: false },
          { text: 'API 访问权限', included: false },
          { text: '优先技术支持', included: false },
          { text: '团队协作功能', included: false }
        ]
      },
      {
        id: 'pro',
        name: '专业版',
        icon: <Zap className="w-6 h-6" />,
        price: billingPeriod === 'monthly' ? 99 : 990,
        originalPrice: billingPeriod === 'monthly' ? undefined : 1188,
        period: billingPeriod === 'monthly' ? '/月' : '/年',
        description: '适合专业开发者和小型团队',
        gradient: 'from-blue-500 to-purple-600',
        shadowColor: 'shadow-purple-500/20',
        isPopular: true,
        badge: '最受欢迎',
        features: [
          { text: '每日 50,000 积分额度', included: true, highlight: true },
          { text: '所有 AI 模型访问', included: true, highlight: true },
          { text: 'API 完全访问权限', included: true },
          { text: '优先技术支持', included: true },
          { text: '5 人团队协作', included: true },
          { text: '代码版本管理', included: true },
          { text: '自定义模型微调', included: true },
          { text: '批量处理功能', included: true }
        ]
      },
      {
        id: 'enterprise',
        name: '企业版',
        icon: <Crown className="w-6 h-6" />,
        price: 499,
        period: billingPeriod === 'monthly' ? '/月' : '/年',
        description: '适合大型团队和企业使用',
        gradient: 'from-purple-600 to-pink-600',
        shadowColor: 'shadow-pink-500/20',
        features: [
          { text: '无限积分额度', included: true, highlight: true },
          { text: '专属 AI 模型', included: true, highlight: true },
          { text: '无限团队成员', included: true, highlight: true },
          { text: '24/7 专属支持', included: true },
          { text: '私有部署选项', included: true },
          { text: 'SSO 单点登录', included: true },
          { text: '合规与审计日志', included: true },
          { text: 'SLA 服务保障', included: true }
        ]
      }
    ];

    return basePlans;
  };

  const plans: Plan[] = loading ? [] : convertToDisplayPlans();

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex overflow-hidden">
      <DashboardSidebar
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">升级订阅</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">选择适合您的套餐，解锁更多强大功能</p>
              </div>
            </div>
            <motion.div
              className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-xl p-1"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                月付
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                年付
                <motion.span
                  className="ml-2 px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full font-bold"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  省17%
                </motion.span>
              </button>
            </motion.div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Current Plan Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-purple-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="p-3 bg-white rounded-xl shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Diamond className="w-6 h-6 text-purple-600" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">您当前的套餐</h2>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {user?.userInfo?.subscribeType || 'FREE'} -
                    {user?.userStats ? ` 每日 ${user.userStats.limits.dailyCostLimit} 积分限制` : ' 免费版'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">今日已用</p>
                <p className="text-2xl font-bold text-gray-900">
                  <AnimatedNumber value={user?.userStats?.limits?.currentDailyCost || 0} />
                  <span className="text-lg text-gray-500"> / {user?.userStats?.limits?.dailyCostLimit || 3000}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                onHoverStart={() => setHoveredCard(plan.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative"
              >
                <motion.div
                  animate={{
                    y: hoveredCard === plan.id ? -10 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative bg-white rounded-3xl shadow-xl ${plan.shadowColor} border border-gray-100 overflow-hidden
                    ${plan.isPopular ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                  `}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Popular Badge */}
                  {plan.isPopular && (
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-75" />
                        <span className="relative px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-bl-2xl rounded-tr-2xl flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white" />
                          {plan.badge}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Card Header */}
                  <div className="p-6 pb-0">
                    <motion.div
                      className={`inline-flex p-4 bg-gradient-to-br ${plan.gradient} rounded-2xl text-white mb-4 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {plan.icon}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        {plan.originalPrice && (
                          <span className="text-xl text-gray-400 line-through">
                            ¥{plan.originalPrice}
                          </span>
                        )}
                        <span className="text-4xl font-bold text-gray-900">
                          ¥<AnimatedNumber value={plan.price} />
                        </span>
                        <span className="text-gray-500 ml-1">{plan.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="px-6 pb-6">
                    <ul className="space-y-3 mb-6">
                      <AnimatePresence>
                        {plan.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * idx }}
                            className="flex items-start gap-3"
                          >
                            <motion.div
                              animate={{
                                scale: feature.included ? [1, 1.2, 1] : 1,
                              }}
                              transition={{ duration: 0.3, delay: 0.1 * idx }}
                            >
                              {feature.included ? (
                                <div className={`w-5 h-5 rounded-full ${feature.highlight ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-green-500'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              ) : (
                                <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                              )}
                            </motion.div>
                            <span className={`text-sm ${
                              feature.included
                                ? feature.highlight ? 'text-gray-900 font-medium' : 'text-gray-700'
                                : 'text-gray-400'
                            }`}>
                              {feature.text}
                            </span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full py-3.5 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 ${
                        plan.id === 'enterprise'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
                          : plan.isPopular
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                          : plan.id === 'free'
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      disabled={plan.id === 'free'}
                    >
                      {plan.id === 'free' ? (
                        '当前套餐'
                      ) : plan.id === 'enterprise' ? (
                        <>联系销售 <ArrowRight className="w-4 h-4" /></>
                      ) : (
                        <>立即升级 <Zap className="w-4 h-4" /></>
                      )}
                    </motion.button>
                  </div>

                  {/* Decorative gradient */}
                  {plan.isPopular && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Features Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-xl border border-purple-100 p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">为什么选择专业版？</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="p-3 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <TrendingUp className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">16倍积分提升</h3>
                  <p className="text-sm text-gray-600">从 3,000 提升至 50,000 每日积分</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Rocket className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">高级 AI 模型</h3>
                  <p className="text-sm text-gray-600">访问最新最强大的 AI 模型</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Users className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">团队协作</h3>
                  <p className="text-sm text-gray-600">支持 5 人团队共享使用</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-3xl border border-orange-100 p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                ))}
                <span className="text-sm font-semibold text-gray-700 ml-2">4.9/5 用户评分</span>
              </div>
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-4">
                "升级到专业版后，我的开发效率提升了至少 50%。高级 AI 模型的代码建议质量非常高，
                API 访问权限让我能够将 Claude Code 完美集成到现有工作流中。"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  L
                </div>
                <div>
                  <p className="font-semibold text-gray-900">李明</p>
                  <p className="text-sm text-gray-600">全栈开发工程师</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-8 text-gray-500"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">安全支付</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">全球服务</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">30天退款保证</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              <span className="text-sm font-medium">99.9% 可用性</span>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}