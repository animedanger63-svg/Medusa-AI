import React from 'react';
import Spinner from './Spinner';
import { ToolOption } from '../types';
import { PROMPT_EXAMPLES } from '../constants';

interface PromptInputProps {
  userInput: string;
  onUserInput: (value: string) => void;
  onEnhance: () => void;
  isLoading: boolean;
  error: string | null;
  tool: ToolOption;
}

const SparkleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C11.45 2 11 2.45 11 3V5C11 5.55 11.45 6 12 6C12.55 6 13 5.55 13 5V3C13 2.45 12.55 2 12 2ZM7.05 7.05C6.66 6.66 6.03 6.66 5.64 7.05C5.25 7.44 5.25 8.07 5.64 8.46L7.05 9.88C7.44 10.27 8.07 10.27 8.46 9.88C8.85 9.49 8.85 8.86 8.46 8.47L7.05 7.05ZM16.95 7.05L15.54 8.46C15.15 8.85 15.15 9.48 15.54 9.87C15.93 10.26 16.56 10.26 16.95 9.87L18.36 8.46C18.75 8.07 18.75 7.44 18.36 7.05C17.97 6.66 17.34 6.66 16.95 7.05ZM12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM19 11H21C21.55 11 22 11.45 22 12C22 12.55 21.55 13 21 13H19C18.45 13 18 12.55 18 12C18 11.45 18.45 11 19 11ZM3 11H5C5.55 11 6 11.45 6 12C6 12.55 5.55 13 5 13H3C2.45 13 2 12.55 2 12C2 11.45 2.45 11 3 11ZM7.05 15.54L5.64 16.95C5.25 17.34 5.25 17.97 5.64 18.36C6.03 18.75 6.66 18.75 7.05 18.36L8.46 16.95C8.85 16.56 8.85 15.93 8.46 15.54C8.07 15.15 7.44 15.15 7.05 15.54ZM16.95 15.54C16.56 15.15 15.93 15.15 15.54 15.54C15.15 15.93 15.15 16.56 15.54 16.95L16.95 18.36C17.34 18.75 17.97 18.75 18.36 18.36C18.75 17.97 18.75 17.34 18.36 16.95L16.95 15.54ZM12 18C11.45 18 11 18.45 11 19V21C11 21.55 11.45 22 12 22C12.55 22 13 21.55 13 21V19C13 18.45 12.55 18 12 18Z" />
    </svg>
);


const PromptInput: React.FC<PromptInputProps> = ({ userInput, onUserInput, onEnhance, isLoading, error, tool }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        onEnhance();
      }
    }
  };

  const placeholderText = PROMPT_EXAMPLES[tool];

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="idea-input" className="block text-sm font-semibold text-slate-400 mb-2">Enter your idea</label>
        <div className="relative">
          <textarea
            id="idea-input"
            rows={3}
            value={userInput}
            onChange={(e) => onUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholderText}
            className={`w-full bg-slate-800/60 border ${error ? 'border-red-500' : 'border-slate-700'} rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none transition-colors`}
            disabled={isLoading}
          />
          {userInput && (
             <button
              onClick={() => onUserInput('')}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-300 transition-colors"
              aria-label="Clear input"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>

      <button
        onClick={onEnhance}
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 py-3 px-4 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>Enhancing...</span>
          </>
        ) : (
          <>
            <SparkleIcon className="h-5 w-5" />
            <span>Enhance Prompt</span>
          </>
        )}
      </button>
    </div>
  );
};

export default PromptInput;
