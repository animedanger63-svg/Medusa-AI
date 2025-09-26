import React from 'react';
import Logo from './Logo';

type View = 'generator' | 'history';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: View) => void;
  currentView: View;
}

const NavLink: React.FC<{
  label: string;
  view: View;
  currentView: View;
  onNavigate: (view: View) => void;
  comingSoon?: boolean;
}> = ({ label, view, currentView, onNavigate, comingSoon = false }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      if (!comingSoon) onNavigate(view);
    }}
    className={`flex items-center justify-between p-3 rounded-md text-sm font-medium transition-colors ${
      currentView === view && !comingSoon
        ? 'bg-slate-700 text-white'
        : `text-slate-300 hover:bg-slate-800 ${comingSoon ? 'cursor-not-allowed opacity-50' : ''}`
    }`}
  >
    {label}
    {comingSoon && (
      <span className="text-xs bg-purple-500/50 text-purple-200 px-2 py-0.5 rounded-full">Soon</span>
    )}
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, currentView }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-950 border-r border-slate-800 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-3">
                <Logo className="h-8 w-8 text-slate-200" />
                <h2 id="sidebar-title" className="text-lg font-semibold text-white">Medusa AI</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white" aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="space-y-2">
            <NavLink label="AI Prompt Generator" view="generator" currentView={currentView} onNavigate={onNavigate} />
            <NavLink label="Prompt History" view="history" currentView={currentView} onNavigate={onNavigate} />
            <NavLink label="Medusa YT Tools" view="generator" currentView={currentView} onNavigate={onNavigate} comingSoon />
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
