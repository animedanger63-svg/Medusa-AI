import React, { useState, useCallback, useEffect } from 'react';
import { ToolOption } from '../types';

interface ResultDisplayProps {
  prompt: string | null;
  isLoading: boolean;
  onRegenerate: () => void;
  onShare: () => void;
  tool: ToolOption;
}

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-3 p-4">
    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
    <div className="h-4 bg-slate-700 rounded w-full"></div>
    <div className="h-4 bg-slate-700 rounded w-5/6"></div>
  </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ prompt, isLoading, onRegenerate, onShare, tool }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isShared, setIsShared] = useState<boolean>(false);
  const [glow, setGlow] = useState(false);
  
  useEffect(() => {
    if (prompt && !isLoading) {
      setGlow(true);
      const timer = setTimeout(() => setGlow(false), 500); // Duration of the animation
      return () => clearTimeout(timer);
    }
  }, [prompt, isLoading]);

  const handleCopyToClipboard = useCallback(() => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [prompt]);
  
  const handleShareLink = useCallback(() => {
    onShare();
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  }, [onShare]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (!prompt) {
      return (
        <div className="h-full flex items-center justify-center text-center p-4">
          <p className="text-slate-500">Your enhanced AI prompt will appear here...</p>
        </div>
      );
    }
    return <p className="p-4 text-slate-300 whitespace-pre-wrap">{prompt}</p>
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-slate-400">Enhanced Prompt</h2>
      <div className={`bg-slate-800/60 border border-slate-700 rounded-lg transition-shadow duration-300 ${glow ? 'animate-result-glow' : ''}`}>
        <div className="min-h-[140px]">
          {renderContent()}
        </div>
      </div>
      {prompt && !isLoading && (
        <div className="flex flex-col sm:flex-row gap-3">
            <button
                onClick={handleCopyToClipboard}
                className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-all duration-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM5 11a1 1 0 100 2h4a1 1 0 100-2H5z" /><path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 1a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                <span>{isCopied ? 'Copied!' : `Copy ${tool} Prompt`}</span>
            </button>
             <button
                onClick={handleShareLink}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium rounded-md bg-slate-700/80 hover:bg-slate-700 text-slate-300 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-200"
                >
                {isShared ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                )}
                <span>{isShared ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
                onClick={onRegenerate}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium rounded-md bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-all duration-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.899 2.186l-1.353.677A5.002 5.002 0 005.95 6.458V5a1 1 0 01-2 0V3a1 1 0 011-1zm11.899 10.399l1.353-.677A7.002 7.002 0 012.101 9.5l1.353-.677A5.002 5.002 0 0014.05 11.542V13a1 1 0 012 0v2a1 1 0 01-1 1h-2.101a7.002 7.002 0 01-11.899-2.186l1.353-.677A5.002 5.002 0 0014.05 13.542V15a1 1 0 01-2 0v-2a1 1 0 011-1z" clipRule="evenodd" /></svg>
                <span>Regenerate</span>
            </button>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
