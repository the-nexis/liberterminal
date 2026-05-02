import { Hash, PlusSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeTag, setActiveTag, availableTags, openComposer }) {
  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    navigate('/'); // Ensure clicking a tag always takes you back to the main feed
  };

  return (
    <div className="flex flex-col gap-6 sticky top-24">
      <button 
        onClick={openComposer}
        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-sm font-mono tracking-wide transition-colors shadow-lg shadow-emerald-900/20 w-full"
      >
        <PlusSquare size={18} />
        NEW_TOPIC
      </button>

      <nav className="flex flex-col gap-1">
        <div className="text-xs font-mono text-gray-500 mb-2 px-3 uppercase tracking-wider">Directory</div>
        
        <button 
          onClick={() => handleTagClick("all")}
          className={`text-left px-3 py-2 rounded-sm text-sm font-mono transition-colors ${activeTag === "all" ? "bg-gray-800 text-emerald-400 border-l-2 border-emerald-500" : "text-gray-400 hover:bg-gray-900 hover:text-gray-200"}`}
        >
          ./all_posts
        </button>
        
        {availableTags.map(tag => (
          <button 
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`flex items-center gap-2 text-left px-3 py-2 rounded-sm text-sm font-mono transition-colors ${activeTag === tag ? "bg-gray-800 text-emerald-400 border-l-2 border-emerald-500" : "text-gray-400 hover:bg-gray-900 hover:text-gray-200"}`}
          >
            <Hash size={14} className="opacity-50" />
            {tag}
          </button>
        ))}
      </nav>
    </div>
  );
}