import React from 'react';
import { GeneratedStory } from '../types';
import { Sparkles } from 'lucide-react';

interface ComicDisplayProps {
  story: GeneratedStory;
}

const ComicDisplay: React.FC<ComicDisplayProps> = ({ story }) => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-16 animate-fade-in-up">
      
      {/* Comic Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-white/10 mb-4">
          <Sparkles className="w-4 h-4 text-pink-400 mr-2" />
          <span className="text-sm font-semibold text-pink-300 uppercase tracking-widest">Comic Generated</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
          {story.title}
        </h2>
      </div>

      {/* Comic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {story.panels.map((panel, index) => (
          <div 
            key={index}
            className="group relative bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-slate-800 transform hover:scale-[1.01] transition-transform duration-300"
          >
            {/* Panel Number Badge */}
            <div className="absolute top-0 left-0 bg-yellow-400 text-slate-900 font-bold px-3 py-1 z-10 border-r-2 border-b-2 border-slate-800 shadow-md">
              #{panel.panelNumber}
            </div>

            {/* Image Container */}
            <div className="aspect-square w-full bg-slate-200 relative">
              {panel.imageUrl ? (
                <img 
                  src={panel.imageUrl} 
                  alt={panel.description}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                  <span className="italic text-sm p-4 text-center">{panel.description}</span>
                </div>
              )}
              
              {/* Caption (if exists) */}
              {panel.caption && (
                <div className="absolute top-2 right-2 max-w-[60%] bg-yellow-100 border-2 border-slate-900 p-2 text-xs font-bold text-slate-800 shadow-[2px_2px_0px_rgba(15,23,42,1)] transform rotate-1">
                  {panel.caption}
                </div>
              )}
            </div>

            {/* Dialogue / Speech Bubble Area */}
            <div className="bg-white p-4 min-h-[100px] border-t-4 border-slate-800 flex items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
               {/* Speech Bubble Tail Simulation */}
               <div className="absolute -top-3 left-1/2 -ml-2 w-4 h-4 bg-white border-t-4 border-l-4 border-slate-800 transform rotate-45 z-0"></div>
               <div className="absolute -top-1 left-1/2 -ml-2 w-5 h-2 bg-white z-10"></div>
               
               <p className="text-slate-900 font-comic text-center font-bold text-lg leading-tight relative z-20">
                 "{panel.dialogue}"
               </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicDisplay;