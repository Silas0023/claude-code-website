'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Palette, Volume2, Trash2, Music } from 'lucide-react';

// 定义不同的图案主题
const PATTERN_THEMES = [
  {
    name: '星空主题',
    chars: ['✦', '✧', '★', '☆', '✨', '⋆', '∘', '･'],
    colors: ['#FFD700', '#87CEEB', '#DDA0DD', '#F0E68C', '#B0E0E6'],
    scale: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'] // 和谐的C大调音阶
  },
  {
    name: '几何主题',
    chars: ['▲', '■', '●', '▼', '◆', '○', '□', '△'],
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F', '#BB8FCE'],
    scale: ['E4', 'F#4', 'G#4', 'B4', 'C#5', 'E5', 'F#5', 'G#5'] // E大调五声音阶
  },
  {
    name: '花园主题',
    chars: ['❀', '✿', '❁', '✾', '✽', '❃', '❉', '❊'],
    colors: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#98FB98', '#90EE90'],
    scale: ['F4', 'G4', 'A4', 'C5', 'D5', 'F5', 'G5', 'A5'] // F大调五声音阶
  },
  {
    name: '代码主题',
    chars: ['{', '}', '<', '>', '/', '*', '#', '@'],
    colors: ['#61DAFB', '#FF6B6B', '#FFC107', '#4CAF50', '#E91E63'],
    scale: ['G4', 'A4', 'B4', 'D5', 'E5', 'G5', 'A5', 'B5'] // G大调音阶
  },
  {
    name: '表情主题',
    chars: ['♥', '♠', '♦', '♣', '☺', '☻', '♫', '♪'],
    colors: ['#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB', '#FFE4E1'],
    scale: ['A4', 'C#5', 'E5', 'F#5', 'A5', 'C#6', 'E6', 'F#6'] // A大调和弦
  }
];

// 音频上下文和音符播放器
class SoundPlayer {
  private audioContext: AudioContext | null = null;
  private masterGainNode: GainNode | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGainNode = this.audioContext.createGain();
      this.masterGainNode.connect(this.audioContext.destination);
      this.masterGainNode.gain.value = 0.3;
    }
  }

  playNote(frequency: number, duration: number = 200) {
    if (!this.audioContext || !this.masterGainNode) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGainNode);

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);

    oscillator.start(now);
    oscillator.stop(now + duration / 1000);
  }

  noteToFrequency(note: string): number {
    const notes: { [key: string]: number } = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
      'C#4': 277.18, 'F#4': 369.99, 'G#4': 415.30,
      'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
      'C#5': 554.37, 'F#5': 739.99, 'G#5': 830.61,
      'C6': 1046.50, 'E6': 1318.51, 'F#6': 1479.98, 'C#6': 1108.73
    };
    return notes[note] || 440;
  }
}

interface Cell {
  char: string;
  color: string;
}

export default function ASCIIArtCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const soundPlayerRef = useRef<SoundPlayer | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [grid, setGrid] = useState<(Cell | null)[][]>(() => {
    const rows = 20;
    const cols = 40;
    return Array(rows).fill(null).map(() => Array(cols).fill(null));
  });

  useEffect(() => {
    soundPlayerRef.current = new SoundPlayer();
  }, []);

  const theme = PATTERN_THEMES[currentTheme];

  const getRandomChar = () => {
    return theme.chars[Math.floor(Math.random() * theme.chars.length)];
  };

  const getRandomColor = () => {
    return theme.colors[Math.floor(Math.random() * theme.colors.length)];
  };

  const playRandomNote = () => {
    if (!soundEnabled || !soundPlayerRef.current) return;
    const note = theme.scale[Math.floor(Math.random() * theme.scale.length)];
    const frequency = soundPlayerRef.current.noteToFrequency(note);
    soundPlayerRef.current.playNote(frequency);
  };

  const handleCellInteraction = (row: number, col: number) => {
    if (!isDrawing) return;

    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = {
        char: getRandomChar(),
        color: getRandomColor()
      };
      return newGrid;
    });

    playRandomNote();
  };

  const handleMouseDown = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    setIsDrawing(true);
    handleCellInteraction(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDrawing) {
      handleCellInteraction(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent, row: number, col: number) => {
    e.preventDefault();
    setIsDrawing(true);
    handleCellInteraction(row, col);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing) return;
    
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains('ascii-cell')) {
      const row = parseInt(element.getAttribute('data-row') || '0');
      const col = parseInt(element.getAttribute('data-col') || '0');
      handleCellInteraction(row, col);
    }
  };

  const clearCanvas = () => {
    setGrid(Array(20).fill(null).map(() => Array(40).fill(null)));
  };

  const switchTheme = () => {
    setCurrentTheme((prev) => (prev + 1) % PATTERN_THEMES.length);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto p-6 bg-gray-900 rounded-xl shadow-2xl"
    >
      {/* 标题 */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          音乐 ASCII 艺术画板
        </h2>
        <p className="text-gray-400">点击并拖动来创建艺术，每个字符都会演奏音符！</p>
      </div>

      {/* 控制按钮 */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        <button
          onClick={switchTheme}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Palette className="w-4 h-4" />
          切换主题: {theme.name}
        </button>
        
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
            soundEnabled 
              ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' 
              : 'bg-gray-700 text-gray-400'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
          音效: {soundEnabled ? '开启' : '关闭'}
        </button>
        
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Trash2 className="w-4 h-4" />
          清空画布
        </button>
      </div>

      {/* 字符预览 */}
      <div className="mb-4 p-3 bg-gray-800 rounded-lg">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="text-gray-400 text-sm">当前字符集:</span>
          {theme.chars.map((char, index) => (
            <span
              key={index}
              className="text-2xl font-mono"
              style={{ color: theme.colors[index % theme.colors.length] }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* ASCII 画布 */}
      <div 
        ref={canvasRef}
        className="bg-black rounded-lg p-4 select-none cursor-crosshair overflow-auto"
        onTouchMove={handleTouchMove}
      >
        <div className="inline-block">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  data-row={rowIndex}
                  data-col={colIndex}
                  className="ascii-cell w-5 h-5 flex items-center justify-center text-lg font-mono hover:bg-gray-800 transition-colors"
                  onMouseDown={(e) => handleMouseDown(e, rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  onTouchStart={(e) => handleTouchStart(e, rowIndex, colIndex)}
                  style={{ 
                    color: cell?.color || 'transparent',
                    textShadow: cell ? '0 0 10px currentColor' : 'none'
                  }}
                >
                  {cell?.char || '·'}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 提示信息 */}
      <div className="mt-4 text-center text-gray-500 text-sm">
        <p>支持鼠标和触摸输入 • 每个主题都有独特的音阶</p>
      </div>
    </motion.div>
  );
}