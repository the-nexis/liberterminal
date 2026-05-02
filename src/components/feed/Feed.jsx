import { Loader2, Terminal } from 'lucide-react';
import PostItem from './PostItem';

export default function Feed({ isConnecting, displayedEvents, activeTag }) {
  if (isConnecting) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Loader2 size={32} className="animate-spin mb-4 text-emerald-600" />
        <p>Connecting to decentralized relays...</p>
      </div>
    );
  }

  if (displayedEvents.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 border border-gray-800 rounded-xl bg-gray-900/50">
        <Terminal size={48} className="mx-auto mb-4 opacity-50" />
        <p>No posts found for this filter.</p>
        {activeTag === "all" && (
          <p className="text-sm mt-2">Connect your extension and be the first to post!</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayedEvents.map((event) => (
        <PostItem key={event.id} event={event} />
      ))}
    </div>
  );
}