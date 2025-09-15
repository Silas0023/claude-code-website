'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Gift,
  Copy,
  Check,
  Share2,
  Mail,
  MessageSquare,
  Link2,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight
,
  Menu
} from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface InvitedFriend {
  id: string;
  name: string;
  avatar: string;
  joinDate: string;
  status: 'registered' | 'subscribed';
  earned: number;
}

export default function InvitePage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState<'code' | 'link' | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'rules'>('overview');

  const inviteCode = 'KPE8NN';
  const inviteLink = `https://www.aicodemirror.com/register?invitecode=${inviteCode}`;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleCopy = (text: string, type: 'code' | 'link') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const invitedFriends: InvitedFriend[] = [
    {
      id: '1',
      name: '张明',
      avatar: '👨‍💻',
      joinDate: '2024-01-20',
      status: 'subscribed',
      earned: 500
    },
    {
      id: '2',
      name: '李华',
      avatar: '👩‍💻',
      joinDate: '2024-01-18',
      status: 'registered',
      earned: 200
    },
    {
      id: '3',
      name: '王强',
      avatar: '🧑‍💻',
      joinDate: '2024-01-15',
      status: 'subscribed',
      earned: 500
    }
  ];

  const totalEarned = invitedFriends.reduce((sum, friend) => sum + friend.earned, 0);
  const totalInvited = invitedFriends.length;
  const subscribedCount = invitedFriends.filter(f => f.status === 'subscribed').length;

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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">邀请好友</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">邀请好友加入，共同获得丰厚奖励</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">分享邀请</span>
            </motion.button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 text-white mb-8 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-6 h-6" />
                <span className="text-lg font-semibold">限时活动</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">邀请好友，双方共赢！</h2>
              <p className="text-xl text-white/90 mb-6">
                成功邀请好友注册并订阅，您和好友都将获得 <span className="text-yellow-300 font-bold">500 积分</span> 奖励
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                  <div className="text-3xl font-bold">{totalInvited}</div>
                  <div className="text-sm text-white/80">已邀请好友</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                  <div className="text-3xl font-bold">{subscribedCount}</div>
                  <div className="text-sm text-white/80">成功订阅</div>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                  <div className="text-3xl font-bold">{totalEarned}</div>
                  <div className="text-sm text-white/80">累计获得积分</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'overview', label: '邀请概览', icon: <Sparkles className="w-4 h-4" /> },
              { id: 'history', label: '邀请记录', icon: <Users className="w-4 h-4" /> },
              { id: 'rules', label: '活动规则', icon: <Award className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-white text-orange-600 shadow-sm border border-gray-100'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Invite Methods */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">邀请方式</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">您的专属邀请码</label>
                    <div className="flex gap-2">
                      <input
                        readOnly
                        value={inviteCode}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-center font-mono text-lg font-bold text-gray-900"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(inviteCode, 'code')}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                      >
                        {copied === 'code' ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-gray-600" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">专属邀请链接</label>
                    <div className="flex gap-2">
                      <input
                        readOnly
                        value={inviteLink}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(inviteLink, 'link')}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                      >
                        {copied === 'link' ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Link2 className="w-5 h-5 text-gray-600" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-700 font-medium rounded-xl hover:bg-green-100 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                      微信分享
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition-colors">
                      <Mail className="w-5 h-5" />
                      邮件邀请
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Rewards Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">奖励进度</h3>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border border-orange-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">下一个里程碑</span>
                      <span className="text-sm text-orange-600 font-bold">5 位好友</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(totalInvited / 5) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-orange-400 to-pink-400"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">再邀请 {5 - totalInvited} 位好友即可获得额外 1000 积分</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🎯</span>
                        <div>
                          <p className="font-medium text-gray-900">首次邀请</p>
                          <p className="text-xs text-gray-500">邀请第一位好友</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-green-600">+200</span>
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🚀</span>
                        <div>
                          <p className="font-medium text-gray-900">团队领袖</p>
                          <p className="text-xs text-gray-500">邀请 10 位好友</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-400">+2000</span>
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">👑</span>
                        <div>
                          <p className="font-medium text-gray-900">超级推广者</p>
                          <p className="text-xs text-gray-500">邀请 50 位好友</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-400">+10000</span>
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">邀请记录</h3>
                <p className="text-sm text-gray-500 mt-1">查看您邀请的所有好友</p>
              </div>

              <div className="divide-y divide-gray-100">
                {invitedFriends.map(friend => (
                  <div key={friend.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center text-2xl">
                          {friend.avatar}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{friend.name}</h4>
                          <p className="text-sm text-gray-500">加入时间: {friend.joinDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                          friend.status === 'subscribed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {friend.status === 'subscribed' ? '已订阅' : '已注册'}
                        </div>
                        <p className="text-sm font-bold text-orange-600">+{friend.earned} 积分</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {invitedFriends.length === 0 && (
                <div className="p-12 text-center">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">还没有邀请记录</p>
                  <p className="text-sm text-gray-400 mt-1">开始邀请好友，获得丰厚奖励</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'rules' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">活动规则</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-orange-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">如何获得奖励</h4>
                    <p className="text-sm text-gray-600">
                      分享您的专属邀请码或链接给好友，好友通过您的邀请成功注册后，您将获得 200 积分；
                      好友首次订阅付费套餐后，您和好友都将额外获得 500 积分。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-orange-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">奖励发放</h4>
                    <p className="text-sm text-gray-600">
                      奖励积分将在满足条件后立即发放到您的账户，可在账户余额中查看。
                      积分可用于抵扣订阅费用或兑换其他权益。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-orange-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">里程碑奖励</h4>
                    <p className="text-sm text-gray-600">
                      邀请达到一定数量还有额外奖励：5人(+1000积分)、10人(+2000积分)、50人(+10000积分)。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-orange-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">注意事项</h4>
                    <p className="text-sm text-gray-600">
                      邀请必须通过官方渠道进行，恶意刷单将被取消奖励资格。
                      活动最终解释权归 Claude Code 所有。
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <p className="text-sm font-medium text-gray-900">
                    限时加倍：现在邀请好友，奖励积分翻倍！
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}