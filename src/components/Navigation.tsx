"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, Terminal, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#features', label: '功能特点' },
    { href: '#how-it-works', label: '工作原理' },
    { href: '#pricing', label: '定价' },
    { href: '#faq', label: '常见问题' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Terminal className="w-8 h-8 text-orange-500" />
              <Sparkles className="w-4 h-4 text-orange-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold">Claude Code</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <button className="gradient-bg text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              开始使用
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 bg-white/90 backdrop-blur-md rounded-lg p-4 dark:bg-gray-900/90"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium hover:text-orange-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button className="gradient-bg text-white px-6 py-2 rounded-full text-sm font-medium w-full mt-4">
              开始使用
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}