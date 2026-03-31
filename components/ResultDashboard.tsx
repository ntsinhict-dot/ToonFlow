import React, { useState } from 'react';
import { GeneratedResult } from '../types';
import { Download, ChevronRight, Share2, Printer, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResultDashboardProps {
  data: GeneratedResult;
}

const ResultDashboard: React.FC<ResultDashboardProps> = ({ data }) => {
  const [activeEpisodeId, setActiveEpisodeId] = useState<number>(data.episodes[0].id);
  const activeEpisode = data.episodes.find(ep => ep.id === activeEpisodeId) || data.episodes[0];

  const getBubblePositionClass = (pos?: string) => {
    switch(pos) {
      case 'top-left': return 'top-4 left-4 rounded-tl-none';
      case 'top-right': return 'top-4 right-4 rounded-tr-none';
      case 'bottom-left': return 'bottom-4 left-4 rounded-bl-none';
      case 'bottom-right': return 'bottom-4 right-4 rounded-br-none';
      case 'top-center': return 'top-4 left-1/2 -translate-x-1/2';
      case 'bottom-center': return 'bottom-4 left-1/2 -translate-x-1/2';
      default: return 'bottom-4 left-4 rounded-bl-none'; // Default
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col gap-8 pb-20"
    >
      
      {/* 1. Dashboard Controls */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
         <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {data.episodes.map(ep => (
               <button 
                key={ep.id}
                onClick={() => setActiveEpisodeId(ep.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                  activeEpisodeId === ep.id 
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/20' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
               >
                 <span>{ep.title}</span>
                 {activeEpisodeId === ep.id && <ChevronRight className="w-4 h-4" />}
               </button>
            ))}
         </div>
         <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors" title="Chỉnh sửa lời thoại">
               <Edit3 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-green-400 transition-colors" title="Chia sẻ">
               <Share2 className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm shadow-lg transition-all">
               <Download className="w-4 h-4" />
               <span>Xuất PDF</span>
            </button>
         </div>
      </div>

      {/* 2. Comic Page Viewer */}
      <div className="w-full max-w-4xl mx-auto space-y-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEpisodeId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {activeEpisode.pages.map((page) => (
              <div key={page.pageNumber} className="relative group">
                
                {/* Page Header */}
                <div className="absolute -top-4 left-0 bg-slate-900 border border-slate-700 text-slate-400 text-xs font-bold px-3 py-1 rounded-full z-10 shadow-xl">
                   TRANG {page.pageNumber} / {activeEpisode.pages.length}
                </div>

                {/* COMIC PAGE CONTAINER */}
                <div className="w-full bg-white aspect-[9/16] md:aspect-[3/4] lg:aspect-auto lg:min-h-[1000px] p-2 md:p-6 shadow-2xl rounded-sm border-[8px] border-slate-800 overflow-hidden">
                   
                   {/* Vertical Stack Layout (Full Width Panels) */}
                   <div className="flex flex-col gap-6 md:gap-8 h-full">
                      {page.panels.map((panel, pIdx) => {
                        return (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            key={panel.id} 
                            className="relative border-[4px] md:border-[6px] border-slate-900 overflow-hidden bg-slate-100 shadow-[8px_8px_0px_rgba(15,23,42,0.1)] group"
                          >
                             {/* Image */}
                             <div className="aspect-video md:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
                                {panel.imageUrl ? (
                                  <img 
                                    src={panel.imageUrl} 
                                    alt={panel.description} 
                                    className="w-full h-full object-cover filter contrast-[1.05] saturate-[1.1] transition-transform duration-700 group-hover:scale-105" 
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 p-8 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                      <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                                      <span className="text-sm font-bold uppercase tracking-tighter">Đang vẽ khung hình...</span>
                                    </div>
                                  </div>
                                )}
                             </div>
                             
                             {/* Speech Bubble - Dynamic Placement */}
                             <div className={`absolute max-w-[85%] md:max-w-[60%] z-20 ${getBubblePositionClass(panel.bubblePos)}`}>
                                <motion.div 
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  whileInView={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                  className="relative bg-white text-slate-900 border-[3px] border-slate-900 px-4 py-3 md:px-6 md:py-4 rounded-[2rem] shadow-[6px_6px_0px_rgba(0,0,0,0.15)]"
                                >
                                   <p className="font-comic font-bold text-sm md:text-lg lg:text-xl leading-tight text-center">
                                     {panel.dialogue}
                                   </p>
                                   {/* Bubble Tail */}
                                   <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-b-[3px] border-r-[3px] border-slate-900 rotate-45"></div>
                                </motion.div>
                             </div>

                             {/* Panel Number Badge */}
                             <div className="absolute top-0 left-0 bg-yellow-400 text-black text-xs md:text-sm font-black px-3 py-1 border-r-4 border-b-4 border-slate-900 z-30">
                               {pIdx + 1}
                             </div>

                             {/* Description Overlay (Hover) */}
                             <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 pointer-events-none">
                                <p className="text-white text-[10px] md:text-xs font-medium bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                                  {panel.description}
                                </p>
                             </div>
                          </motion.div>
                        )
                      })}
                   </div>
                   
                   {/* Footer of the comic page */}
                   <div className="mt-4 flex justify-between items-center text-[10px] text-slate-400 font-mono uppercase">
                      <span>ToonFlow Studio AI</span>
                      <span>{activeEpisode.title}</span>
                   </div>

                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

    </motion.div>
  );
};

export default ResultDashboard;