"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageCircle, Shield, Zap, Terminal, Code, Globe, Key, GitBranch, DollarSign } from 'lucide-react'

const faqs = [
  {
    question: "Claude Code 是什么？",
    answer: "Claude Code 是 Anthropic 的官方 CLI 工具，让您能够在终端中直接使用 Claude。它可以搜索大型代码库、自动化复杂的编码任务，并将多步骤工作流程转化为简单的命令。您的工具、您的工作流、您的代码库，都能以思维的速度进化。",
    icon: Terminal,
    category: "基础"
  },
  {
    question: "如何安装 Claude Code？",
    answer: "首先安装 Node.js 18+，然后运行命令：npm install -g @anthropic-ai/claude-code。安装完成后，使用 claude-code 命令即可开始使用。支持 macOS、Linux 和 Windows 系统。",
    icon: Code,
    category: "开始"
  },
  {
    question: "Claude Code 需要 API 密钥吗？",
    answer: "是的，您需要一个 Anthropic API 密钥才能使用 Claude Code。您可以在 console.anthropic.com 创建密钥。首次运行时，Claude Code 会提示您输入 API 密钥，它将被安全地存储在您的本地系统中。",
    icon: Key,
    category: "配置"
  },
  {
    question: "Claude Code 支持哪些功能？",
    answer: "Claude Code 支持：智能代码搜索和理解、多文件同时编辑、自动化工作流程、项目级上下文理解、Git 集成、测试生成和运行、代码重构和优化建议等。它能理解您的整个代码库并提供上下文相关的帮助。",
    icon: Zap,
    category: "功能"
  },
  {
    question: "我的代码数据安全吗？",
    answer: "您的代码永远不会被 Anthropic 存储或用于训练。Claude Code 在本地运行，只有在您明确请求时才会将必要的上下文发送给 Claude API。所有通信都是加密的，我们遵循严格的隐私和安全标准。",
    icon: Shield,
    category: "安全"
  },
  {
    question: "Claude Code 与 IDE 插件有何不同？",
    answer: "Claude Code 是终端原生工具，专为命令行工作流设计。它可以执行系统命令、管理文件、运行测试，并与您现有的终端工具无缝集成。这提供了比 IDE 插件更大的灵活性和控制力。",
    icon: Terminal,
    category: "对比"
  },
  {
    question: "Claude Code 可以处理大型代码库吗？",
    answer: "是的！Claude Code 专门优化了对大型代码库的处理。它使用智能索引和搜索策略，可以快速导航和理解数百万行代码，只将相关上下文发送给 Claude，确保快速响应。",
    icon: Globe,
    category: "性能"
  },
  {
    question: "如何获得帮助和支持？",
    answer: "您可以查看官方文档 docs.anthropic.com/claude-code，加入我们的 Discord 社区获得帮助，或在 GitHub 上报告问题和请求功能。企业用户可以获得优先支持服务。",
    icon: MessageCircle,
    category: "支持"
  },
  {
    question: "Claude Code 是开源的吗？",
    answer: "Claude Code 的核心功能是专有的，但我们在 GitHub 上开源了许多集成和扩展。社区可以贡献插件、工作流模板和改进建议。查看 github.com/anthropic-ai/claude-code 了解更多。",
    icon: GitBranch,
    category: "开源"
  },
  {
    question: "定价如何运作？",
    answer: "Claude Code 本身是免费的，但需要 Anthropic API 密钥。API 使用按 Claude 的标准定价计费。您只需为实际使用的 API 调用付费，没有额外的 Claude Code 使用费。",
    icon: DollarSign,
    category: "价格"
  }
]

const categories = [...new Set(faqs.map(faq => faq.category))]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("全部")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const filteredFaqs = selectedCategory === "全部" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 mb-6"
          >
            <HelpCircle className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              常见问题解答
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            有问题？<span className="gradient-text">我们有答案</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            了解 Claude Code 的一切，从基础安装到高级功能
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setSelectedCategory("全部")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "全部"
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-white/10 backdrop-blur-sm border border-gray-200/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10'
            }`}
          >
            全部问题
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-white/10 backdrop-blur-sm border border-gray-200/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, index) => {
              const Icon = faq.icon
              const isOpen = openIndex === index
              const isHovered = hoveredIndex === index

              return (
                <motion.div
                  key={`${selectedCategory}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="mb-4"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div 
                    animate={{
                      scale: isHovered ? 1.02 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`
                      relative overflow-hidden rounded-2xl transition-all duration-300
                      ${isOpen 
                        ? 'bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-purple-500/10 border-2 border-orange-500/30 shadow-xl' 
                        : 'bg-white/5 backdrop-blur-md border border-gray-200/10 dark:border-white/10 shadow-lg hover:shadow-xl'
                      }
                    `}
                  >
                    {/* Glow Effect */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}

                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="relative w-full px-6 py-5 text-left flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={{ 
                            rotate: isOpen ? 360 : 0,
                            scale: isOpen ? 1.2 : 1
                          }}
                          transition={{ duration: 0.5, type: "spring" }}
                          className={`
                            p-2.5 rounded-xl 
                            ${isOpen 
                              ? 'bg-gradient-to-br from-orange-500 to-pink-500 shadow-lg' 
                              : 'bg-gradient-to-br from-orange-500/20 to-pink-500/20'
                            }
                          `}
                        >
                          <Icon className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-orange-500'}`} />
                        </motion.div>
                        
                        <div>
                          <span className={`font-semibold text-lg ${isOpen ? 'text-orange-500' : ''}`}>
                            {faq.question}
                          </span>
                          {!isOpen && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {faq.category}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ 
                          rotate: isOpen ? 180 : 0,
                          scale: isHovered ? 1.2 : 1
                        }}
                        transition={{ duration: 0.3 }}
                        className={`
                          p-2 rounded-full transition-colors
                          ${isOpen 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-orange-500/10 text-orange-500 group-hover:bg-orange-500/20'
                          }
                        `}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <motion.div 
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="px-6 pb-6 pt-2"
                          >
                            <div className="pl-14">
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {faq.answer}
                              </p>
                              
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-4 flex items-center gap-2"
                              >
                                <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
                                  {faq.category}
                                </span>
                                <span className="text-xs text-gray-500">
                                  点击了解更多细节
                                </span>
                              </motion.div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            还有其他问题？我们随时为您提供帮助
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://docs.anthropic.com/zh-CN/docs/claude-code/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              查看文档
            </a>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-gray-200/20 dark:border-white/10 rounded-full font-medium hover:bg-white/20 dark:hover:bg-white/10 transition-all">
              加入社区
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}