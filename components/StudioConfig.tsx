import React, { useRef } from 'react';
import { Settings2, Layers, Monitor, Smartphone, BookOpen, FileType, User, Ban, Wand2, Lightbulb, ImagePlus, X } from 'lucide-react';
import { StudioConfig, AspectRatio, MangaRule, ReadingDirection } from '../types';

interface StudioConfigProps {
  config: StudioConfig;
  onChange: (newConfig: StudioConfig) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const StudioConfigPanel: React.FC<StudioConfigProps> = ({ config, onChange, onGenerate, isGenerating }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateConfig = (key: keyof StudioConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateConfig('referenceImage', e.target.files[0]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
      
      {/* CARD 1: QUANTITY & PAGES */}
      <div className="bg-slate-800/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col space-y-6 hover:border-cyan-500/30 transition-colors duration-300">
        <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-200">Cấu hình Số lượng</h3>
        </div>

        {/* Episode Count Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Số lượng Tập</span>
            <span className="text-cyan-400 font-bold font-mono text-lg">{config.episodeCount}</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={config.episodeCount}
            onChange={(e) => updateConfig('episodeCount', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Pages Selection */}
        <div className="space-y-3">
          <span className="text-sm text-slate-400">Số Trang mỗi tập</span>
          <div className="grid grid-cols-4 gap-2">
            {[1, 4, 6, 8].map((num) => (
              <button
                key={num}
                onClick={() => updateConfig('pagesPerEpisode', num)}
                className={`py-2 rounded-lg text-sm font-bold transition-all ${
                  config.pagesPerEpisode === num 
                    ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/20' 
                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        
        {/* Reference Image Input */}
        <div className="space-y-2 pt-2 border-t border-white/5">
           <label className="text-sm text-slate-400 flex items-center gap-2">
             <ImagePlus className="w-4 h-4 text-pink-500" /> Ảnh tham khảo (Character/Style)
           </label>
           
           {!config.referenceImage ? (
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="w-full py-3 border border-dashed border-slate-600 rounded-lg bg-slate-900/50 text-slate-500 hover:text-cyan-400 hover:border-cyan-500 hover:bg-slate-900 transition-all text-xs font-bold uppercase tracking-wide"
             >
               + Tải ảnh lên
             </button>
           ) : (
             <div className="relative group w-full p-2 bg-slate-900 rounded-lg border border-cyan-500/30 flex items-center justify-between">
                <span className="text-xs text-cyan-300 truncate max-w-[80%] pl-2">{config.referenceImage.name}</span>
                <button 
                  onClick={() => updateConfig('referenceImage', null)}
                  className="p-1 hover:bg-red-500/20 rounded text-slate-400 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
             </div>
           )}
           <input 
             type="file" 
             ref={fileInputRef} 
             onChange={handleImageUpload} 
             accept="image/*" 
             className="hidden" 
           />
        </div>

      </div>

      {/* CARD 2: FORMAT & RATIO */}
      <div className="bg-slate-800/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col space-y-6 hover:border-pink-500/30 transition-colors duration-300">
        <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
          <Settings2 className="w-5 h-5 text-pink-500" />
          <h3 className="font-bold text-slate-200">Tỷ lệ & Bố cục</h3>
        </div>

        {/* Aspect Ratio */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateConfig('aspectRatio', AspectRatio.MOBILE_9_16)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
              config.aspectRatio === AspectRatio.MOBILE_9_16
                ? 'border-pink-500 bg-pink-500/10 text-pink-400'
                : 'border-slate-700 bg-slate-800/30 text-slate-500 hover:border-slate-600'
            }`}
          >
            <Smartphone className="w-6 h-6 mb-2" />
            <span className="text-xs font-bold">9:16 Mobile</span>
          </button>
          <button
            onClick={() => updateConfig('aspectRatio', AspectRatio.PC_16_9)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
              config.aspectRatio === AspectRatio.PC_16_9
                ? 'border-pink-500 bg-pink-500/10 text-pink-400'
                : 'border-slate-700 bg-slate-800/30 text-slate-500 hover:border-slate-600'
            }`}
          >
            <Monitor className="w-6 h-6 mb-2" />
            <span className="text-xs font-bold">16:9 Desktop</span>
          </button>
        </div>

        {/* Dropdowns */}
        <div className="space-y-3">
           <div className="relative">
             <BookOpen className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
             <select 
                value={config.mangaRule}
                onChange={(e) => updateConfig('mangaRule', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-300 focus:border-pink-500 outline-none"
             >
                {Object.values(MangaRule).map(r => <option key={r} value={r}>{r}</option>)}
             </select>
           </div>
           
           <div className="relative">
             <FileType className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
             <select 
                value={config.readingDirection}
                onChange={(e) => updateConfig('readingDirection', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-300 focus:border-pink-500 outline-none"
             >
                {Object.values(ReadingDirection).map(r => <option key={r} value={r}>{r}</option>)}
             </select>
           </div>
        </div>
      </div>

      {/* CARD 3: META & ACTION */}
      <div className="bg-slate-800/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col space-y-4 hover:border-cyan-500/30 transition-colors duration-300">
        <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
          <User className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-200">Thông tin tác phẩm</h3>
        </div>

        {/* Author */}
        <div className="space-y-1">
          <label className="text-xs text-slate-500 uppercase font-bold">Chữ ký người mới</label>
          <input 
            type="text" 
            value={config.authorName}
            onChange={(e) => updateConfig('authorName', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-cyan-300 focus:ring-1 focus:ring-cyan-400 outline-none"
          />
        </div>

        {/* Negative Prompt */}
        <div className="space-y-1">
           <label className="flex items-center text-xs text-slate-500 uppercase font-bold gap-1">
             <Ban className="w-3 h-3" /> Từ ngữ cấm
           </label>
           <input 
            type="text" 
            value={config.negativePrompt}
            onChange={(e) => updateConfig('negativePrompt', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-red-300 focus:ring-1 focus:ring-red-400 outline-none"
          />
        </div>

        {/* Concept Input (Essential for generation) */}
        <div className="space-y-1">
           <label className="flex items-center text-xs text-slate-500 uppercase font-bold gap-1">
             <Lightbulb className="w-3 h-3 text-yellow-500" /> Ý tưởng chính (Tùy chọn)
           </label>
           <textarea 
            rows={2}
            value={config.storyIdea}
            onChange={(e) => updateConfig('storyIdea', e.target.value)}
            placeholder="Doraemon đi lạc vào vũ trụ..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 focus:ring-1 focus:ring-yellow-400 outline-none resize-none"
          />
        </div>

        {/* MAIN ACTION BUTTON */}
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="mt-auto w-full group relative py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-black text-white shadow-xl hover:shadow-cyan-500/25 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="relative flex items-center justify-center space-x-2">
             <Wand2 className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
             <span className="tracking-wide">
               {isGenerating ? 'ĐANG PHÂN TÍCH...' : 'BẮT ĐẦU TẠO TRUYỆN'}
             </span>
          </div>
        </button>

      </div>
    </div>
  );
};

export default StudioConfigPanel;