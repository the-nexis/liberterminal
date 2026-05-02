import { useNavigate } from 'react-router-dom';
import { Hash } from 'lucide-react';
import { truncatePubkey, formatTime } from '../../utils/formatters';
import { renderContent } from '../../utils/parser';

export default function PostItem({ event }) {
  const navigate = useNavigate();
  const postTags = event.tags.filter(t => t[0] === 't' && t[1] !== 'liberterminal').map(t => t[1]);

  const handleClick = (e) => {
    // Prevent routing if the user is clicking an embedded link or video
    if (e.target.closest('a') || e.target.closest('.react-player')) return;
    navigate(`/post/${event.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-gray-700 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="font-mono text-emerald-500 text-sm" title={event.pubkey}>
          {truncatePubkey(event.pubkey)}
        </div>
        <div className="text-xs text-gray-500">
          {formatTime(event.created_at)}
        </div>
      </div>
      <div className="text-gray-200 whitespace-pre-wrap leading-relaxed break-words">
        {renderContent(event.content)}
      </div>
      
      {postTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-800/50">
          {postTags.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-xs font-mono text-gray-500 bg-gray-950 px-2 py-1 rounded-md">
              <Hash size={10} />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}