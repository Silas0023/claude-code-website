'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageCircle,
  Copy,
  Check,
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  Send
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
  const [copied, setCopied] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // 模拟表单提交
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 这里可以集成真实的表单提交服务
      console.log('Form submitted:', formData);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = {
    email: 'support@claudecode.cn',
    wechatGroup: '微信群聊',
    phone: '+86 400-123-4567',
    address: '北京市朝阳区科技园区',
    workingHours: '周一至周五 9:00-18:00'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            联系我们
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            有任何问题或建议？我们很乐意为您提供帮助。选择最适合您的联系方式，我们将尽快回复。
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* WeChat Group Only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">加入微信交流群</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              扫描下方二维码加入 Claude Code 官方微信交流群，与其他用户一起交流使用心得，获取最新产品动态和技术支持。
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 inline-block">
              <div className="w-64 h-64 mx-auto mb-4 relative">
                <Image
                  src="/wxcode.jpg"
                  alt="微信群二维码"
                  width={256}
                  height={256}
                  className="rounded-xl border border-gray-200 shadow-sm"
                  priority
                />
              </div>
              <p className="text-gray-600 font-medium">
                🎯 扫码加入 Claude Code 用户交流群
              </p>
              <p className="text-sm text-gray-500 mt-2">
                群内有专业技术支持和热心用户答疑
              </p>
            </div>

            {/* 群功能介绍 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">实时交流</h3>
                <p className="text-sm text-gray-600">与其他用户实时交流使用经验</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Send className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">快速答疑</h3>
                <p className="text-sm text-gray-600">遇到问题快速获得专业解答</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">产品动态</h3>
                <p className="text-sm text-gray-600">第一时间获取产品更新信息</p>
              </div>
            </div>
          </motion.div>

          {/* FAQ Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-100 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">常见问题</h3>
            <p className="text-gray-600 mb-4">
              在加入群聊之前，您可以先查看常见问题解答，可能能够更快地找到答案。
            </p>
            <Link
              href="/#faq"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              查看常见问题
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}