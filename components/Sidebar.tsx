import React from 'react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const NavItem: React.FC<{ 
  active: boolean; 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void 
}> = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative w-full flex items-center gap-4 px-4 py-3.5 transition-all duration-200 outline-none
      ${active ? 'text-white' : 'text-slate-500 hover:text-slate-200'}
    `}
  >
    {/* Active Indicator Line */}
    <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500 transition-all duration-300 ease-out
      ${active ? 'opacity-100 h-full' : 'opacity-0 h-0 group-hover:h-1/2 group-hover:opacity-30 top-1/2 -translate-y-1/2'}
    `}></div>

    {/* Icon Container with subtle glow on active */}
    <span className={`relative z-10 p-1.5 rounded-md transition-all duration-300 ${active ? 'bg-amber-500/10 text-amber-400' : 'text-current group-hover:scale-110'}`}>
        {icon}
    </span>
    
    <span className="font-medium text-sm tracking-wide z-10">{label}</span>
    
    {/* Background Highlight */}
    <div className={`absolute inset-0 bg-white/[0.03] transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-[260px] h-full flex flex-col bg-[#080808] border-r border-[#27272a]">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-[#27272a]/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-lg rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            N
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-bold text-white leading-none tracking-tight">NXAI</h1>
            <span className="text-[10px] text-slate-500 font-mono mt-1">PRO.v2.0</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-1">
        <div className="px-6 pb-2">
            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Modules</p>
        </div>
        <NavItem 
            active={activeTab === AppTab.CHAT} 
            onClick={() => onTabChange(AppTab.CHAT)}
            label="Neural Chat"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
        />
        <NavItem 
            active={activeTab === AppTab.THUMBNAILS} 
            onClick={() => onTabChange(AppTab.THUMBNAILS)}
            label="Thumbnails"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
        />
        <NavItem 
            active={activeTab === AppTab.MEDIA} 
            onClick={() => onTabChange(AppTab.MEDIA)}
            label="Media Studio"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
        />
        <NavItem 
            active={activeTab === AppTab.BLOGS} 
            onClick={() => onTabChange(AppTab.BLOGS)}
            label="Content Logs"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>}
        />
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-[#27272a]">
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-[#27272a] group">
            <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-xs font-bold text-white ring-1 ring-white/10 group-hover:ring-amber-500/50 transition-all">
                WK
            </div>
            <div className="flex-1 text-left">
                <div className="text-sm font-medium text-slate-200">Wali Khan</div>
                <div className="text-[10px] text-emerald-500 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    SYSTEM ONLINE
                </div>
            </div>
        </button>
      </div>
    </div>
  );
};