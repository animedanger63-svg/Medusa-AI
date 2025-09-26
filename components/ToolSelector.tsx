import React, { useState, useRef, useEffect } from 'react';
import { ToolOption } from '../types';
import { TOOLS } from '../constants';

interface ToolSelectorProps {
  selectedTool: ToolOption;
  onSelectTool: (tool: ToolOption) => void;
}

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const ToolIcons: Record<ToolOption, React.ReactElement> = {
    [ToolOption.Image]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    [ToolOption.Video]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    [ToolOption.Website]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
};


const ToolSelector: React.FC<ToolSelectorProps> = ({ selectedTool, onSelectTool }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedToolData = TOOLS.find(t => t.id === selectedTool);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-400 mb-2">Choose Tool</label>
      <div className="relative" ref={wrapperRef}>
        <button
          type="button"
          className="relative w-full cursor-default rounded-lg bg-slate-800/60 py-3 pl-4 pr-10 text-left text-slate-200 shadow-sm ring-1 ring-inset ring-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:text-base"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="flex items-center">
             {React.cloneElement(ToolIcons[selectedTool], {className: "h-5 w-5 mr-3 text-slate-300"})}
            <span className="block truncate">{selectedToolData?.label}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm backdrop-blur-sm border border-slate-700">
            {TOOLS.map((tool) => (
              <li
                key={tool.id}
                className={`relative cursor-default select-none py-2 pl-3 pr-9 text-slate-300 hover:bg-slate-700 ${selectedTool === tool.id ? 'bg-slate-700 text-white' : ''}`}
                onClick={() => {
                  onSelectTool(tool.id);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={selectedTool === tool.id}
              >
                <span className="flex items-center">
                    {React.cloneElement(ToolIcons[tool.id], {className: `h-5 w-5 mr-3 ${selectedTool === tool.id ? 'text-cyan-300' : 'text-slate-400'}`})}
                  <span className={`block truncate ${selectedTool === tool.id ? 'font-semibold' : 'font-normal'}`}>{tool.label}</span>
                </span>
                {selectedTool === tool.id && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-cyan-400">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ToolSelector;
