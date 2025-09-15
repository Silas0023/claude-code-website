'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  Terminal,
  Code,
  Zap,
  Shield,
  GitBranch,
  Package,
  Settings,
  FileText,
  ChevronRight,
  ExternalLink,
  Star,
  Clock
,
  Menu
} from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface DocSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  articles: {
    title: string;
    readTime: string;
    isNew?: boolean;
    isPopular?: boolean;
  }[];
}

export default function DocsPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const docSections: DocSection[] = [
    {
      id: 'getting-started',
      title: '快速开始',
      icon: <Zap className="w-5 h-5" />,
      description: '从安装到第一次使用的完整指南',
      articles: [
        { title: '安装 Claude Code CLI', readTime: '3 分钟', isNew: true },
        { title: '配置环境变量', readTime: '2 分钟' },
        { title: '第一个命令', readTime: '5 分钟', isPopular: true },
        { title: '基础配置说明', readTime: '4 分钟' }
      ]
    },
    {
      id: 'core-features',
      title: '核心功能',
      icon: <Terminal className="w-5 h-5" />,
      description: '深入了解 Claude Code 的强大功能',
      articles: [
        { title: '智能代码搜索', readTime: '6 分钟', isPopular: true },
        { title: 'AI 代码补全', readTime: '8 分钟' },
        { title: '代码重构建议', readTime: '7 分钟' },
        { title: '自动化测试生成', readTime: '10 分钟', isNew: true }
      ]
    },
    {
      id: 'advanced',
      title: '高级用法',
      icon: <Code className="w-5 h-5" />,
      description: '掌握高级技巧，提升开发效率',
      articles: [
        { title: '自定义命令别名', readTime: '5 分钟' },
        { title: '批处理操作', readTime: '8 分钟' },
        { title: '集成开发工作流', readTime: '12 分钟', isPopular: true },
        { title: '性能优化技巧', readTime: '9 分钟' }
      ]
    },
    {
      id: 'integrations',
      title: '集成指南',
      icon: <GitBranch className="w-5 h-5" />,
      description: '与各种开发工具无缝集成',
      articles: [
        { title: 'VS Code 集成', readTime: '4 分钟', isPopular: true },
        { title: 'Git 工作流集成', readTime: '6 分钟' },
        { title: 'CI/CD 管道配置', readTime: '10 分钟' },
        { title: 'Docker 容器化', readTime: '8 分钟', isNew: true }
      ]
    },
    {
      id: 'api',
      title: 'API 参考',
      icon: <Package className="w-5 h-5" />,
      description: '完整的 API 文档和示例代码',
      articles: [
        { title: 'REST API 概览', readTime: '15 分钟' },
        { title: '认证与授权', readTime: '6 分钟' },
        { title: '错误处理', readTime: '5 分钟' },
        { title: 'SDK 使用指南', readTime: '12 分钟', isNew: true }
      ]
    },
    {
      id: 'security',
      title: '安全最佳实践',
      icon: <Shield className="w-5 h-5" />,
      description: '保护您的代码和数据安全',
      articles: [
        { title: '密钥管理', readTime: '5 分钟', isPopular: true },
        { title: '数据加密', readTime: '7 分钟' },
        { title: '访问控制', readTime: '6 分钟' },
        { title: '审计日志', readTime: '4 分钟' }
      ]
    }
  ];

  const filteredSections = docSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.articles.some(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">官方文档</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">学习如何充分利用 Claude Code 的强大功能</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">在新窗口打开</span>
            </motion.button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索文档..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">快速入门</h3>
                  <p className="text-sm text-gray-600">5 分钟上手指南</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </motion.a>

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">视频教程</h3>
                  <p className="text-sm text-gray-600">观看实战演示</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </motion.a>

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">常见问题</h3>
                  <p className="text-sm text-gray-600">快速解决问题</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
            </motion.a>
          </div>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        {section.icon}
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                        <p className="text-sm text-gray-500">{section.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {section.articles.map((article, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">
                            {article.title}
                          </span>
                          {article.isNew && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                              新
                            </span>
                          )}
                          {article.isPopular && (
                            <Star className="w-3.5 h-3.5 text-yellow-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                      </a>
                    ))}
                  </div>

                  <button className="w-full mt-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
                    查看全部 →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl border border-orange-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">需要更多帮助？</h3>
                <p className="text-sm text-gray-600">
                  加入我们的社区，获取实时支持和最新资讯
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:shadow-md transition-all">
                  社区论坛
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:shadow-md transition-all">
                  联系支持
                </button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}