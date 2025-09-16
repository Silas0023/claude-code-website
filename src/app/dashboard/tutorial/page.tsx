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
              <WindowsTutorial key="windows" handleCopyCode={handleCopyCode} copiedCode={copiedCode} />
            )}
            {activeTab === 'macos' && (
              <MacOSTutorial key="macos" handleCopyCode={handleCopyCode} copiedCode={copiedCode} />
            )}
            {activeTab === 'linux' && (
              <LinuxTutorial key="linux" handleCopyCode={handleCopyCode} copiedCode={copiedCode} />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}