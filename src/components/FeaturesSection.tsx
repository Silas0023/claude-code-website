"use client"

import { motion } from 'framer-motion'
import { 
  Terminal, 
  Search, 
  FileEdit, 
  Package, 
  Workflow, 
  Bot,
  GitBranch,
  TestTube,
  Globe,
  Sparkles,
  Shield,
  Zap
} from 'lucide-react'

const features = [
  {
    icon: Terminal,
    title: "终端原生集成",
    description: "直接在终端中释放 Claude 的强大能力，无需离开命令行环境",
    gradient: "from-orange-500 to-orange-600"
  },
  {
    icon: Search,
    title: "智能代码搜索",
    description: "瞬间搜索百万行代码库，精准定位所需代码片段",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: FileEdit,
    title: "多文件编辑",
    description: "同时编辑多个文件，保持代码一致性和完整性",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Package,
    title: "项目级理解",
    description: "深度理解整个项目架构，提供上下文相关的智能建议",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Workflow,
    title: "自动化工作流",
    description: "将复杂的多步骤任务转化为单个命令，提升开发效率",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Bot,
    title: "AI 代理模式",
    description: "自主完成复杂任务，从代码生成到测试调试全程自动化",
    gradient: "from-indigo-500 to-blue-500"
  }
]

const advancedFeatures = [
  {
    icon: GitBranch,
    title: "Git 深度集成",
    description: "智能提交信息生成、代码审查和冲突解决",
  },
  {
    icon: TestTube,
    title: "智能测试生成",
    description: "自动生成单元测试和集成测试，确保代码质量",
  },
  {
    icon: Globe,
    title: "跨平台支持",
    description: "支持 macOS、Linux 和 Windows，无缝工作体验",
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Claude Code <span className="gradient-text">核心功能</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            将 Claude 的强大能力直接带入您的开发环境，以思维的速度进化您的代码库
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-md border border-gray-200/20 dark:border-white/10 rounded-2xl p-8 h-full shadow-lg card-hover dark:bg-white/5">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-orange-500/10 to-orange-400/10 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">企业级功能</h3>
            <p className="text-gray-600 dark:text-gray-400">
              为专业开发团队打造的强大工具集
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}