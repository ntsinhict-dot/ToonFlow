import React from 'react';
import { BookOpen, Search, Download, Upload } from 'lucide-react';

const LibraryFooter: React.FC = () => {
  return (
    <div className="w-full mt-auto bg-slate-900/80 backdrop-blur-md border-t border-white/5 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Title */}
        <div className="flex items-center space-x-3 text-slate-200">
          <BookOpen className="w-6 h-6 text-indigo-400" />
          <h3 className="text-lg font-bold">Thư viện truyện</h3>
        </div>

        {/* Right: Controls */}
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Tìm kiếm truyện..." 
              className="w-full bg-slate-950 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-slate-300"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          </div>

          <div className="flex space-x-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-600/30 transition-colors text-sm font-medium">
              <Upload className="w-4 h-4" />
              <span>Nhập</span>
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors text-sm font-medium">
              <Download className="w-4 h-4" />
              <span>Xuất</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LibraryFooter;