import React from 'react';
import { Volume2, Mic, Settings, Layers } from 'lucide-react';
import { AppConfig, Language, ScriptProvider, ScriptModel, TTSProvider, TTSModel, VoiceOption } from '../types';

interface ConfigurationPanelProps {
  config: AppConfig;
  onChange: (newConfig: AppConfig) => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ config, onChange }) => {
  
  const handleChange = (key: keyof AppConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  const playPreview = () => {
    // Simulated voice preview
    const audio = new Audio(); // Placeholder for actual logic
    console.log(`Previewing voice: ${config.voice}`);
    // In a real app, this would play a sample
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-2xl">
        
        {/* Column 1: Script & Image Generation */}
        <div className="space-y-5">
          <div className="flex items-center space-x-2 border-b border-pink-500/30 pb-2">
            <Settings className="w-5 h-5 text-pink-500" />
            <h2 className="text-lg font-bold text-pink-500 tracking-wide">1. TẠO KỊCH BẢN & HÌNH ẢNH</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-slate-400 font-medium">Ngôn ngữ</label>
              <select 
                value={config.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-colors"
              >
                <option value={Language.VIETNAMESE}>Tiếng Việt</option>
                <option value={Language.ENGLISH}>English</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-400 font-medium">Nhà cung cấp</label>
              <select 
                value={config.scriptProvider}
                onChange={(e) => handleChange('scriptProvider', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-colors"
              >
                <option value={ScriptProvider.GEMINI}>Google Gemini</option>
                <option value={ScriptProvider.OPENAI}>OpenAI</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-400 font-medium">Model</label>
              <select 
                value={config.scriptModel}
                onChange={(e) => handleChange('scriptModel', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-colors"
              >
                <option value={ScriptModel.GEMINI_FLASH}>Gemini 2.5 Flash (Mới nhất)</option>
                <option value={ScriptModel.GEMINI_PRO}>Gemini 3.0 Pro (Preview)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Column 2: TTS Generation */}
        <div className="space-y-5">
          <div className="flex items-center space-x-2 border-b border-violet-500/30 pb-2">
            <Volume2 className="w-5 h-5 text-violet-500" />
            <h2 className="text-lg font-bold text-violet-500 tracking-wide">2. TẠO LỜI THOẠI (TTS)</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                <label className="text-sm text-slate-400 font-medium">Nhà cung cấp</label>
                <select 
                  value={config.ttsProvider}
                  onChange={(e) => handleChange('ttsProvider', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                >
                  <option value={TTSProvider.GEMINI}>Google Gemini</option>
                  <option value={TTSProvider.ELEVENLABS}>ElevenLabs</option>
                </select>
              </div>
              <div className="space-y-1">
                 <label className="text-sm text-slate-400 font-medium">Model</label>
                 <select 
                    value={config.ttsModel}
                    onChange={(e) => handleChange('ttsModel', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                  >
                  <option value={TTSModel.GEMINI_TTS}>Gemini 2.5 Flash TTS</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-400 font-medium">Giọng đọc</label>
              <div className="flex space-x-2">
                <select 
                  value={config.voice}
                  onChange={(e) => handleChange('voice', e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
                >
                  {Object.values(VoiceOption).map((voice) => (
                    <option key={voice} value={voice}>{voice}</option>
                  ))}
                </select>
                <button 
                  onClick={playPreview}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-violet-400 border border-slate-700 transition-colors"
                  title="Nghe thử"
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-400 font-medium flex items-center gap-2">
                <Layers className="w-4 h-4" /> Số trang
              </label>
              <input 
                type="number" 
                min="1" 
                max="10" 
                value={config.pageCount}
                onChange={(e) => handleChange('pageCount', parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-colors"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConfigurationPanel;