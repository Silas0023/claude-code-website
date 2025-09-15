'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Save,
  Check,
  AlertCircle,
  Camera,
  Menu,
  TrendingUp,
  Clock,
  Users,
  Copy,
  Gift
} from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user, logout, setServerUrl, getServerUrl } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [saved, setSaved] = useState(false);
  const [serverUrl, setServerUrlState] = useState(getServerUrl());

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '138****5678',
    bio: '热爱编程的全栈开发者'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: true,
    newsletter: false,
    security: true
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
    ipWhitelist: false
  });

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSave = () => {
    if (activeTab === 'server') {
      setServerUrl(serverUrl);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleServerUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerUrlState(e.target.value);
  };

  const tabs = [
    { id: 'overview', label: '仪表板概览', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'profile', label: '个人资料', icon: <User className="w-4 h-4" /> },
    { id: 'server', label: '服务器设置', icon: <Settings className="w-4 h-4" /> },
    { id: 'notifications', label: '通知设置', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: '安全设置', icon: <Shield className="w-4 h-4" /> },
    { id: 'appearance', label: '外观设置', icon: <Sun className="w-4 h-4" /> },
    { id: 'language', label: '语言地区', icon: <Globe className="w-4 h-4" /> }
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex overflow-hidden">
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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">设置</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">管理您的账户设置和偏好</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="hidden sm:flex px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all items-center gap-2"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">已保存</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">保存更改</span>
                </>
              )}
            </motion.button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100/50 p-3 backdrop-blur-sm">
                <div className="space-y-1">
                  {tabs.map(tab => (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Usage Statistics */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100/50 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">当前积分</h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>补充: 今天剩余</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">今日剩余</span>
                        <span className="text-2xl font-bold text-gray-900">2,000 / 2,000</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div className="bg-gradient-to-r from-green-400 via-orange-400 to-red-400 h-3 rounded-full" style={{width: '100%'}}></div>
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0:00</span>
                        <span>8:00</span>
                        <span>12:00</span>
                        <span>18:00</span>
                        <span>24:00</span>
                      </div>
                      
                      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                        <p className="text-sm text-green-700 font-medium">FREE用户每天免费体验300积分</p>
                        <p className="text-xs text-green-600 mt-1">补充周期: 0 积分/小时 • 上次补充时间: -</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Plans */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: 'FREE', price: '免费试用', features: ['体验Claude Code的基础功能', '适合轻度使用和初次体验'], color: 'gray', button: '当前计划' },
                      { name: 'PRO', price: '¥50/月', features: ['享受Claude 4 Sonnet模型', '满足日常开发'], color: 'orange', button: '立即升级' },
                      { name: 'MAX', price: '¥200/月', features: ['为重度用户设计，深度体验用Claude 4.1 Opus'], color: 'purple', button: '立即升级' },
                      { name: 'ULTRA', price: '¥500/月', features: ['为企业级应用打造，享受Claude 4倍速'], color: 'blue', button: '立即升级' }
                    ].map((plan, index) => (
                      <motion.div
                        key={plan.name}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100/50 p-6 backdrop-blur-sm"
                      >
                        <div className="text-center">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
                          <p className="text-sm text-gray-600 mb-4">{plan.price}</p>
                          <div className="space-y-2 mb-6">
                            {plan.features.map((feature, idx) => (
                              <p key={idx} className="text-xs text-gray-500">{feature}</p>
                            ))}
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                              index === 0 
                                ? 'bg-gray-100 text-gray-700'
                                : `bg-gradient-to-r ${plan.color === 'orange' ? 'from-orange-500 to-orange-600' : plan.color === 'purple' ? 'from-purple-500 to-purple-600' : 'from-blue-500 to-blue-600'} text-white hover:shadow-lg`
                            }`}
                          >
                            {plan.button}
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Invite Section */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100/50 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <Gift className="w-6 h-6 text-orange-500" />
                      <h2 className="text-xl font-bold text-gray-900">邀请好友</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">我的邀请人</label>
                            <div className="flex items-center gap-3">
                              <input 
                                type="text" 
                                value="9ROTYY" 
                                readOnly 
                                className="flex-1 px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-gray-700 backdrop-blur-sm"
                              />
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <Copy className="w-4 h-4 text-gray-600" />
                              </motion.button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">我的邀请链接</label>
                            <div className="flex items-center gap-3">
                              <input 
                                type="text" 
                                value="https://www.accodemirror.com/register?invitecode=9ROTYY" 
                                readOnly 
                                className="flex-1 px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-gray-700 text-sm backdrop-blur-sm"
                              />
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <Copy className="w-4 h-4 text-gray-600" />
                              </motion.button>
                            </div>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                          >
                            生成邀请码
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-6 border border-orange-100">
                        <h3 className="font-semibold text-gray-900 mb-3">我邀请的用户</h3>
                        <div className="text-center py-8">
                          <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500">还没有邀请用户</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100/50 p-6 backdrop-blur-sm"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">个人资料</h2>

                  {/* Avatar Section */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        {profile.name.charAt(0) || 'U'}
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
                      >
                        <Camera className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>
                    <div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-lg hover:shadow-md transition-all"
                      >
                        更换头像
                      </motion.button>
                      <p className="text-sm text-gray-500 mt-2">支持 JPG、PNG，最大 2MB</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        用户名
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        邮箱地址
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all backdrop-blur-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        手机号码
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="tel"
                          value={profile.phone}
                          readOnly
                          className="flex-1 px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-gray-500 backdrop-blur-sm"
                        />
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-xl hover:shadow-md transition-all"
                        >
                          更换号码
                        </motion.button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        个人简介
                      </label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all resize-none backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'server' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100/50 p-6 backdrop-blur-sm"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">服务器设置</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API 服务器地址
                      </label>
                      <input
                        type="url"
                        value={serverUrl}
                        onChange={handleServerUrlChange}
                        className="w-full px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all backdrop-blur-sm"
                        placeholder="http://127.0.0.1:8088"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        配置后端API服务器的地址，包括协议和端口号
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">服务器配置说明</h3>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 确保服务器地址可访问</li>
                            <li>• 支持的API接口：登录、发送验证码、获取套餐</li>
                            <li>• 默认地址：http://127.0.0.1:8088</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">当前连接状态</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600">已连接</span>
                        <span className="text-gray-500">- {serverUrl}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100/50 p-6 backdrop-blur-sm"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">通知设置</h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">邮件通知</p>
                          <p className="text-sm text-gray-500">接收重要更新和通知</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.email}
                          onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">推送通知</p>
                          <p className="text-sm text-gray-500">浏览器推送通知</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.push}
                          onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">产品更新</p>
                          <p className="text-sm text-gray-500">新功能和产品更新通知</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.updates}
                          onChange={(e) => setNotifications({ ...notifications, updates: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">安全提醒</p>
                          <p className="text-sm text-gray-500">账户安全相关通知</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.security}
                          onChange={(e) => setNotifications({ ...notifications, security: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100/50 p-6 backdrop-blur-sm"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">安全设置</h2>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">两步验证</h3>
                          <p className="text-sm text-gray-500 mt-1">增加额外的安全层保护您的账户</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={security.twoFactor}
                            onChange={(e) => setSecurity({ ...security, twoFactor: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                        </label>
                      </div>
                      {security.twoFactor && (
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-700">
                            两步验证已启用。您的账户现在受到额外保护。
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        会话超时时间
                      </label>
                      <select
                        value={security.sessionTimeout}
                        onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                        className="w-full px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all backdrop-blur-sm"
                      >
                        <option value="15">15 分钟</option>
                        <option value="30">30 分钟</option>
                        <option value="60">1 小时</option>
                        <option value="120">2 小时</option>
                      </select>
                    </div>

                    <div>
                      <button className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors">
                        更改密码
                      </button>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">安全提示</h3>
                          <p className="text-sm text-gray-600">
                            定期更换密码，使用强密码，并启用两步验证以确保账户安全。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'appearance' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100/50 p-6 backdrop-blur-sm"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">外观设置</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        主题模式
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setTheme('light')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === 'light'
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Sun className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-900">浅色模式</p>
                        </button>
                        <button
                          onClick={() => setTheme('dark')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === 'dark'
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Moon className="w-6 h-6 text-gray-700 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-900">深色模式</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'language' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100/50 p-6 backdrop-blur-sm"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">语言和地区</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        语言
                      </label>
                      <select className="w-full px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all backdrop-blur-sm">
                        <option>简体中文</option>
                        <option>English</option>
                        <option>日本語</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        时区
                      </label>
                      <select className="w-full px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all backdrop-blur-sm">
                        <option>UTC+8 北京时间</option>
                        <option>UTC+9 东京时间</option>
                        <option>UTC+0 伦敦时间</option>
                        <option>UTC-8 太平洋时间</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}