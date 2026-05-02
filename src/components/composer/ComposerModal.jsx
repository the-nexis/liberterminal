import { X } from 'lucide-react';
import Composer from './Composer';

export default function ComposerModal({ isOpen, onClose, ndk, pubkey, setEvents, availableTags }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-950 border border-gray-800 shadow-2xl shadow-emerald-900/20 w-full max-w-2xl rounded-md flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="font-mono text-emerald-500 tracking-wide">CREATE_NEW_RECORD</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-200 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <Composer 
            ndk={ndk} 
            pubkey={pubkey} 
            setEvents={setEvents} 
            availableTags={availableTags} 
            onSuccess={onClose} 
          />
        </div>
      </div>
    </div>
  );
}