"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Copy, Check, Terminal } from 'lucide-react'

const codeExamples = {
  javascript: {
    label: "JavaScript",
    before: `function calculateTotal(items) {
  let total = 0;
  for(let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}`,
    after: `// AI 优化建议：使用 reduce 方法更简洁
const calculateTotal = (items) => 
  items.reduce((total, item) => 
    total + item.price * item.quantity, 0);

// 添加类型安全和错误处理
const calculateTotalSafe = (items: Item[]): number => {
  return items?.reduce((total, item) => {
    if (!item?.price || !item?.quantity) return total;
    return total + item.price * item.quantity;
  }, 0) ?? 0;
};`
  },
  python: {
    label: "Python",
    before: `def process_data(data):
    result = []
    for item in data:
        if item['status'] == 'active':
            processed = {
                'id': item['id'],
                'name': item['name'].upper(),
                'score': item['score'] * 2
            }
            result.append(processed)
    return result`,
    after: `# AI 优化建议：使用列表推导和数据类
from dataclasses import dataclass
from typing import List, Dict, Any

@dataclass
class ProcessedItem:
    id: str
    name: str
    score: float

def process_data(data: List[Dict[str, Any]]) -> List[ProcessedItem]:
    """处理数据并返回优化后的结果"""
    return [
        ProcessedItem(
            id=item['id'],
            name=item['name'].upper(),
            score=item['score'] * 2
        )
        for item in data 
        if item.get('status') == 'active'
    ]`
  }
}

import dynamic from 'next/dynamic'

const InteractiveCodeEditor = dynamic(() => import('./InteractiveCodeEditor'), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-gray-900 rounded-xl animate-pulse" />
})

export default function CodeDemoSection() {
  const [activeTab, setActiveTab] = useState<'javascript' | 'python'>('javascript')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].after)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 mb-6">
            <Terminal className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">代码演示</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            看看 AI 如何 <span className="gradient-text">优化代码</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            实时查看 AI 如何分析和改进您的代码
          </p>
        </motion.div>

        {/* Interactive Code Editor */}
        <InteractiveCodeEditor />

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-white/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-2 dark:bg-gray-800/80 shadow-sm">
              {Object.entries(codeExamples).map(([key, example]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as 'javascript' | 'python')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === key
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {example.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:bg-gray-800/90"
            >
              <div className="px-6 py-4 border-b border-gray-200/20 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    原始代码
                  </h3>
                  <Monitor className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="p-6">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-gray-800 dark:text-gray-200">
                    {codeExamples[activeTab].before}
                  </code>
                </pre>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg dark:bg-gray-800/90"
            >
              <div className="px-6 py-4 border-b border-gray-200/20 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    AI 优化后
                  </h3>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg text-sm transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-orange-500" />
                    )}
                    {copied ? '已复制' : '复制'}
                  </button>
                </div>
              </div>
              <div className="p-6">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-gray-800 dark:text-gray-200">
                    {codeExamples[activeTab].after}
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 bg-gradient-to-br from-orange-500/10 to-orange-400/10 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">AI 优化亮点</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-blue-500" />
                </div>
                <h4 className="font-semibold mb-2">代码简化</h4>
                <p className="text-gray-600 dark:text-gray-400">减少代码行数，提高可读性</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-green-500" />
                </div>
                <h4 className="font-semibold mb-2">类型安全</h4>
                <p className="text-gray-600 dark:text-gray-400">添加类型注解和错误处理</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-purple-500" />
                </div>
                <h4 className="font-semibold mb-2">性能优化</h4>
                <p className="text-gray-600 dark:text-gray-400">使用更高效的算法和方法</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}