import { useNavigate } from 'react-router-dom';
import { Hash } from 'lucide-react';
import { truncatePubkey, formatTime, extractTitleAndPreview } from '../../utils/formatters';

export default function ForumRow({ event }) {
  const navigate = useNavigate();
  const { title, preview } = extractTitleAndPreview(event.content);
  const postTags = event.tags.filter(t => t[0] === 't' && t[1] !== 'liberterminal').map(t => t[1]);

  return (
    <div 
      onClick={() => navigate(`/post/${event.id}`)}
      className="group bg-gray-900 border border-gray-800 p-4 hover:bg-gray-800/50 hover:border-l-emerald-500 hover:border-l-4 transition-all cursor-pointer flex flex-col gap-2 rounded-sm"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-gray-100 font-semibold text-lg leading-snug group-hover:text-emerald-400 transition-colors">
          {title}
        </h2>
        <div className="text-xs text-gray-500 font-mono whitespace-nowrap ml-4">
          {formatTime(event.created_at)}
        </div>
      </div>
      
      {preview && (
        <p className="text-gray-500 text-sm truncate">
          {preview}
        </p>
      )}

      <div className="flex items-center gap-4 mt-1">
        <div className="font-mono text-emerald-600 text-xs" title={event.pubkey}>
          {truncatePubkey(event.pubkey)}
        </div>
        
        {postTags.length > 0 && (
          <div className="flex items-center gap-2">
            {postTags.slice(0, 3).map(tag => (
              <span key={tag} className="flex items-center gap-0.5 text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                <Hash size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}