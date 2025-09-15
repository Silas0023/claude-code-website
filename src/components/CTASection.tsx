"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Download, X } from 'lucide-react'

export default function CTASection() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-orange-600/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">开始您的 AI 编程之旅</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            准备好让 AI 改变您的
            <br />
            <span className="gradient-text">编程方式了吗？</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            加入超过100万开发者的行列，体验前所未有的编程效率提升。
            立即开始，无需信用卡，免费试用所有功能。
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button className="gradient-bg text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity group text-lg animate-pulse-glow">
              <Download className="w-5 h-5" />
              立即免费试用
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => setShowVideo(true)}
              className="px-8 py-4 rounded-full font-medium border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 text-lg"
            >
              观看产品演示
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 dark:bg-white/5 dark:border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-green-500 mb-2">14天</h3>
                <p className="text-gray-600 dark:text-gray-400">免费试用期</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-blue-500 mb-2">30秒</h3>
                <p className="text-gray-600 dark:text-gray-400">快速安装配置</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-purple-500 mb-2">随时</h3>
                <p className="text-gray-600 dark:text-gray-400">取消订阅</p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-sm text-gray-500 dark:text-gray-500 mt-6"
          >
            受到全球顶级科技公司信赖 • 企业级安全保护 • 24/7 客户支持
          </motion.p>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/AJpK3YTTKZ4"
                  title="Introducing Claude Code"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}