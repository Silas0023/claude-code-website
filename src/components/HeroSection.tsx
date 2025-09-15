"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Shield, Copy, Check, Terminal } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const ASCIIArtCanvas = dynamic(() => import('./ASCIIArtCanvas'), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-gradient-to-br from-orange-500/20 to-orange-400/20 rounded-lg animate-pulse" />
  )
})

export default function HeroSection() {
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const { checkAuth } = useAuth()
  
  const handleCopy = () => {
    navigator.clipboard.writeText('npm install -g @anthropic-ai/claude-code')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGetStarted = () => {
    if (checkAuth()) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 hero-bg">
      
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 mb-8"
          >
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Claude Code - 终端中的 AI 协作者</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            您的代码
            <br />
            <span className="gradient-text">新协作者</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            在终端中直接释放 Claude 的强大能力。瞬间搜索百万行代码库，
            将数小时的工作流程转化为单个命令。您的工具、您的工作流、您的代码库，以思维的速度进化。
          </motion.p>

          {/* Installation Command */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                安装 <a href="https://nodejs.org" className="text-orange-500 hover:underline" target="_blank" rel="noopener noreferrer">Node.js 18+</a>，然后运行：
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Terminal className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <code className="text-sm md:text-base font-mono text-gray-300">
                      <span className="text-orange-400">npm</span>{' '}
                      <span className="text-blue-400">install</span>{' '}
                      <span className="text-gray-500">-g</span>{' '}
                      <span className="text-green-400">@anthropic-ai/claude-code</span>
                    </code>
                  </div>
                  
                  <button
                    onClick={handleCopy}
                    className="ml-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group/btn"
                    aria-label="复制命令"
                  >
                    <motion.div
                      initial={false}
                      animate={{ scale: copied ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-400 group-hover/btn:text-white transition-colors" />
                      )}
                    </motion.div>
                  </button>
                </div>
              </div>
              
              {copied && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-sm text-green-500 mt-2"
                >
                  已复制到剪贴板！
                </motion.p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button
              onClick={handleGetStarted}
              className="gradient-bg text-white px-8 py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-200 group"
            >
              开始使用
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://docs.anthropic.com/zh-CN/docs/claude-code/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-full font-semibold text-base bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
            >
              查看文档
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap gap-8 justify-center text-sm"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm">
              <Zap className="w-4 h-4 text-orange-500" />
              <span className="font-medium">瞬间搜索</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm">
              <Shield className="w-4 h-4 text-orange-500" />
              <span className="font-medium">终端原生</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="font-medium">AI 协作</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 max-w-6xl mx-auto"
        >
          <ASCIIArtCanvas />
        </motion.div>
      </div>
    </section>
  )
}