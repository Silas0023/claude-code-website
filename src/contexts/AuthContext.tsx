'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService, UserInfo, UserStats } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  token?: string;
  userInfo?: UserInfo;
  userStats?: UserStats;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string, code: string) => Promise<void>;
  sendVerificationCode: (phone: string) => Promise<void>;
  refreshUserInfo: () => Promise<void>;
  refreshUserStats: () => Promise<void>;
  refreshAllUserData: () => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
  setServerUrl: (url: string) => void;
  getServerUrl: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage or session
    const checkStoredAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    checkStoredAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    // In production, this would be an actual API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser: User = {
            id: '1',
            email: email,
            name: email.split('@')[0],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
          };
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const loginWithPhone = async (phone: string, code: string) => {
    try {
      const response = await apiService.login(phone, code);

      if (response.code === 200 || response.code === 0) {
        const user: User = {
          id: response.data.userInfo.id.toString(),
          email: response.data.userInfo.phone,
          name: response.data.userInfo.nickname || phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
          avatar: response.data.userInfo.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${phone}`,
          phone: response.data.userInfo.phone,
          token: response.data.token,
          userInfo: response.data.userInfo
        };

        // 登录成功后，单独获取用户统计信息
        try {
          const userStatsResponse = await apiService.getUserStats(response.data.userInfo.id.toString());
          if (userStatsResponse.code === 200 || userStatsResponse.code === 0) {
            user.userStats = userStatsResponse.data;
          }
        } catch (statsError) {
          console.warn('获取用户统计信息失败:', statsError);
          // 不影响登录流程，继续执行
        }

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', response.data.token);
      } else {
        throw new Error(response.message || '登录失败');
      }
    } catch (error: any) {
      throw new Error(error.message || '网络错误，请重试');
    }
  };

  const sendVerificationCode = async (phone: string) => {
    try {
      const response = await apiService.sendVerificationCode(phone);

      if (response.code === 200 || response.code === 0) {
        // Success
        return;
      } else {
        throw new Error(response.message || '发送验证码失败');
      }
    } catch (error: any) {
      throw new Error(error.message || '网络错误，请重试');
    }
  };

  const refreshUserInfo = async () => {
    if (!user?.id) {
      throw new Error('用户未登录');
    }

    try {
      const userInfoResponse = await apiService.getUserInfo(user.id);
      if (userInfoResponse.code === 200 || userInfoResponse.code === 0) {
        const updatedUser = {
          ...user,
          userInfo: userInfoResponse.data,
          // 更新基本信息
          name: userInfoResponse.data.nickname || user.name,
          avatar: userInfoResponse.data.avatar || user.avatar,
          phone: userInfoResponse.data.phone || user.phone
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        throw new Error(userInfoResponse.message || '获取用户信息失败');
      }
    } catch (error: any) {
      throw new Error(error.message || '网络错误，请重试');
    }
  };

  const refreshUserStats = async () => {
    if (!user?.id) {
      throw new Error('用户未登录');
    }

    try {
      const userStatsResponse = await apiService.getUserStats(user.id);
      if (userStatsResponse.code === 200 || userStatsResponse.code === 0) {
        const updatedUser = { ...user, userStats: userStatsResponse.data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        throw new Error(userStatsResponse.message || '获取用户统计信息失败');
      }
    } catch (error: any) {
      throw new Error(error.message || '网络错误，请重试');
    }
  };

  const refreshAllUserData = async () => {
    if (!user?.id) {
      throw new Error('用户未登录');
    }

    try {
      // 并行获取用户信息和统计信息
      const [userInfoResponse, userStatsResponse] = await Promise.all([
        apiService.getUserInfo(user.id),
        apiService.getUserStats(user.id)
      ]);

      let updatedUser = { ...user };

      // 更新用户信息
      if (userInfoResponse.code === 200 || userInfoResponse.code === 0) {
        updatedUser = {
          ...updatedUser,
          userInfo: {
            ...userInfoResponse.data,
            planName: userInfoResponse.data.subscriptionConfig?.displayName || 'FREE'
          },
          name: userInfoResponse.data.nickname || user.name,
          avatar: userInfoResponse.data.avatar || user.avatar,
          phone: userInfoResponse.data.phone || user.phone
        };
      }

      // 更新用户统计信息
      if (userStatsResponse.code === 200 || userStatsResponse.code === 0) {
        updatedUser = {
          ...updatedUser,
          userStats: userStatsResponse.data
        };
      }

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error: any) {
      throw new Error(error.message || '网络错误，请重试');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const checkAuth = () => {
    return !!user;
  };

  const setServerUrl = (url: string) => {
    apiService.setBaseUrl(url);
  };

  const getServerUrl = () => {
    return apiService['baseUrl'] || 'http://127.0.0.1:8088';
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      loginWithPhone,
      sendVerificationCode,
      refreshUserInfo,
      refreshUserStats,
      refreshAllUserData,
      logout,
      checkAuth,
      setServerUrl,
      getServerUrl
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}