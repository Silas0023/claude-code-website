'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string, code: string) => Promise<void>;
  sendVerificationCode: (phone: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
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
    // Simulate API call for phone verification
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // In production, verify the code with backend
        if (phone && code === '123456') {
          const mockUser: User = {
            id: '1',
            email: `${phone}@phone.user`,
            name: phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phone}`
          };
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          resolve();
        } else {
          reject(new Error('验证码错误'));
        }
      }, 1000);
    });
  };

  const sendVerificationCode = async (phone: string) => {
    // Simulate sending verification code
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (phone && /^1[3-9]\d{9}$/.test(phone)) {
          // In production, this would trigger an SMS
          console.log('Verification code sent to:', phone);
          resolve();
        } else {
          reject(new Error('请输入有效的手机号'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const checkAuth = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithPhone, sendVerificationCode, logout, checkAuth }}>
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