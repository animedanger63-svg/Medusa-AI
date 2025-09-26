import React from 'react';
import { HistoryEntry } from '../types';

interface HistoryProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-2">Prompt History</h2>
        <p className="text-slate-400">You have no saved prompts yet. Generate a prompt to start your history!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 animate-fade-in">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Prompt History</h1>
            <button 
                onClick={onClear}
                className="py-2 px-3 text-sm font-medium rounded-md bg-red-800/50 hover:bg-red-800/80 text-red-300 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500 transition-colors"
            >
                Clear History
            </button>
        </div>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            {history.map(entry => (
                <div key={entry.id} className="bg-slate-900/60 backdrop-blur-lg border border-slate-800 rounded-xl p-4 space-y-3 transition-all duration-200 hover:border-cyan-400/50 hover:bg-slate-800/80">
                    <div className="flex justify-between items-start gap-4">
                        <p className="font-semibold text-slate-300 flex-1 break-words">
                            <span className="text-purple-400">Idea:</span> {entry.idea}
                        </p>
                        <div className="flex-shrink-0 text-right">
                           <div className="flex items-center justify-end gap-2 flex-wrap">
                              {entry.style && entry.style !== 'none' && (
                                <span className="inline-block bg-slate-700 text-teal-300 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
                                  {entry.style}
                                </span>
                              )}
                              {entry.category && entry.category !== 'none' && (
                                <span className="inline-block bg-slate-700 text-sky-300 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
                                  {entry.category}
                                </span>
                              )}
                              <span className="inline-block bg-slate-700 text-purple-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                  {entry.tool}
                              </span>
                           </div>
                            <span className="block text-xs text-slate-500 mt-1.5">
                                {new Date(entry.timestamp).toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <div className="text-sm text-slate-400 bg-black/20 p-3 rounded-md border border-slate-700/50">
                        <p className="line-clamp-3">
                            <span className="font-medium text-slate-300">Prompt:</span> {entry.prompt}
                        </p>
                    </div>
                     <button
                        onClick={() => onSelect(entry)}
                        className="w-full text-center py-2 px-4 text-sm font-medium rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-colors duration-200"
                    >
                        View & Use
                    </button>
                </div>
            ))}
        </div>
    </div>
  );
};

export default History;
