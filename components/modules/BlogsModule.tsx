import React from 'react';
import { MOCK_BLOGS } from '../../constants';
import { Button } from '../ui/Button';

export const BlogsModule: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col bg-[#0a0a0a] p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
           <h2 className="text-3xl font-bold text-white tracking-tight font-display">Content Logs</h2>
           <p className="text-sm text-slate-500 mt-1">Manage and deploy long-form content.</p>
        </div>
        <Button className="bg-white text-black hover:bg-slate-200 border-none shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <span className="mr-2 font-bold text-lg leading-none">+</span> Create New
        </Button>
      </div>

      <div className="border border-[#27272a] rounded-xl overflow-hidden bg-[#0c0c0c]">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b border-[#27272a] bg-[#111] text-xs text-slate-500 font-mono uppercase tracking-widest">
                    <th className="p-5 font-semibold">Article Title</th>
                    <th className="p-5 font-semibold">Status</th>
                    <th className="p-5 font-semibold">Platform</th>
                    <th className="p-5 font-semibold">Date</th>
                    <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a] text-sm">
                {MOCK_BLOGS.map((blog) => (
                    <tr key={blog.id} className="hover:bg-[#151515] transition-colors group">
                        <td className="p-5 font-medium text-slate-200 group-hover:text-white transition-colors">
                            {blog.title}
                        </td>
                        <td className="p-5">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded border text-[10px] font-bold uppercase tracking-wide ${
                                blog.status === 'Published' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-900/50' :
                                blog.status === 'Draft' ? 'bg-amber-900/20 text-amber-400 border-amber-900/50' :
                                'bg-blue-900/20 text-blue-400 border-blue-900/50'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                     blog.status === 'Published' ? 'bg-emerald-400' :
                                     blog.status === 'Draft' ? 'bg-amber-400' :
                                     'bg-blue-400'
                                }`}></span>
                                {blog.status}
                            </span>
                        </td>
                        <td className="p-5 text-slate-400 font-mono text-xs">{blog.platform}</td>
                        <td className="p-5 text-slate-400 font-mono text-xs">{blog.date}</td>
                        <td className="p-5 text-right">
                            <button className="text-xs font-medium text-slate-500 hover:text-white transition-colors mr-4">PREVIEW</button>
                            <button className="text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors">EDIT</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        {MOCK_BLOGS.length === 0 && (
            <div className="p-12 text-center text-slate-600 font-mono text-sm">
                NO ENTRIES FOUND IN DATABASE
            </div>
        )}
      </div>
    </div>
  );
};