'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Check,
  AlertCircle,
  Key,
  Calendar,
  Activity
,
  Menu
} from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  usage: number;
  status: 'active' | 'inactive';
}

export default function ApiKeysPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: '生产环境密钥',
      key: 'sk-proj-...7fKd',
      created: '2024-01-15',
      lastUsed: '2 小时前',
      usage: 15234,
      status: 'active'
    },
    {
      id: '2',
      name: '开发测试密钥',
      key: 'sk-test-...9mNx',
      created: '2024-01-20',
      lastUsed: '5 天前',
      usage: 3421,
      status: 'active'
    }
  ]);

  const [showKey, setShowKey] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleStatus = (id: string) => {
    setApiKeys(prev => prev.map(key =>
      key.id === id
        ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
        : key
    ));
  };

  const handleDelete = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk-${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: '从未',
      usage: 0,
      status: 'active'
    };

    setApiKeys(prev => [...prev, newKey]);
    setNewKeyName('');
    setShowCreateModal(false);
  };

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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">API 密钥管理</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">管理您的 API 访问密钥</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="hidden sm:flex px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">创建新密钥</span>
            </motion.button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Key className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">总密钥数</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{apiKeys.length}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {apiKeys.filter(k => k.status === 'active').length} 个活跃
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">本月调用</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">18,655</h3>
              <p className="text-sm text-green-600 mt-1">+12.5% 较上月</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm text-gray-500">安全等级</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">高</h3>
              <p className="text-sm text-gray-500 mt-1">所有密钥已加密</p>
            </motion.div>
          </div>

          {/* API Keys List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">您的 API 密钥</h2>
              <p className="text-sm text-gray-500 mt-1">请妥善保管您的密钥，不要分享给他人</p>
            </div>

            <div className="divide-y divide-gray-100">
              {apiKeys.map((apiKey) => (
                <motion.div
                  key={apiKey.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{apiKey.name}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          apiKey.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {apiKey.status === 'active' ? '活跃' : '已禁用'}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <code className="font-mono text-sm bg-gray-100 px-3 py-1 rounded">
                            {showKey === apiKey.id ? apiKey.key : '••••••••••••••••'}
                          </code>
                          <button
                            onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {showKey === apiKey.id ? (
                              <EyeOff className="w-4 h-4 text-gray-500" />
                            ) : (
                              <Eye className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                          <button
                            onClick={() => handleCopy(apiKey.key, apiKey.id)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            {copiedId === apiKey.id ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          创建于 {apiKey.created}
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5" />
                          最后使用 {apiKey.lastUsed}
                        </span>
                        <span>调用次数: {apiKey.usage.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(apiKey.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          apiKey.status === 'active'
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {apiKey.status === 'active' ? '禁用' : '启用'}
                      </button>
                      <button
                        onClick={() => handleDelete(apiKey.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-orange-50 rounded-2xl border border-orange-100"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">安全提示</h3>
                <p className="text-sm text-gray-600">
                  请勿在客户端代码中直接使用 API 密钥。建议通过后端服务器进行 API 调用，以保护您的密钥安全。
                  定期更换密钥，并及时删除不再使用的密钥。
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Create Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">创建新的 API 密钥</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密钥名称
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                placeholder="例如：生产环境密钥"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateKey}
                className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                创建
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}