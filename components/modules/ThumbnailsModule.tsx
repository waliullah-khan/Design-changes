import React from 'react';
import { MOCK_THUMBNAILS } from '../../constants';
import { Button } from '../ui/Button';

export const ThumbnailsModule: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col bg-[#0a0a0a] p-8">
      <div className="flex justify-between items-end mb-8 border-b border-[#27272a] pb-6">
        <div>
           <h2 className="text-3xl font-bold text-white tracking-tight font-display mb-2">Thumbnail Generator</h2>
           <p className="text-sm text-slate-500 max-w-lg">High-resolution assets generated from your content context.</p>
        </div>
        <div className="flex gap-2">
            <div className="px-3 py-1 bg-[#151515] border border-[#27272a] rounded text-xs font-mono text-slate-400">
                TOTAL: {MOCK_THUMBNAILS.length}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-10">
        {MOCK_THUMBNAILS.map((url, idx) => (
          <div key={idx} className="group relative bg-[#0f0f0f] border border-[#27272a] rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300">
            {/* Image Container */}
            <div className="aspect-video overflow-hidden bg-black relative">
               <img 
                 src={url} 
                 alt={`Thumbnail ${idx + 1}`} 
                 className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
               />
               
               {/* Overlay Actions */}
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                 <button className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wide rounded hover:bg-amber-400 transition-colors transform translate-y-2 group-hover:translate-y-0 duration-300 delay-75">
                    Download
                 </button>
               </div>
            </div>
            
            {/* Info */}
            <div className="p-3 bg-[#111] border-t border-[#27272a]">
               <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-300 font-mono">IMG_00{idx + 1}.png</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};