'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Smartphone, Shield, Sparkles, Code, Zap, Bot, Rocket } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import TypingAnimation from '@/components/TypingAnimation';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const { loginWithPhone, sendVerificationCode } = useAuth();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = async () => {
    if (!phone) {
      toast.error('请输入手机号', {
        icon: '📱',
        style: {
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        },
      });
      return;
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      toast.error('请输入有效的手机号', {
        icon: '⚠️',
        style: {
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        },
      });
      return;
    }

    setIsSendingCode(true);
    try {
      await sendVerificationCode(phone);
      setCountdown(60);
      toast.success('验证码已发送', {
        icon: '✉️',
        style: {
          borderRadius: '12px',
          background: '#10b981',
          color: '#fff',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
        },
      });
    } catch (err: any) {
      toast.error(err.message || '发送失败，请重试', {
        icon: '❌',
        style: {
          borderRadius: '12px',
          background: '#ef4444',
          color: '#fff',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
        },
      });
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !verificationCode) {
      toast.error('请输入手机号和验证码', {
        icon: '📝',
        style: {
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        },
      });
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('正在登录...', {
      style: {
        borderRadius: '12px',
        background: '#333',
        color: '#fff',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      },
    });

    try {
      await loginWithPhone(phone, verificationCode);
      toast.dismiss(loadingToast);
      toast.success('登录成功！', {
        icon: '🎉',
        style: {
          borderRadius: '12px',
          background: '#10b981',
          color: '#fff',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
        },
      });
      router.push('/dashboard');
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err.message || '验证码错误，请重试', {
        icon: '❌',
        style: {
          borderRadius: '12px',
          background: '#ef4444',
          color: '#fff',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.substring(0, 11);
    if (limited.length > 7) {
      return `${limited.slice(0, 3)} ${limited.slice(3, 7)} ${limited.slice(7)}`;
    } else if (limited.length > 3) {
      return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    }
    return limited;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted.replace(/\s/g, ''));
    e.target.value = formatted;
  };

  const typingTexts = [
    "Claude Code 智能编程助手",
    "AI 驱动的代码生成",
    "提升开发效率 10 倍",
    "支持多种编程语言",
    "智能代码补全和优化",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            padding: '16px',
            maxWidth: '400px',
          },
        }}
      />

      {/* Left Section - Introduction with Typing Animation */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-orange-500 to-purple-600 p-12 items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-500" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-3xl mb-8">
              <Code className="w-12 h-12 text-white" />
            </div>

            <TypingAnimation texts={typingTexts} />

            <p className="text-white/90 text-lg mt-8 leading-relaxed">
              体验下一代 AI 编程助手，让代码编写更简单、更高效。Claude Code 为您提供智能的代码生成、优化和调试功能。
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span>极速代码生成，秒级响应</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span>基于最新 Claude AI 模型</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span>持续学习，不断进化</span>
            </div>
          </motion.div>

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex items-center gap-4"
          >
            <div className="w-12 h-1 bg-white/30 rounded-full" />
            <div className="w-6 h-1 bg-white/30 rounded-full" />
            <div className="w-3 h-1 bg-white/30 rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            {/* Logo */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg mb-4"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">欢迎回来</h1>
              <p className="text-gray-500 mt-2">登录您的 Claude Code 账户</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  手机号码
                </label>
                <div className="relative group">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    type="tel"
                    onChange={handlePhoneChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all"
                    placeholder="请输入手机号"
                    maxLength={13}
                  />
                </div>
              </div>

              {/* Verification Code Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  验证码
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1 group">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').substring(0, 6))}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all font-mono tracking-wider text-center"
                      placeholder="6位验证码"
                      maxLength={6}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleSendCode}
                    disabled={countdown > 0 || isSendingCode}
                    className="px-5 py-3.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-medium rounded-2xl hover:from-gray-100 hover:to-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] border border-gray-200"
                  >
                    {isSendingCode ? (
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin mx-auto" />
                    ) : countdown > 0 ? (
                      <span className="font-mono">{countdown}s</span>
                    ) : (
                      <span>发送验证码</span>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>立即登录</span>
                )}
              </motion.button>

              {/* Auto Register Notice */}
              <p className="text-center text-sm text-gray-500 mt-6">
                💡 新用户首次登录会自动注册
              </p>
            </form>
          </div>

          {/* Footer Links */}
          {/* <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gray-700 transition-colors">服务条款</Link>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">隐私政策</Link>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <Link href="/help" className="hover:text-gray-700 transition-colors">帮助中心</Link>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
}