import Link from 'next/link'
import { Code2, Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react'

const footerLinks = {
  产品: [
    { label: '功能特点', href: '#features' },
    { label: '定价', href: '#pricing' },
    { label: '演示', href: '#demo' },
    { label: '更新日志', href: '#changelog' },
  ],
  资源: [
    { label: '文档', href: '#docs' },
    { label: 'API 参考', href: '#api' },
    { label: '教程', href: '#tutorials' },
    { label: '博客', href: '#blog' },
  ],
  公司: [
    { label: '关于我们', href: '#about' },
    { label: '团队', href: '#team' },
    { label: '职位', href: '#careers' },
    { label: '联系我们', href: '#contact' },
  ],
  法律: [
    // { label: '隐私政策', href: '#privacy' },
    // { label: '服务条款', href: '#terms' },
    { label: 'Cookie 政策', href: '#cookies' },
    { label: '许可证', href: '#license' },
  ],
}

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Code2 className="w-8 h-8 text-orange-500" />
                <Sparkles className="w-4 h-4 text-orange-400 absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-bold">AI Code Mirror</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              让 AI 成为您的编程助手，提升开发效率
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center hover:bg-orange-500/10 hover:text-orange-500 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 AI Code Mirror. 保留所有权利。
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
                状态
              </Link>
              <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
                安全
              </Link>
              <Link href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors">
                站点地图
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}