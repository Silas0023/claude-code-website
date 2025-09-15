'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Smartphone, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [error, setError] = useState('');
  const [codeError, setCodeError] = useState('');
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
    setCodeError('');
    setError('');

    if (!phone) {
      setCodeError('请输入手机号');
      return;
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setCodeError('请输入有效的手机号');
      return;
    }

    setIsSendingCode(true);
    try {
      await sendVerificationCode(phone);
      setCountdown(60);
      setCodeError('');
    } catch (err: any) {
      setCodeError(err.message || '发送失败，请重试');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone || !verificationCode) {
      setError('请输入手机号和验证码');
      return;
    }

    setIsLoading(true);
    try {
      await loginWithPhone(phone, verificationCode);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || '验证码错误，请重试');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
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
              {codeError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {codeError}
                </motion.p>
              )}
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

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              ) : (
                <span>立即登录</span>
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-400">或者</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              还没有账户？
              <Link href="/register" className="text-orange-500 hover:text-orange-600 font-medium ml-1 transition-colors">
                立即注册
              </Link>
            </p>
          </form>

          {/* Test Account Notice */}
          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-100">
            <div className="flex items-start gap-2">
              <span className="text-orange-500 text-lg">💡</span>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-700 mb-1">测试账户</p>
                <p>输入任意手机号，验证码使用 <code className="font-mono font-bold text-orange-600 bg-white px-1.5 py-0.5 rounded">123456</code></p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-gray-700 transition-colors">服务条款</Link>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <Link href="/privacy" className="hover:text-gray-700 transition-colors">隐私政策</Link>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <Link href="/help" className="hover:text-gray-700 transition-colors">帮助中心</Link>
        </div>
      </motion.div>
    </div>
  );
}