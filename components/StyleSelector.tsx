import React, { useState } from 'react';
import { Palette, CheckCircle2 } from 'lucide-react';
import { STYLE_CATEGORIES } from '../constants';
import { StyleOption } from '../types';

interface StyleSelectorProps {
  selectedStyle: StyleOption | null;
  onSelect: (style: StyleOption) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect }) => {
  const [activeTab, setActiveTab] = useState(STYLE_CATEGORIES[0].name);

  return (
    <div className="w-full mb-12 animate-fade-in-up">
      <div className="flex items-center space-x-2 mb-6">
        <Palette className="w-6 h-6 text-pink-500" />
        <h2 className="text-2xl font-bold text-slate-200">Gợi ý Chủ đề & Phong cách</h2>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {STYLE_CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveTab(cat.name)}
            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === cat.name
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Style Chips Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {STYLE_CATEGORIES.find(c => c.name === activeTab)?.styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style)}
            className={`relative group p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              selectedStyle?.id === style.id
                ? 'border-cyan-400 bg-cyan-900/20 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                : 'border-slate-800 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            {/* Selection Indicator */}
            {selectedStyle?.id === style.id && (
              <div className="absolute -top-2 -right-2 bg-cyan-400 text-slate-900 rounded-full p-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
            
            <div className="flex flex-col h-full justify-between space-y-2">
              <span className={`font-bold text-sm ${
                selectedStyle?.id === style.id ? 'text-cyan-300' : 'text-slate-300'
              }`}>
                {style.name}
              </span>
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                {style.category}
              </span>
            </div>
            
            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
