"use client"

import { motion } from 'framer-motion'
import { Check, X, Star } from 'lucide-react'

const plans = [
  {
    name: "免费版",
    price: "¥0",
    period: "/月",
    description: "适合个人开发者和学习使用",
    features: [
      { text: "每月 1000 次代码生成", included: true },
      { text: "基础代码补全", included: true },
      { text: "支持 20+ 编程语言", included: true },
      { text: "社区支持", included: true },
      { text: "实时协作", included: false },
      { text: "高级 AI 模型", included: false },
      { text: "优先支持", included: false },
    ],
    cta: "免费开始",
    popular: false
  },
  {
    name: "专业版",
    price: "¥99",
    period: "/月",
    description: "适合专业开发者和小团队",
    features: [
      { text: "无限次代码生成", included: true },
      { text: "高级代码补全和重构", included: true },
      { text: "支持 100+ 编程语言", included: true },
      { text: "实时协作（最多 5 人）", included: true },
      { text: "高级 AI 模型", included: true },
      { text: "优先邮件支持", included: true },
      { text: "私有代码仓库集成", included: false },
    ],
    cta: "立即升级",
    popular: true
  },
  {
    name: "企业版",
    price: "定制",
    period: "",
    description: "适合大型团队和企业",
    features: [
      { text: "所有专业版功能", included: true },
      { text: "无限团队成员", included: true },
      { text: "私有部署选项", included: true },
      { text: "自定义 AI 模型训练", included: true },
      { text: "SSO 单点登录", included: true },
      { text: "24/7 专属支持", included: true },
      { text: "SLA 服务保障", included: true },
    ],
    cta: "联系销售",
    popular: false
  }
]

export default function PricingSection() {
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
              key={index}
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

                <button className={`w-full py-3 rounded-full font-medium transition-all ${
                  plan.popular 
                    ? 'gradient-bg text-white hover:opacity-90' 
                    : 'border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900'
                }`}>
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
            需要更多信息？查看我们的 <a href="#faq" className="text-orange-500 hover:underline">常见问题</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}