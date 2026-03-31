import React, { useRef } from 'react';
import { ImagePlus, X } from 'lucide-react';

interface StoryInputProps {
  value: string;
  onChange: (value: string) => void;
  referenceImage: File | null;
  onImageChange: (file: File | null) => void;
}

const StoryInput: React.FC<StoryInputProps> = ({ value, onChange, referenceImage, onImageChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 animate-fade-in-up space-y-4">
      
      {/* Header Label */}
      <div className="flex items-center justify-between">
         <label htmlFor="story-input" className="block text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Ý Tưởng Cốt Truyện
        </label>
      </div>
     
      {/* Main Input Area */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
        <textarea
          id="story-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Một con mèo và một con chó tranh luận xem ai tuyệt hơn..."
          className="relative w-full h-40 bg-slate-900 text-slate-100 rounded-lg p-5 border border-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/50 outline-none resize-none shadow-xl transition-all placeholder-slate-600 text-lg leading-relaxed"
        />
      </div>

      {/* Reference Image Upload */}
      <div className="flex items-center space-x-4">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 transition-colors text-sm"
        >
          <ImagePlus className="w-4 h-4 text-pink-500" />
          <span>Thêm ảnh tham khảo (Style)</span>
        </button>

        {referenceImage && (
          <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-pink-500/30">
            <span className="text-xs text-pink-300 truncate max-w-[200px]">
              {referenceImage.name}
            </span>
            <button 
              onClick={() => onImageChange(null)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryInput;