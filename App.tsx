import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatModule } from './components/modules/ChatModule';
import { ThumbnailsModule } from './components/modules/ThumbnailsModule';
import { MediaModule } from './components/modules/MediaModule';
import { BlogsModule } from './components/modules/BlogsModule';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.CHAT);

  const renderModule = () => {
    switch (activeTab) {
      case AppTab.CHAT: return <ChatModule />;
      case AppTab.THUMBNAILS: return <ThumbnailsModule />;
      case AppTab.MEDIA: return <MediaModule />;
      case AppTab.BLOGS: return <BlogsModule />;
      default: return <ChatModule />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#050505] grid-bg overflow-hidden relative text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-100">
      
      {/* Sidebar - Fixed Left */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-hidden relative z-10 flex flex-col">
        {/* Top Header / Status Bar could go here if needed, keeping it clean for now */}
        <div className="flex-1 p-0 sm:p-4 md:p-6 overflow-hidden">
           <div className="h-full w-full rounded-xl border border-[#27272a] bg-[#0a0a0a]/80 backdrop-blur-sm shadow-2xl overflow-hidden relative">
             {renderModule()}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;