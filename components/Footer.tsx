import React from 'react';

type ModalType = 'privacy' | 'terms' | 'about';

interface FooterProps {
  onLinkClick: (modal: ModalType) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  return (
    <footer className="w-full py-6 px-4 text-center text-slate-500 text-sm z-10">
      <div className="max-w-2xl mx-auto border-t border-slate-800 pt-6">
        <p>&copy; {new Date().getFullYear()} Medusa AI. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <button onClick={() => onLinkClick('privacy')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
          <span>&middot;</span>
          <button onClick={() => onLinkClick('terms')} className="hover:text-slate-300 transition-colors">Terms of Use</button>
          <span>&middot;</span>
          <button onClick={() => onLinkClick('about')} className="hover:text-slate-300 transition-colors">About Us</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
