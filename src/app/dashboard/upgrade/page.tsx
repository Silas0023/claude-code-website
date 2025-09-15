'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  ArrowRight
,
  Menu
} from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Plan {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  features: {
    text: string;
    included: boolean;
  }[];
  isPopular?: boolean;
  badge?: string;
  gradient: string;
}

export default function UpgradePage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'FREE',
      icon: <Sparkles className="w-6 h-6" />,
      price: '¥0',
      period: '/月',
      description: '适合个人开发者体验使用',
      gradient: 'from-gray-400 to-gray-600',
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
      name: 'PRO',
      icon: <Zap className="w-6 h-6" />,
      price: billingPeriod === 'monthly' ? '¥99' : '¥990',
      originalPrice: billingPeriod === 'yearly' ? '¥1188' : undefined,
      period: billingPeriod === 'monthly' ? '/月' : '/年',
      description: '适合专业开发者和小型团队',
      gradient: 'from-orange-500 to-orange-600',
      isPopular: true,
      badge: '最受欢迎',
      features: [
        { text: '每日 50,000 积分额度', included: true },
        { text: '高级 AI 模型访问', included: true },
        { text: '无限代码搜索', included: true },
        { text: 'API 访问权限', included: true },
        { text: '优先技术支持', included: true },
        { text: '自定义工作流', included: true },
        { text: '团队协作功能 (5人)', included: true },
        { text: '专属客户经理', included: false }
      ]
    },
    {
      id: 'enterprise',
      name: 'ENTERPRISE',
      icon: <Crown className="w-6 h-6" />,
      price: '联系销售',
      period: '',
      description: '为大型团队和企业定制',
      gradient: 'from-purple-600 to-pink-600',
      features: [
        { text: '无限积分额度', included: true },
        { text: '所有 AI 模型访问', included: true },
        { text: '无限代码搜索', included: true },
        { text: 'API 无限调用', included: true },
        { text: '7×24 专属支持', included: true },
        { text: '完全自定义工作流', included: true },
        { text: '无限团队成员', included: true },
        { text: '专属客户经理', included: true }
      ]
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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">升级订阅</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">选择适合您的套餐，解锁更多强大功能</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                月付
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                年付
                <span className="ml-1 px-1.5 py-0.5 bg-green-100 text-green-700 text-xs rounded">省17%</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Current Plan Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">您当前的套餐</h2>
                  <p className="text-sm text-gray-600 mt-0.5">FREE 免费版 - 每日 3,000 积分额度</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">今日已用</p>
                <p className="text-2xl font-bold text-gray-900">1,234 / 3,000</p>
              </div>
            </div>
          </motion.div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-sm border ${
                  plan.isPopular ? 'border-orange-200' : 'border-gray-100'
                } hover:shadow-lg transition-all`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${plan.gradient} rounded-xl text-white`}>
                      {plan.icon}
                    </div>
                    {plan.id === 'free' && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                        当前套餐
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      {plan.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">{plan.originalPrice}</span>
                      )}
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 font-medium rounded-xl transition-all ${
                      plan.id === 'enterprise'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                        : plan.isPopular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {plan.id === 'free' ? '当前套餐' : plan.id === 'enterprise' ? '联系销售' : '立即升级'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">为什么选择 PRO？</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">16倍积分提升</h3>
                  <p className="text-sm text-gray-600">从 3,000 提升至 50,000 每日积分</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Rocket className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">高级 AI 模型</h3>
                  <p className="text-sm text-gray-600">访问最新最强大的 AI 模型</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">团队协作</h3>
                  <p className="text-sm text-gray-600">支持 5 人团队共享使用</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl border border-orange-100 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-gray-700">4.9/5 用户评分</span>
            </div>
            <blockquote className="text-gray-700">
              "升级到 PRO 后，我的开发效率提升了至少 50%。高级 AI 模型的代码建议质量非常高，
              API 访问权限让我能够将 Claude Code 完美集成到现有工作流中。"
            </blockquote>
            <p className="text-sm text-gray-600 mt-3">— 李明，全栈开发工程师</p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}