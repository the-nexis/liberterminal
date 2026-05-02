import { useState } from 'react';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { Loader2, Send, Hash } from 'lucide-react';

export default function Composer({ ndk, pubkey, setEvents, availableTags }) {
  const [draftPost, setDraftPost] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const publishPost = async (e) => {
    e.preventDefault();
    if (!draftPost.trim() || !ndk || !pubkey) return;

    setIsPublishing(true);
    try {
      const event = new NDKEvent(ndk);
      event.kind = 1;
      event.content = draftPost;
      
      event.tags = [["t", "liberterminal"]];
      selectedTags.forEach(tag => event.tags.push(["t", tag]));
      
      await event.publish();

      setEvents(prev => [event, ...prev].sort((a, b) => b.created_at - a.created_at));
      setDraftPost("");
      setSelectedTags([]);
    } catch (error) {
      console.error("Failed to publish:", error);
      alert("Failed to publish post.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (!pubkey) return null;

  return (
    <form onSubmit={publishPost} className="mb-8 bg-gray-900 p-4 rounded-xl border border-gray-800 shadow-lg">
      <textarea
        value={draftPost}
        onChange={(e) => setDraftPost(e.target.value)}
        placeholder="Share something with the community..."
        className="w-full bg-transparent border-none resize-none focus:ring-0 text-gray-100 placeholder-gray-500 p-2 min-h-25"
        disabled={isPublishing}
      />
      <div className="flex flex-wrap gap-2 px-2 pb-3">
        {availableTags.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-colors ${selectedTags.includes(tag) ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600"}`}
          >
            <Hash size={12} />
            {tag}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-800">
        <span className="text-xs text-gray-500 font-mono">#{ "liberterminal" }</span>
        <button 
          type="submit"
          disabled={!draftPost.trim() || isPublishing}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-medium transition-colors"
        >
          {isPublishing ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          Publish
        </button>
      </div>
    </form>
  );
}