import { Hash } from 'lucide-react';

export default function TopicNav({ activeTag, setActiveTag, availableTags }) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-6 mb-2 scrollbar-hide">
      <button 
        onClick={() => setActiveTag("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTag === "all" ? "bg-emerald-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200"}`}
      >
        All Posts
      </button>
      {availableTags.map(tag => (
        <button 
          key={tag}
          onClick={() => setActiveTag(tag)}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTag === tag ? "bg-emerald-600 text-white border border-emerald-500/50" : "bg-gray-800 text-gray-400 border border-transparent hover:bg-gray-700 hover:text-gray-200"}`}
        >
          <Hash size={14} />
          {tag}
        </button>
      ))}
    </nav>
  );
}