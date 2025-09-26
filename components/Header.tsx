import React from 'react';
import Logo from './Logo';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    // --- MODIFIED: Added 'relative' and the gradient border div ---
    <header className="sticky top-0 z-20 backdrop-blur-xl bg-slate-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-colors"
              aria-label="Open sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
             <div className="flex items-center space-x-3">
              <Logo className="h-9 w-9 text-slate-200" />
              <span className="text-xl font-bold text-slate-100 hidden sm:block">Medusa AI</span>
            </div>
          </div>
        </div>
      </div>
      {/* --- NEW: Gradient bottom border --- */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
    </header>
  );
};

export default Header;
