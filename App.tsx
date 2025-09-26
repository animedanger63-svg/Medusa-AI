import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ToolOption, HistoryEntry, ArtStyle, WebsiteCategory } from './types';
import { enhancePrompt } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import PromptInput from './components/PromptInput';
import ResultDisplay from './components/ResultDisplay';
import Sidebar from './components/Sidebar';
import History from './components/History';
import Modal from './components/Modal';
import ToolSelector from './components/ToolSelector';
import PromptOptions from './components/PromptOptions';
import { LEGAL_CONTENT } from './constants';

type View = 'generator' | 'history';
type ModalContent = 'privacy' | 'terms' | 'about' | null;

function App() {
  const [userInput, setUserInput] = useState<string>('');
  const [selectedTool, setSelectedTool] = useState<ToolOption>(ToolOption.Image);
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle>('none');
  const [selectedCategory, setSelectedCategory] = useState<WebsiteCategory>('none');
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resultKey, setResultKey] = useState<number>(0); // Used to re-trigger animations
  
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<View>('generator');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [activeModal, setActiveModal] = useState<ModalContent>(null);

  // Parse shareable URL on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shareDataRaw = urlParams.get('share');
    if (shareDataRaw) {
      try {
        const jsonString = atob(decodeURIComponent(shareDataRaw));
        const sharedState = JSON.parse(jsonString);
        
        if (sharedState.idea && sharedState.prompt && sharedState.tool) {
            setUserInput(sharedState.idea);
            setEnhancedPrompt(sharedState.prompt);
            setSelectedTool(sharedState.tool);
            setSelectedStyle(sharedState.style || 'none');
            setSelectedCategory(sharedState.category || 'none');
            setResultKey(prev => prev + 1); // Animate the loaded result
        }
      } catch (e) {
        console.error("Failed to parse share data from URL", e);
      } finally {
        // Clean the URL to prevent re-loading the same data on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('promptHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      localStorage.removeItem('promptHistory');
    }
  }, []);
  
  useEffect(() => {
    setSelectedStyle('none');
    setSelectedCategory('none');
  }, [selectedTool]);

  const saveToHistory = (idea: string, prompt: string, tool: ToolOption, style?: ArtStyle, category?: WebsiteCategory) => {
    const newEntry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      idea,
      prompt,
      tool,
      style: tool === ToolOption.Image || tool === ToolOption.Video ? style : undefined,
      category: tool === ToolOption.Website ? category : undefined,
    };
    const updatedHistory = [newEntry, ...history].slice(0, 50); // Keep latest 50
    setHistory(updatedHistory);
    localStorage.setItem('promptHistory', JSON.stringify(updatedHistory));
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire prompt history? This action cannot be undone.")) {
        setHistory([]);
        localStorage.removeItem('promptHistory');
    }
  }
  
  const handleEnhance = useCallback(async (idea: string, tool: ToolOption, style: ArtStyle, category: WebsiteCategory) => {
    if (!idea.trim()) {
      setError('Please enter your idea first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEnhancedPrompt(null);

    try {
      const options = { style, category };
      const result = await enhancePrompt(idea, tool, options);
      setEnhancedPrompt(result);
      setResultKey(prev => prev + 1); // Trigger animation
      saveToHistory(idea, result, tool, style, category);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(message);
      setEnhancedPrompt(`Error: ${message}`);
    } finally {
      setIsLoading(false);
    }
  }, [history]);

  const handleRegenerate = useCallback(() => {
    if(userInput) handleEnhance(userInput, selectedTool, selectedStyle, selectedCategory);
  }, [userInput, selectedTool, selectedStyle, selectedCategory, handleEnhance]);

  const handleHistorySelect = (entry: HistoryEntry) => {
    setUserInput(entry.idea);
    setEnhancedPrompt(entry.prompt);
    setSelectedTool(entry.tool);
    setSelectedStyle(entry.style || 'none');
    setSelectedCategory(entry.category || 'none');
    setCurrentView('generator');
  }

  const handleShare = useCallback(() => {
    if (!enhancedPrompt || !userInput) return;

    const shareData = {
      idea: userInput,
      prompt: enhancedPrompt,
      tool: selectedTool,
      style: selectedStyle,
      category: selectedCategory,
    };

    try {
      const jsonString = JSON.stringify(shareData);
      const base64String = btoa(jsonString);
      const url = `${window.location.origin}${window.location.pathname}?share=${encodeURIComponent(base64String)}`;
      navigator.clipboard.writeText(url);
    } catch (e) {
      console.error("Failed to create share link", e);
    }
  }, [userInput, enhancedPrompt, selectedTool, selectedStyle, selectedCategory]);
  
  const getModalContent = () => {
    if (!activeModal) return null;
    return LEGAL_CONTENT[activeModal];
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col">
      {/* --- NEW: Starfield Background --- */}
      <div className="stars stars-sm"></div>
      <div className="stars stars-md"></div>
      <div className="stars stars-lg"></div>

      {/* --- Aurora Background --- */}
      <div className="aurora-bg">
        <div className="aurora-blob one"></div>
        <div className="aurora-blob two"></div>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))]"></div>
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onNavigate={(view) => {
          setCurrentView(view);
          setSidebarOpen(false);
        }}
        currentView={currentView}
      />
      
      <Header onMenuClick={() => setSidebarOpen(true)} />

      <main className="flex-grow flex items-start md:items-center justify-center p-4 z-10">
        <div className="w-full max-w-3xl mx-auto space-y-8 mt-12 md:mt-0">
          {currentView === 'generator' ? (
            <>
              <div className="text-center">
                 {/* --- MODIFIED: Title --- */}
                <h1 className="text-4xl md:text-5xl font-bold py-2 animate-shimmer">
                    Medusa AI Prompt Forge
                </h1>
                <p className="mt-2 text-slate-400">Transform your ideas into stunning AI prompts for Images, Videos, and Websites.</p>
              </div>
              
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/30 space-y-6 animate-fade-in max-w-2xl mx-auto">
                <ToolSelector 
                  selectedTool={selectedTool}
                  onSelectTool={setSelectedTool}
                />
                <PromptOptions
                  tool={selectedTool}
                  selectedStyle={selectedStyle}
                  onStyleChange={setSelectedStyle}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
                <PromptInput 
                  userInput={userInput}
                  onUserInput={setUserInput}
                  onEnhance={() => handleEnhance(userInput, selectedTool, selectedStyle, selectedCategory)}
                  isLoading={isLoading}
                  error={error}
                  tool={selectedTool}
                />
                <ResultDisplay
                  key={resultKey}
                  prompt={enhancedPrompt}
                  isLoading={isLoading}
                  onRegenerate={handleRegenerate}
                  onShare={handleShare}
                  tool={selectedTool}
                />
              </div>
            </>
          ) : (
            <History history={history} onSelect={handleHistorySelect} onClear={handleClearHistory} />
          )}
        </div>
      </main>
      
      <Footer onLinkClick={(modal) => setActiveModal(modal)} />
      
      <Modal 
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={getModalContent()?.title || ''}
      >
        <p className="text-sm text-slate-400 whitespace-pre-line">{getModalContent()?.content}</p>
      </Modal>
    </div>
  );
}

export default App;