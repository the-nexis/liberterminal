import { Loader2, Terminal } from 'lucide-react';
import ForumRow from './ForumRow';

export default function Feed({ isConnecting, displayedEvents, activeTag }) {
  if (isConnecting) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Loader2 size={32} className="animate-spin mb-4 text-emerald-600" />
        <p className="font-mono text-sm mt-4">Connecting to decentralized relays...</p>
      </div>
    );
  }

  if (displayedEvents.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 border border-gray-800 border-dashed rounded-sm bg-gray-900/20">
        <Terminal size={48} className="mx-auto mb-4 opacity-50 text-emerald-500" />
        <p className="font-mono text-sm">NO_DATA_FOUND</p>
        <p className="text-xs mt-2 text-gray-600">The current filter returned zero events.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {/* List Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 text-xs font-mono text-gray-500 uppercase tracking-wider">
        <span>Topic / Thread</span>
        <span>Identity / Time</span>
      </div>
      
      {/* Forum Rows */}
      {displayedEvents.map((event) => (
        <ForumRow key={event.id} event={event} />
      ))}
    </div>
  );
}