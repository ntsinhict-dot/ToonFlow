import React, { useState } from 'react';
import { Sparkles, Zap, Key, Eye, EyeOff } from 'lucide-react';

interface HeaderProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

const Header: React.FC<HeaderProps> = ({ apiKey, onApiKeyChange }) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <header className="w-full bg-slate-900/50 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Zap className="w-8 h-8 text-cyan-400 fill-cyan-400/20" />
            <Sparkles className="w-4 h-4 text-pink-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500">
                ToonFlow
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
              Sáng tạo truyện tranh đa phong cách
            </p>
          </div>
        </div>

        {/* API Key Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="h-4 w-4 text-slate-500" />
            </div>
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="Nhập Gemini API Key..."
              className="block w-full pl-10 pr-10 py-2 bg-slate-950/50 border border-white/10 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-cyan-400 transition-colors"
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          
          <div className="hidden lg:block text-xs font-mono text-cyan-300/80 bg-slate-950/50 px-4 py-2 rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            Tác giả: Thầy Sinh AI <span className="text-slate-500">|</span> 0968 194 228
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
