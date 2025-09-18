'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import {
  BookOpen,
  Menu,
  Monitor,
  Apple,
  Terminal,
  CheckCircle,
  Copy,
  Check,
  ChevronRight,
  Download,
  Settings,
  Code,
  AlertCircle
} from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { WindowsTutorial, MacOSTutorial, LinuxTutorial } from '@/components/TutorialContent';

export default function TutorialPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'windows' | 'macos' | 'linux'>('windows');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        user={user}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 lg:py-5 flex-shrink-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">使用教程</h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">学习如何使用 Claude Code</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-gray-50">
          {/* API Key Display */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg mb-6 p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">您的 API Key</h3>
                  <p className="text-sm text-gray-600">用于调用 Claude Code API 服务</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-lg px-4 py-2 border border-gray-200 font-mono text-sm text-gray-700 select-all">
                  {user?.userInfo?.apiKey || '加载中...'}
                </div>
                <button
                  onClick={() => handleCopyCode(user?.userInfo?.apiKey || '')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                  disabled={!user?.userInfo?.apiKey}
                >
                  {copiedCode === user?.userInfo?.apiKey ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="hidden sm:inline">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">复制</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            {/* <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">重要提示：</p>
                  <p>请妥善保管您的 API Key，不要在公开场所分享。如果需要重置，请访问 <a href="/dashboard/api-keys" className="text-blue-600 hover:underline">API 密钥管理</a> 页面。</p>
                </div>
              </div>
            </div> */}
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-lg mb-6 p-2">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('windows')}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'windows'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Monitor className="w-5 h-5" />
                <span>Windows</span>
              </button>
              <button
                onClick={() => setActiveTab('macos')}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'macos'
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Apple className="w-5 h-5" />
                <span>macOS</span>
              </button>
              <button
                onClick={() => setActiveTab('linux')}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'linux'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Terminal className="w-5 h-5" />
                <span>Linux / WSL2</span>
              </button>
            </div>
          </div>

          {/* Tutorial Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'windows' && (
              <WindowsTutorial key="windows" handleCopyCode={handleCopyCode} copiedCode={copiedCode} apiKey={user?.userInfo?.apiKey} />
            )}
            {activeTab === 'macos' && (
              <MacOSTutorial key="macos" handleCopyCode={handleCopyCode} copiedCode={copiedCode} apiKey={user?.userInfo?.apiKey} />
            )}
            {activeTab === 'linux' && (
              <LinuxTutorial key="linux" handleCopyCode={handleCopyCode} copiedCode={copiedCode} apiKey={user?.userInfo?.apiKey} />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}