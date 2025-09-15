"use client"

import { motion } from 'framer-motion'
import { Star, Quote, Users } from 'lucide-react'

const testimonials = [
  {
    name: "张伟",
    role: "前端开发工程师",
    company: "阿里巴巴",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "AI Code Mirror 彻底改变了我的编程方式。代码补全的准确度令人惊叹，帮我节省了至少30%的开发时间。",
    rating: 5
  },
  {
    name: "李思思",
    role: "全栈开发者",
    company: "腾讯",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    content: "作为一个全栈开发者，我需要在多种语言间切换。AI Code Mirror 在每种语言上都表现出色，是我最信赖的编程助手。",
    rating: 5
  },
  {
    name: "王强",
    role: "技术总监",
    company: "字节跳动",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "团队使用AI Code Mirror后，代码质量明显提升，bug数量减少了50%。这是我们团队效率提升的关键工具。",
    rating: 5
  },
  {
    name: "刘玲",
    role: "Python 开发工程师",
    company: "美团",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "AI的代码重构建议非常智能，经常给出我没想到的优化方案。现在写代码就像有一个高级导师在旁边指导。",
    rating: 5
  },
  {
    name: "陈明",
    role: "后端架构师",
    company: "滴滴",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    content: "安全性是我最关心的问题，AI Code Mirror不存储代码，完全本地处理，让我可以放心使用。性能也很出色。",
    rating: 5
  },
  {
    name: "赵雅",
    role: "移动端开发",
    company: "小米",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    content: "从React Native到Flutter，AI Code Mirror都能提供精准的代码建议。跨平台开发变得前所未有的简单。",
    rating: 5
  }
]

export default function TestimonialsSection() {
  const renderStars = (rating: number) => {
    return Array(rating).fill(0).map((_, index) => (
      <Star key={index} className="w-4 h-4 text-yellow-400 fill-current" />
    ))
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-400/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <Users className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">用户评价</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            用户都在说什么 <span className="gradient-text">好话</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            来自全球超过100万开发者的真实反馈
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-md border border-gray-200/20 dark:border-white/10 rounded-2xl p-6 shadow-lg card-hover dark:bg-white/5"
              >
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <div className="relative mb-4">
                  <Quote className="w-8 h-8 text-orange-500/30 absolute -top-2 -left-2" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-400/10 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">1M+</div>
                  <p className="text-gray-600 dark:text-gray-400">活跃用户</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">99%</div>
                  <p className="text-gray-600 dark:text-gray-400">用户满意度</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">50%</div>
                  <p className="text-gray-600 dark:text-gray-400">开发效率提升</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}