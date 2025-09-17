"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Star, Loader2 } from 'lucide-react'
import { apiService, SubscriptionPlan } from '@/lib/api'
import Link from 'next/link'

interface PlanFeature {
  text: string;
  included: boolean;
}

interface ProcessedPlan {
  id?: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular: boolean;
  subscriptionType: string;
}

const processSubscriptionPlan = (plan: SubscriptionPlan): ProcessedPlan => {
  const features: PlanFeature[] = []

  // 处理description，支持换行拆分显示
  const descriptionLines = plan.description ? plan.description.split('\n').filter(line => line.trim()) : []
  descriptionLines.forEach(line => {
    const trimmedLine = line.trim()
    if (trimmedLine) {
      features.push({
        text: trimmedLine,
        included: true
      })
    }
  })

  // 如果description为空或没有换行，则使用默认的功能列表
  if (features.length === 0) {
    // 基于API数据生成功能列表
    if (plan.tokenLimit > 0) {
      features.push({
        text: `每月 ${plan.tokenLimit.toLocaleString()} 个Token`,
        included: true
      })
    }

    if (plan.rateLimitRequests > 0) {
      features.push({
        text: `每${plan.rateLimitWindow}秒 ${plan.rateLimitRequests} 次请求`,
        included: true
      })
    }

    if (plan.concurrencyLimit > 0) {
      features.push({
        text: `最多 ${plan.concurrencyLimit} 个并发请求`,
        included: true
      })
    }

    if (plan.dailyCostLimit > 0) {
      features.push({
        text: `每日成本限制 $${plan.dailyCostLimit}`,
        included: true
      })
    }

    if (plan.weeklyOpusCostLimit > 0) {
      features.push({
        text: `每周Opus成本限制 $${plan.weeklyOpusCostLimit}`,
        included: true
      })
    }

    // 权限相关功能
    const permissions = plan.permissions ? plan.permissions.split(',') : []
    permissions.forEach(permission => {
      const trimmedPermission = permission.trim()
      if (trimmedPermission) {
        features.push({
          text: trimmedPermission,
          included: true
        })
      }
    })

    // 模型限制
    if (!plan.enableModelRestriction) {
      features.push({
        text: "支持所有AI模型",
        included: true
      })
    }
  }

  // 获取第一行作为简短描述，剩余作为功能列表
  const firstLine = plan.description?.split('\n')[0]?.trim() || '暂无描述'

  // 根据订阅ID判断计费周期
  const getPeriod = (id?: number, price: number) => {
    if (price === 0) return ''
    if (id === 2) return '/周'
    return '/月'
  }

  return {
    id: plan.id,
    name: plan.subscriptionType || '未知方案',
    price: plan.monthlyPrice > 0 ? `¥${plan.monthlyPrice}` : '¥0',
    period: getPeriod(plan.id, plan.monthlyPrice),
    description: firstLine,
    features,
    cta: plan.monthlyPrice > 0 ? '立即订阅' : '免费使用',
    popular: plan.subscriptionType?.includes('专业') || plan.subscriptionType?.includes('Pro') || false,
    subscriptionType: plan.subscriptionType || ''
  }
}

export default function PricingSection() {
  const [plans, setPlans] = useState<ProcessedPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true)
        const response = await apiService.getSubscriptionPlans()

        if (response.code === 200 && response.data) {
          const processedPlans = response.data.map(processSubscriptionPlan)
          setPlans(processedPlans)
        } else {
          setError('获取订阅方案失败')
        }
      } catch (err) {
        console.error('Error fetching subscription plans:', err)
        setError('网络错误，请稍后重试')
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  const handleSubscribe = (plan: ProcessedPlan) => {
    // 检查用户是否已登录
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('token')

    if (!isLoggedIn) {
      // 未登录，跳转到登录页面
      window.location.href = '/login'
      return
    }

    if (plan.subscriptionType === 'FREE' || plan.price === '¥0') {
      // 免费方案，已登录则跳转到仪表板
      window.location.href = '/dashboard'
    } else {
      // 付费方案，已登录则跳转到升级页面
      window.location.href = '/dashboard/upgrade'
    }
  }

  if (loading) {
    return (
      <section id="pricing" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <span className="ml-2 text-gray-600">正在加载订阅方案...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="pricing" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p className="mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-orange-500 hover:underline"
            >
              点击重试
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            选择适合您的 <span className="gradient-text">定价方案</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            无论您是个人开发者还是大型企业，我们都有适合您的方案
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="gradient-bg text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    最受欢迎
                  </div>
                </div>
              )}

              <div className={`bg-white/10 backdrop-blur-md border border-gray-200/20 dark:border-white/10 rounded-2xl p-8 h-full shadow-lg card-hover dark:bg-white/5 ${plan.popular ? 'ring-2 ring-orange-500 animate-pulse-glow' : ''}`}>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'text-gray-600 dark:text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3 rounded-full font-medium transition-all ${
                    plan.popular
                      ? 'gradient-bg text-white hover:opacity-90'
                      : 'border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            所有方案均包含 1 天免费试用，无需信用卡
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            需要更多信息？查看我们的 <Link href="#faq" className="text-orange-500 hover:underline">常见问题</Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}