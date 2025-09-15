'use client';

import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

const codeExamples = [
  {
    language: 'python',
    code: `# AI智能代码生成示例
def analyze_data(dataset):
    """使用AI分析数据集并生成洞察"""
    import pandas as pd
    import numpy as np
    
    # 数据预处理
    df = pd.DataFrame(dataset)
    df = df.dropna()
    
    # AI模型预测
    predictions = model.predict(df)
    
    # 生成可视化报告
    insights = {
        'mean': df.mean(),
        'correlation': df.corr(),
        'predictions': predictions
    }
    
    return insights`,
  },
  {
    language: 'javascript',
    code: `// AI代码智能补全示例
async function fetchUserData(userId) {
  try {
    // AI自动生成API调用
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    
    // AI智能错误处理
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    // AI优化的数据转换
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      createdAt: new Date(data.created_at)
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}`,
  },
  {
    language: 'typescript',
    code: `// AI类型推断和接口生成
interface AIGeneratedSchema {
  id: string;
  timestamp: Date;
  metrics: {
    accuracy: number;
    performance: number;
    efficiency: number;
  };
  metadata?: Record<string, unknown>;
}

class AICodeAnalyzer {
  private cache = new Map<string, AIGeneratedSchema>();
  
  async analyzeCode(code: string): Promise<AIGeneratedSchema> {
    // AI代码分析逻辑
    const analysis = await this.performAnalysis(code);
    
    // 智能缓存策略
    this.cache.set(code, analysis);
    
    return analysis;
  }
  
  private async performAnalysis(code: string) {
    // AI深度代码分析
    return {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      metrics: {
        accuracy: 0.95,
        performance: 0.88,
        efficiency: 0.92
      }
    };
  }
}`,
  },
];

import ClaudeCodeTerminal from './ClaudeCodeTerminal';

export default function InteractiveCodeEditor() {
  const [currentExample, setCurrentExample] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [showUserEditor, setShowUserEditor] = useState(false);

  useEffect(() => {
    const typeCode = async () => {
      setIsTyping(true);
      const code = codeExamples[currentExample].code;
      setDisplayedCode('');
      
      for (let i = 0; i <= code.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20));
        setDisplayedCode(code.slice(0, i));
      }
      
      setIsTyping(false);
    };
    
    typeCode();
  }, [currentExample]);

  const handleNextExample = () => {
    setCurrentExample((prev) => (prev + 1) % codeExamples.length);
  };

  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: '#1a1a1a',
      padding: '1.5rem',
      fontSize: '14px',
      fontFamily: 'SF Mono, Monaco, Inconsolata, "Fira Code", "Courier New", monospace',
    },
  };

  return (
    <div className="w-full px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        {/* Claude Code Terminal */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              交互式代码编辑器
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              实时预览，智能提示，让编码更轻松
            </p>
          </div>
          <ClaudeCodeTerminal />
        </div>

        {/* Original Code Editor */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              代码示例展示
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">多语言支持，实时语法高亮</p>
          </div>

        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">
                {codeExamples[currentExample].language}
              </span>
              <button
                onClick={handleNextExample}
                disabled={isTyping}
                className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded transition-colors disabled:opacity-50"
              >
                下一个示例
              </button>
              <button
                onClick={() => setShowUserEditor(!showUserEditor)}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
              >
                {showUserEditor ? '查看示例' : '试用编辑器'}
              </button>
            </div>
          </div>

          <div className="relative">
            {!showUserEditor ? (
              <div className="min-h-[400px] max-h-[600px] overflow-y-auto">
                <SyntaxHighlighter
                  language={codeExamples[currentExample].language}
                  style={customStyle}
                  showLineNumbers
                  customStyle={{
                    margin: 0,
                    background: '#1a1a1a',
                  }}
                >
                  {displayedCode}
                </SyntaxHighlighter>
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute bottom-4 right-4 text-orange-400 text-2xl"
                  >
                    |
                  </motion.span>
                )}
              </div>
            ) : (
              <div className="min-h-[400px]">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder="在这里输入您的代码，体验AI智能补全..."
                  className="w-full h-[400px] bg-gray-900 text-gray-300 p-4 font-mono text-sm focus:outline-none resize-none"
                  style={{ fontFamily: 'SF Mono, Monaco, Inconsolata, monospace' }}
                />
              </div>
            )}
          </div>

          <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">AI智能提示:</span>
                <span className="text-orange-400 text-sm">
                  {isTyping ? '正在生成代码...' : '代码生成完成'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm">AI引擎运行中</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <h3 className="text-orange-400 font-semibold mb-2">智能补全</h3>
            <p className="text-gray-400 text-sm">AI自动理解上下文，智能生成代码片段</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <h3 className="text-orange-400 font-semibold mb-2">实时预览</h3>
            <p className="text-gray-400 text-sm">代码实时高亮，语法错误即时提示</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <h3 className="text-orange-400 font-semibold mb-2">多语言支持</h3>
            <p className="text-gray-400 text-sm">支持Python、JavaScript、TypeScript等主流语言</p>
          </motion.div>
        </div>
        </div>
      </motion.div>
    </div>
  );
}