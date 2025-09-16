'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  LayoutDashboard,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Star,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface MenuItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: MenuItem[];
  badge?: string;
  external?: boolean;
}

interface DashboardSidebarProps {
  onLogout: () => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
  user?: any;
}

export default function DashboardSidebar({
  onLogout,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen = () => {},
  user
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>(['使用教程']);

  // Auto-expand parent menu when a child page is active
  useEffect(() => {
    // Define parent-child relationships
    const parentChildMap: { [key: string]: string[] } = {
      '使用教程': ['/dashboard/docs', '/dashboard/wechat', '/dashboard/videos'],
      '会员中心': ['/dashboard/upgrade', '/dashboard/invite', '/dashboard/offers']
    };

    // Find which parent should be expanded based on current path
    Object.entries(parentChildMap).forEach(([parent, children]) => {
      if (children.includes(pathname)) {
        setExpandedItems(prev => {
          if (!prev.includes(parent)) {
            return [...prev, parent];
          }
          return prev;
        });
      }
    });
  }, [pathname]);

  const menuItems: MenuItem[] = [
    {
      label: '概览',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      label: '使用教程',
      href: '/dashboard/tutorial',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      label: '升级订阅',
      href: '/dashboard/upgrade',
      icon: <Star className="w-5 h-5" />,
      badge: 'PRO'
    },
    {
      label: '帮助中心',
      href: 'https://docs.anthropic.com/zh-CN/docs/claude-code/overview',
      icon: <HelpCircle className="w-5 h-5" />,
      external: true
    }
  ];

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href;
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const active = isActive(item.href);

    if (hasChildren) {
      return (
        <div key={item.label}>
          <button
            onClick={() => toggleExpanded(item.label)}
            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              isExpanded ? 'text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
            <div className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1">
              {item.children.map(child => renderMenuItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    // Handle external links
    if (item.external) {
      return (
        <a
          key={item.label}
          href={item.href || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
            active
              ? 'bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-500/20 dark:to-pink-500/20 text-orange-700 dark:text-white border border-orange-200 dark:border-orange-500/30'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
          } ${depth > 0 ? 'pl-11' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span>{item.label}</span>
          </div>
          {item.badge && (
            <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
              item.badge === 'PRO'
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                : 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400'
            }`}>
              {item.badge}
            </span>
          )}
        </a>
      );
    }

    return (
      <Link
        key={item.label}
        href={item.href || '#'}
        className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
          active
            ? 'bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-500/20 dark:to-pink-500/20 text-orange-700 dark:text-white border border-orange-200 dark:border-orange-500/30'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
        } ${depth > 0 ? 'pl-11' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="flex items-center gap-3">
          {item.icon}
          <span>{item.label}</span>
        </div>
        {item.badge && (
          <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
            item.badge === 'PRO'
              ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
              : 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400'
          }`}>
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 fixed lg:static w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col z-50`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="p-2.5 gradient-bg rounded-xl shadow-md group-hover:shadow-lg transition-all">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Claude Code</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">仪表板概览</p>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-500/10 dark:to-pink-500/10 rounded-xl p-3 mb-3">
            {user && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user.userInfo?.phone ? user.userInfo.phone.charAt(0) : 'U'}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.userInfo?.phone ?
                        user.userInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') :
                        '用户'
                      }
                    </div>
                    {/* <div className="text-xs text-gray-500 dark:text-gray-400">
                      ID: {user.userInfo?.id || user.userStats?.id || 'N/A'}
                    </div> */}
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">当前套餐</span>
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                {user?.userInfo?.planName || 'FREE'}
              </span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              过期时间: {user?.userInfo?.subscribeEndTime
                ? new Date(user.userInfo.subscribeEndTime).toLocaleDateString('zh-CN')
                : '永不过期'
              }
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
                style={{
                  width: (() => {
                    if (!user?.userInfo?.subscribeStartTime || !user?.userInfo?.subscribeEndTime) {
                      return '100%';
                    }
                    const startTime = new Date(user.userInfo.subscribeStartTime).getTime();
                    const endTime = new Date(user.userInfo.subscribeEndTime).getTime();
                    const currentTime = Date.now();
                    const totalDuration = endTime - startTime;
                    const usedDuration = currentTime - startTime;
                    const percentage = Math.max(0, Math.min(100, (usedDuration / totalDuration) * 100));
                    return `${percentage}%`;
                  })()
                }}
              />
            </div>
          </div>

          <button
            onClick={() => {
              onLogout();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </div>
    </>
  );
}