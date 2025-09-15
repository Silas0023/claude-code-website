'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ASCII_ART = [
  "███████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗",
  "██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝",
  "██║     ██║     ███████║██║   ██║██║  ██║█████╗  ",
  "██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝  ",
  "╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗",
  " ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝",
  "",
  "███████╗ ██████╗ ██████╗ ███████╗",
  "██╔════╝██╔═══██╗██╔══██╗██╔════╝",
  "██║     ██║   ██║██║  ██║█████╗  ",
  "██║     ██║   ██║██║  ██║██╔══╝  ",
  "╚██████╗╚██████╔╝██████╔╝███████╗",
  " ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝"
];

const COMMANDS = [
  { text: "$ claude-code init", delay: 100 },
  { text: "正在初始化 Claude Code...", delay: 500, isOutput: true },
  { text: "✓ 项目结构已创建", delay: 200, isOutput: true },
  { text: "✓ AI 模型已加载", delay: 300, isOutput: true },
  { text: "✓ 代码分析引擎已就绪", delay: 400, isOutput: true },
  { text: "", delay: 300 },
  { text: "$ claude-code analyze --optimize", delay: 100 },
  { text: "正在分析代码库...", delay: 600, isOutput: true },
  { text: "发现 15 个优化建议", delay: 400, isOutput: true },
  { text: "• 使用更高效的算法 (性能提升 45%)", delay: 200, isOutput: true },
  { text: "• 移除未使用的依赖 (减少包体积 23%)", delay: 200, isOutput: true },
  { text: "• 实施代码分割策略 (首屏加载时间减少 38%)", delay: 200, isOutput: true },
  { text: "", delay: 300 },
  { text: "$ claude-code generate component UserDashboard", delay: 100 },
  { text: "生成中...", delay: 500, isOutput: true },
  { text: "✓ UserDashboard.tsx 已创建", delay: 300, isOutput: true },
  { text: "✓ UserDashboard.test.tsx 已创建", delay: 200, isOutput: true },
  { text: "✓ UserDashboard.module.css 已创建", delay: 200, isOutput: true },
  { text: "✓ 类型定义已更新", delay: 200, isOutput: true },
  { text: "", delay: 300 },
  { text: "$ claude-code refactor --smart", delay: 100 },
  { text: "AI 智能重构中...", delay: 800, isOutput: true },
  { text: "✓ 函数复杂度降低 62%", delay: 400, isOutput: true },
  { text: "✓ 代码可读性提升至 A+ 级", delay: 300, isOutput: true },
  { text: "✓ 测试覆盖率达到 98%", delay: 300, isOutput: true },
  { text: "✓ 所有更改已自动提交", delay: 200, isOutput: true },
];

export default function ClaudeCodeTerminal() {
  const [displayedArt, setDisplayedArt] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [commandIndex, setCommandIndex] = useState(0);
  const [currentCommand, setCurrentCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingCommand, setIsTypingCommand] = useState(false);
  const [commandHistory, setCommandHistory] = useState<Array<{text: string, isOutput?: boolean}>>([]);

  // ASCII Art animation
  useEffect(() => {
    if (currentLine < ASCII_ART.length) {
      const timer = setTimeout(() => {
        setDisplayedArt(prev => [...prev, ASCII_ART[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // Start command animation after ASCII art
      setTimeout(() => {
        setCommandIndex(0);
        setIsTypingCommand(true);
      }, 500);
    }
  }, [currentLine]);

  // Command typing animation
  useEffect(() => {
    if (!isTypingCommand || commandIndex >= COMMANDS.length) return;

    const command = COMMANDS[commandIndex];
    
    if (command.isOutput) {
      // Display output immediately
      setTimeout(() => {
        setCommandHistory(prev => [...prev, { text: command.text, isOutput: true }]);
        setCommandIndex(prev => prev + 1);
      }, command.delay);
    } else if (command.text === "") {
      // Empty line
      setTimeout(() => {
        setCommandHistory(prev => [...prev, { text: "" }]);
        setCommandIndex(prev => prev + 1);
      }, command.delay);
    } else {
      // Type command character by character
      let charIndex = 0;
      setCurrentCommand('');
      
      const typeInterval = setInterval(() => {
        if (charIndex < command.text.length) {
          setCurrentCommand(command.text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCommandHistory(prev => [...prev, { text: command.text }]);
            setCurrentCommand('');
            setCommandIndex(prev => prev + 1);
          }, command.delay);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }
  }, [commandIndex, isTypingCommand]);

  // Restart animation when it completes
  useEffect(() => {
    if (commandIndex >= COMMANDS.length) {
      setTimeout(() => {
        setDisplayedArt([]);
        setCurrentLine(0);
        setCommandIndex(0);
        setCommandHistory([]);
        setCurrentCommand('');
        setIsTypingCommand(false);
      }, 3000);
    }
  }, [commandIndex]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-gray-800"
      >
        {/* Terminal Header */}
        <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#ff5f56] rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
            <div className="w-3 h-3 bg-[#27c93f] rounded-full"></div>
          </div>
          <div className="text-gray-400 text-sm font-mono">claude-code@terminal</div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 font-mono text-sm leading-relaxed min-h-[500px] max-h-[600px] overflow-y-auto">
          {/* ASCII Art */}
          <div className="text-[#ff8c42] mb-6">
            {displayedArt.map((line, index) => (
              <div key={index} className="whitespace-pre">
                {line}
              </div>
            ))}
          </div>

          {/* Commands */}
          <div className="text-gray-300">
            {commandHistory.map((cmd, index) => (
              <div 
                key={index} 
                className={`${cmd.isOutput ? 'text-green-400 ml-4' : 'text-gray-300'} ${cmd.text === '' ? 'h-4' : ''}`}
              >
                {cmd.text}
              </div>
            ))}
            
            {/* Current typing command */}
            {currentCommand && (
              <div className="text-gray-300">
                {currentCommand}
                {showCursor && <span className="text-[#ff8c42]">█</span>}
              </div>
            )}
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="bg-[#2d2d2d] px-4 py-3 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-xs">智能代码生成平台</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-xs">AI 引擎运行中</span>
              </div>
            </div>
            <span className="text-gray-500 text-xs font-mono">v2.0.1</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}