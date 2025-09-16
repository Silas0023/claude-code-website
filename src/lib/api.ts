export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
  timestamp: number;
}

export interface UserInfo {
  apiKey: string;
  avatar: string;
  id: number;
  isSubscribed: number;
  nickname: string;
  phone: string;
  status: number;
  subscribeEndTime: string;
  subscribeStartTime: string;
  subscribeType: string;
}

export interface UserStats {
  accounts: {
    claudeAccountId: string;
    geminiAccountId: string;
  };
  activatedAt: string;
  activationDays: number;
  createdAt: string;
  description: string;
  expirationMode: string;
  expiresAt: string;
  id: string;
  isActivated: boolean;
  isActive: boolean;
  limits: {
    concurrencyLimit: number;
    currentDailyCost: number;
    currentWindowCost: number;
    currentWindowRequests: number;
    currentWindowTokens: number;
    dailyCostLimit: number;
    rateLimitCost: number;
    rateLimitRequests: number;
    rateLimitWindow: number;
    tokenLimit: number;
    windowEndTime: string;
    windowRemainingSeconds: string;
    windowStartTime: string;
  };
  name: string;
  permissions: string;
  restrictions: {
    allowedClients: string[];
    enableClientRestriction: boolean;
    enableModelRestriction: boolean;
    restrictedModels: string[];
  };
  usage: {
    total: {
      allTokens: number;
      cacheCreateTokens: number;
      cacheReadTokens: number;
      cost: number;
      formattedCost: string;
      inputTokens: number;
      outputTokens: number;
      requests: number;
      tokens: number;
    };
  };
}

export interface LoginResponse {
  token: string;
  userInfo: UserInfo;
  userStats: UserStats;
}

export interface SubscriptionPlan {
  allowedClients: string;
  concurrencyLimit: number;
  dailyCostLimit: number;
  description: string;
  enableClientRestriction: boolean;
  enableModelRestriction: boolean;
  monthlyPrice: number;
  permissions: string;
  rateLimitRequests: number;
  rateLimitWindow: number;
  restrictedModels: string;
  subscriptionType: string;
  tokenLimit: number;
  weeklyOpusCostLimit: number;
}

export interface ModelUsageStats {
  model: string;
  requests: number;
  inputTokens: number;
  outputTokens: number;
  cacheCreateTokens: number;
  cacheReadTokens: number;
  allTokens: number;
  costs: {
    input: number;
    output: number;
    cacheWrite: number;
    cacheRead: number;
    total: number;
  };
  formatted: {
    input: string;
    output: string;
    cacheWrite: string;
    cacheRead: string;
    total: string;
  };
  pricing: {
    input: number;
    output: number;
    cacheWrite: number;
    cacheRead: number;
  };
}

export interface ModelStatsResponse {
  success: boolean;
  data: ModelUsageStats[];
  period: 'daily' | 'monthly';
}

export interface ModelStatsApiResponse {
  code: number;
  message: string;
  data: ModelStatsResponse;
  timestamp: number;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = this.getBaseUrl();
  }

  private getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('api_base_url') || 'http://192.168.110.193:8088';
    }
    return 'http://192.168.110.193:8088';
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
    if (typeof window !== 'undefined') {
      localStorage.setItem('api_base_url', url);
    }
  }

  private getClientIp(): string {
    // In a real application, you might want to get the actual client IP
    // For now, return a default value
    return '127.0.0.1';
  }

  async sendVerificationCode(phone: string): Promise<ApiResponse<string>> {
    const response = await fetch(`${this.baseUrl}/api/claudeApi/sendCode?phone=${phone}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async login(phone: string, code: string): Promise<ApiResponse<LoginResponse>> {
    const response = await fetch(`${this.baseUrl}/api/claudeApi/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        code,
        loginIp: this.getClientIp(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getSubscriptionPlans(): Promise<ApiResponse<SubscriptionPlan[]>> {
    const response = await fetch(`${this.baseUrl}/api/claudeApi/subscriptionPlans`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getUserModelStats(apiId: string, period: 'daily' | 'monthly' = 'monthly'): Promise<ModelStatsApiResponse> {
    const response = await fetch(`${this.baseUrl}/api/claudeApi/userModelStats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiId,
        period,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const apiService = new ApiService();