'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CODE_SNIPPETS = [
  {
    filename: 'app.py',
    language: 'python',
    code: `# AI智能代码生成示例
import tensorflow as tf
from transformers import GPT2Model
import numpy as np

class AICodeGenerator:
    def __init__(self):
        self.model = GPT2Model.from_pretrained('gpt2')
        self.optimizer = tf.keras.optimizers.Adam()
        
    def generate_code(self, prompt):
        """根据提示生成优化的代码"""
        tokens = self.tokenize(prompt)
        predictions = self.model(tokens)
        
        # AI优化建议
        optimized_code = self.apply_optimizations(predictions)
        return optimized_code
        
    def analyze_complexity(self, code):
        """分析代码复杂度并提供改进建议"""
        metrics = {
            'cyclomatic_complexity': self.calculate_complexity(code),
            'performance_score': self.evaluate_performance(code),
            'readability_index': self.assess_readability(code)
        }
        return self.generate_report(metrics)`
  },
  {
    filename: 'optimize.js',
    language: 'javascript',
    code: `// 实时代码优化引擎
class CodeOptimizer {
  constructor() {
    this.cache = new Map();
    this.metrics = new PerformanceObserver();
  }
  
  async optimizeFunction(fn) {
    // AI 分析函数性能
    const profile = await this.profileExecution(fn);
    
    // 智能缓存策略
    if (profile.isPure) {
      return this.memoize(fn);
    }
    
    // 并行化处理
    if (profile.canParallelize) {
      return this.parallelizeExecution(fn);
    }
    
    // 代码分割建议
    const chunks = this.suggestCodeSplitting(fn);
    return this.applyOptimizations(fn, chunks);
  }
  
  memoize(fn) {
    return (...args) => {
      const key = JSON.stringify(args);
      if (!this.cache.has(key)) {
        this.cache.set(key, fn(...args));
      }
      return this.cache.get(key);
    };
  }
}`
  },
  {
    filename: 'refactor.ts',
    language: 'typescript',
    code: `// TypeScript 智能重构工具
interface RefactorOptions {
  targetComplexity: number;
  preserveTypes: boolean;
  enableAI: boolean;
}

class SmartRefactor {
  private aiEngine: AIEngine;
  private codeAnalyzer: CodeAnalyzer;
  
  constructor() {
    this.aiEngine = new AIEngine();
    this.codeAnalyzer = new CodeAnalyzer();
  }
  
  async refactorCode(
    code: string, 
    options: RefactorOptions
  ): Promise<RefactoredCode> {
    // 深度代码分析
    const analysis = await this.codeAnalyzer.analyze(code);
    
    // AI 生成重构建议
    const suggestions = await this.aiEngine.generateSuggestions(
      analysis,
      options
    );
    
    // 应用重构
    const refactored = this.applyRefactoring(code, suggestions);
    
    // 验证重构结果
    await this.validateRefactoring(code, refactored);
    
    return {
      code: refactored,
      improvements: suggestions.metrics,
      testsPassed: true
    };
  }
}`
  }
];

export default function HeroCodeEditor() {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const snippet = CODE_SNIPPETS[currentSnippet];
    const lines = snippet.code.split('\n');
    
    if (currentLine < lines.length && isTyping) {
      const line = lines[currentLine];
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (charIndex <= line.length) {
          const allPreviousLines = lines.slice(0, currentLine).join('\n');
          const currentTypedLine = line.slice(0, charIndex);
          const newCode = currentLine === 0 
            ? currentTypedLine 
            : allPreviousLines + '\n' + currentTypedLine;
          
          setDisplayedCode(newCode);
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setCurrentLine(prev => prev + 1);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    } else if (currentLine >= lines.length) {
      // Finished typing current snippet
      setTimeout(() => {
        setCurrentSnippet((prev) => (prev + 1) % CODE_SNIPPETS.length);
        setCurrentLine(0);
        setDisplayedCode('');
      }, 2000);
    }
  }, [currentLine, currentSnippet, isTyping]);

  const renderCodeWithHighlight = (code: string) => {
    const lines = code.split('\n');
    return lines.map((line, index) => {
      const lineNumber = String(index + 1).padStart(2, ' ');
      
      // Simple syntax highlighting
      let highlightedLine = line
        .replace(/(\b(import|from|class|def|function|const|let|var|async|await|return|if|else|for|while|interface|type|export|default)\b)/g, '<span class="text-blue-400">$1</span>')
        .replace(/(\b(self|this|true|false|null|undefined|None|True|False)\b)/g, '<span class="text-orange-400">$1</span>')
        .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-green-400">$&</span>')
        .replace(/(\/\/.*$|#.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="text-gray-500">$&</span>')
        .replace(/(\b\d+\b)/g, '<span class="text-purple-400">$1</span>');
      
      return (
        <div key={index} className="flex">
          <span className="text-gray-600 select-none pr-4 text-right w-8">{lineNumber}</span>
          <span dangerouslySetInnerHTML={{ __html: highlightedLine || '&nbsp;' }} />
        </div>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl border border-gray-800"
    >
      {/* Editor Header */}
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#ff5f56] rounded-full"></div>
          <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
          <div className="w-3 h-3 bg-[#27c93f] rounded-full"></div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400 text-sm font-mono">
            {CODE_SNIPPETS[currentSnippet].filename}
          </span>
        </div>
      </div>

      {/* Editor Tabs */}
      <div className="bg-[#252526] px-4 py-1 flex items-center space-x-1 border-b border-gray-700">
        {CODE_SNIPPETS.map((snippet, index) => (
          <div
            key={index}
            className={`px-3 py-1 text-sm cursor-pointer transition-colors ${
              index === currentSnippet
                ? 'bg-[#1e1e1e] text-white border-t-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => {
              setCurrentSnippet(index);
              setCurrentLine(0);
              setDisplayedCode('');
            }}
          >
            {snippet.filename}
          </div>
        ))}
      </div>

      {/* Code Area */}
      <div className="p-4 font-mono text-sm leading-relaxed overflow-auto h-[400px]">
        <div className="text-gray-300">
          {renderCodeWithHighlight(displayedCode)}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-orange-400 ml-1"
            />
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#007acc] px-4 py-1 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-4">
          <span className="text-white">AI 代码生成中...</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white">实时优化</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-white">
          <span>{CODE_SNIPPETS[currentSnippet].language}</span>
          <span>UTF-8</span>
          <span>Ln {currentLine + 1}, Col {displayedCode.split('\n').pop()?.length || 0}</span>
        </div>
      </div>
    </motion.div>
  );
}