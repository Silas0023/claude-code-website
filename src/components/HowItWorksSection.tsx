"use client"

import { motion } from 'framer-motion'
import { 
  Download, 
  Code2, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Play
} from 'lucide-react'

const steps = [
  {
    icon: Download,
    title: "安装插件",
    description: "在您喜欢的IDE中安装 AI Code Mirror 插件",
    detail: "支持 VS Code、IntelliJ、Sublime Text 等主流编辑器"
  },
  {
    icon: Code2,
    title: "开始编码",
    description: "正常编写代码，AI 会实时分析您的代码上下文",
    detail: "无需额外配置，插件会自动识别项目类型和编程语言"
  },
  {
    icon: Sparkles,
    title: "获得建议",
    description: "获得智能代码补全、重构建议和错误修复",
    detail: "基于数百万代码库训练的 AI 模型提供精准建议"
  },
  {
    icon: CheckCircle,
    title: "提升效率",
    description: "代码质量更高，开发速度提升10倍",
    detail: "自动化重复任务，专注于核心业务逻辑开发"
  }
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-400/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 mb-6">
            <Play className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">工作原理</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            四步即可开始 <span className="gradient-text">AI 编程</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            简单易用的集成方式，让您快速上手 AI 辅助编程
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connection Lines */}
              <svg
                className="absolute top-24 left-0 w-full h-32 pointer-events-none"
                viewBox="0 0 800 128"
              >
                <path
                  d="M200,64 Q400,20 600,64"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#F7931E" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="relative"
                  >
                    <div className="text-center">
                      <div className="relative mx-auto mb-6">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                          <step.icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-sm font-bold text-orange-500 shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{step.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">{step.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-xs font-bold text-orange-500 shadow">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">{step.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <button className="gradient-bg text-white px-8 py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-200 group mx-auto">
            立即开始体验
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}