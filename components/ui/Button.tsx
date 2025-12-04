import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  active = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed font-sans tracking-wide";
  
  const variants = {
    primary: "bg-white text-black hover:bg-slate-200 shadow-lg shadow-white/10 rounded-lg px-5 py-2.5 text-sm font-bold",
    secondary: "bg-[#27272a] hover:bg-[#3f3f46] text-slate-200 border border-white/5 rounded-lg px-4 py-2 text-sm",
    ghost: `hover:bg-white/5 text-slate-400 hover:text-white rounded-lg px-3 py-2 text-sm ${active ? 'bg-white/10 text-white' : ''}`,
    icon: "p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};