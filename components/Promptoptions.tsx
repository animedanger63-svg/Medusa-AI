import React from 'react';
import { ToolOption, ArtStyle, WebsiteCategory } from '../types';
import { ART_STYLES, WEBSITE_CATEGORIES } from '../constants';

interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ label, isSelected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400 ${
      isSelected
        ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg'
        : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
    }`}
    aria-pressed={isSelected}
  >
    {label}
  </button>
);

interface PromptOptionsProps {
  tool: ToolOption;
  selectedStyle: ArtStyle;
  onStyleChange: (style: ArtStyle) => void;
  selectedCategory: WebsiteCategory;
  onCategoryChange: (category: WebsiteCategory) => void;
}

const PromptOptions: React.FC<PromptOptionsProps> = ({
  tool,
  selectedStyle,
  onStyleChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const showStyles = tool === ToolOption.Image || tool === ToolOption.Video;
  const showCategories = tool === ToolOption.Website;

  const renderContent = () => {
    if (showStyles) {
      return (
        <div>
          <label className="block text-sm font-semibold text-slate-400 mb-2">Style</label>
          <div className="flex flex-wrap gap-2">
            {ART_STYLES.map((style) => (
              <OptionButton
                key={style.id}
                label={style.label}
                isSelected={selectedStyle === style.id}
                onClick={() => onStyleChange(style.id)}
              />
            ))}
          </div>
        </div>
      );
    }
    if (showCategories) {
      return (
        <div>
          <label className="block text-sm font-semibold text-slate-400 mb-2">Category</label>
          <div className="flex flex-wrap gap-2">
            {WEBSITE_CATEGORIES.map((category) => (
              <OptionButton
                key={category.id}
                label={category.label}
                isSelected={selectedCategory === category.id}
                onClick={() => onCategoryChange(category.id)}
              />
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  
  const content = renderContent();

  return (
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        content ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
        {content}
    </div>
  );
};

export default PromptOptions;
