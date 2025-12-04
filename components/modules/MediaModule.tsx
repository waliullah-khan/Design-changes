import React, { useState } from 'react';
import { MOCK_MEDIA } from '../../constants';
import { Button } from '../ui/Button';

type FilterType = 'all' | 'video' | 'image';

export const MediaModule: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const filteredItems = MOCK_MEDIA.filter(item => filter === 'all' || item.type === filter);

  return (
    <div className="h-full w-full flex flex-col bg-[#0a0a0a]">
      {/* Header */}
      <div className="p-8 pb-4">
        <div className="flex justify-between items-start mb-6">
           <div>
             <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Media Vault</h2>
             <p className="text-sm text-slate-500">Centralized storage for all generated social assets.</p>
           </div>
           
           {/* Custom Filter Tabs */}
           <div className="flex p-1 bg-[#151515] border border-[#27272a] rounded-lg">
             {['all', 'video', 'image'].map((f) => (
               <button
                 key={f}
                 onClick={() => setFilter(f as FilterType)}
                 className={`px-6 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
                   filter === f 
                     ? 'bg-[#27272a] text-white shadow-sm' 
                     : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                 }`}
               >
                 {f}
               </button>
             ))}
           </div>
        </div>
        <div className="h-px w-full bg-[#27272a]"></div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative bg-[#0e0e0e] border border-[#27272a] hover:border-amber-500/30 rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]">
               {/* Preview */}
               <div className="relative aspect-[4/3] overflow-hidden bg-black">
                 <img src={item.url} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
                 
                 {/* Type Badge */}
                 <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur border border-white/10 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                    {item.type}
                 </div>

                 {/* Play Button for Video */}
                 {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center pl-1 shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                    </div>
                 )}
               </div>

               {/* Meta */}
               <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-sm font-semibold text-white truncate pr-4">{item.title}</h3>
                     {item.platform && (
                         <span className="text-[10px] text-amber-500 font-mono">{item.platform}</span>
                     )}
                  </div>
                  <div className="flex justify-between items-end mt-4">
                     <span className="text-[11px] text-slate-600 font-mono">{item.date}</span>
                     <button className="text-slate-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};