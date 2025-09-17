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
  const { logout, user, refreshAllUserData } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wxpay'>('alipay');
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 并行获取订阅计划和用户数据
        const [subscriptionResponse] = await Promise.all([
          apiService.getSubscriptionPlans(),
          user?.id ? refreshAllUserData().catch(console.error) : Promise.resolve()
        ]);

        if (subscriptionResponse.code === 200 || subscriptionResponse.code === 0) {
          setSubscriptionPlans(subscriptionResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleUpgrade = async (planName: string) => {
    if (!user?.id) {
      alert('请先登录');
      return;
    }

    // 根据套餐名称找到对应的配置ID
    const plan = filteredPlans.find(p => p.subscriptionType === planName);
    if (!plan) {
      alert('套餐不存在');
      return;
    }

    // 使用套餐的实际ID作为subscriptionConfigId
    const planData = subscriptionPlans.find(p => p.subscriptionType === planName);
    if (!planData) {
      alert('套餐不存在');
      return;
    }

    // 如果API数据中有id字段就使用，否则用默认值
    const subscriptionConfigId = planData.id || subscriptionPlans.findIndex(p => p.subscriptionType === planName) + 1;

    setIsCreatingOrder(true);

    try {
      const response = await apiService.createOrder(
        subscriptionConfigId,
        paymentMethod,
        parseInt(user.id)
      );

      if (response.code === 200) {
        // 跳转到支付页面
        window.open(response.data.paymentUrl, '_blank');
      } else {
        alert(response.message || '创建订单失败');
      }
    } catch (error) {
      console.error('创建订单失败:', error);
      alert('创建订单失败，请重试');
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // 过滤掉ID=1的套餐
  const filteredPlans = subscriptionPlans.filter(plan => plan.id !== 1);

  const convertToDisplayPlans = (): Plan[] => {
    if (filteredPlans.length === 0) return [];

    console.log('Subscription plans:', subscriptionPlans); // Debug log
    console.log('Filtered plans (excluding ID=1):', filteredPlans); // Debug log

    const iconMap: { [key: string]: React.ReactNode } = {
      '免费试用': <Sparkles className="w-6 h-6" />,
      '基础版': <Zap className="w-6 h-6" />,
      '专业版': <Crown className="w-6 h-6" />,
      '企业版': <Diamond className="w-6 h-6" />
    };

    const gradientMap: { [key: string]: string } = {
      '免费试用': 'from-gray-400 to-gray-500',
      '基础版': 'from-green-500 to-emerald-600',
      '专业版': 'from-blue-500 to-purple-600',
      '企业版': 'from-purple-600 to-pink-600'
    };

    const shadowMap: { [key: string]: string } = {
      '免费试用': 'shadow-gray-500/20',
      '基础版': 'shadow-emerald-500/20',
      '专业版': 'shadow-purple-500/20',
      '企业版': 'shadow-pink-500/20'
    };

    return filteredPlans.map((plan, index) => {
      console.log(`Processing plan ${index}:`, plan); // Debug log

      // 将description按换行符分割成特性列表
      const features = plan.description.split('\n\n').map(line => {
        const cleanLine = line.trim();
        return cleanLine ? { text: cleanLine, included: true, highlight: index === 2 } : null;
      }).filter(Boolean) as { text: string; included: boolean; highlight?: boolean }[];

      // 确定是否为热门套餐（专业版）
      const isPopular = plan.subscriptionType === '专业版';

      // 根据订阅ID判断计费周期
      const getPeriod = (id?: number) => {
        if (id === 2) return '/周'
        return '/月'
      }

      const displayPlan = {
        id: plan.subscriptionType,
        name: plan.subscriptionType,
        icon: iconMap[plan.subscriptionType] || <Sparkles className="w-6 h-6" />,
        price: plan.monthlyPrice,
        originalPrice: undefined,
        period: getPeriod(plan.id),
        description: `💰 每日限额: $${plan.dailyCostLimit}`,
        gradient: gradientMap[plan.subscriptionType] || 'from-gray-400 to-gray-500',
        shadowColor: shadowMap[plan.subscriptionType] || 'shadow-gray-500/20',
        isPopular,
        badge: isPopular ? '最受欢迎' : undefined,
        features
      };

      console.log(`Generated display plan:`, displayPlan); // Debug log
      return displayPlan;
    });
  };

  const plans: Plan[] = loading ? [] : convertToDisplayPlans();

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex overflow-hidden">
      <DashboardSidebar
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        user={user}
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
            <div className="hidden sm:flex items-center gap-2">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                月付订阅
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

          {/* Payment Method Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">选择支付方式</h3>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPaymentMethod('alipay')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'alipay'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  支
                </div>
                <div>
                  <p className="font-medium text-gray-900">支付宝</p>
                  <p className="text-sm text-gray-500">安全便捷</p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPaymentMethod('wxpay')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'wxpay'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  微
                </div>
                <div>
                  <p className="font-medium text-gray-900">微信支付</p>
                  <p className="text-sm text-gray-500">扫码支付</p>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {loading ? (
              // Loading skeleton
              [...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
                >
                  <div className="animate-pulse">
                    <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="space-y-3">
                      {[...Array(5)].map((_, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                          <div className="h-4 bg-gray-200 rounded flex-1"></div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 h-12 bg-gray-200 rounded-2xl"></div>
                  </div>
                </motion.div>
              ))
            ) : (
              plans.map((plan, index) => (
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
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
                    <div className="mb-4">
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

                    {/* Daily Limit Highlight */}
                    <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-700">每日限额</span>
                        </div>
                        <span className="text-lg font-bold text-blue-600">
                          ${filteredPlans.find(p => p.subscriptionType === plan.name)?.dailyCostLimit || 0}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        并发数: {filteredPlans.find(p => p.subscriptionType === plan.name)?.concurrencyLimit || 1}
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
                            <div className={`text-sm ${
                              feature.included
                                ? feature.highlight ? 'text-gray-900 font-medium' : 'text-gray-700'
                                : 'text-gray-400'
                            }`}>
                              {feature.text.split('\n').map((line, lineIdx) => (
                                <div key={lineIdx} className={lineIdx > 0 ? 'mt-1' : ''}>
                                  {line}
                                </div>
                              ))}
                            </div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={plan.id === '免费试用' || isCreatingOrder}
                      className={`w-full py-3.5 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 ${
                        plan.id === '免费试用'
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : plan.isPopular
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                          : plan.id === '企业版'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
                          : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/25'
                      } ${isCreatingOrder ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {plan.id === '免费试用' ? (
                        '当前套餐'
                      ) : isCreatingOrder ? (
                        <>创建订单中... <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /></>
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
              ))
            )}
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
                  <h3 className="font-semibold text-gray-900 mb-1">大幅提升使用限额</h3>
                  <p className="text-sm text-gray-600">从 $10 提升至 $100 每日费用限额</p>
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
              <span className="text-sm font-medium">30天协商退款保证</span>
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