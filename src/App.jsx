import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { useNostr } from './hooks/useNostr';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import ComposerModal from './components/composer/ComposerModal';
import Feed from './components/feed/Feed';
import Thread from './components/feed/Thread';

const AVAILABLE_TAGS = ["crypto", "agorism", "economy"];

export default function App() {
  const { ndk, events, setEvents, isConnecting, pubkey, login } = useNostr();
  const [activeTag, setActiveTag] = useState("all");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const displayedEvents = activeTag === "all" 
    ? events 
    : events.filter(e => e.tags.some(t => t[0] === 't' && t[1] === activeTag));

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500/30">
        <Navbar pubkey={pubkey} login={login} />

        {/* Global Two-Column Layout */}
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
          
          {/* Left Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <Sidebar 
              activeTag={activeTag} 
              setActiveTag={setActiveTag} 
              availableTags={AVAILABLE_TAGS}
              openComposer={() => pubkey ? setIsComposerOpen(true) : login()}
            />
          </aside>

          {/* Main Stage */}
          <main className="flex-1 min-w-0">
            {isConnecting && !ndk ? (
              <div className="flex justify-center py-20">
                <Loader2 size={32} className="animate-spin text-emerald-600" />
              </div>
            ) : (
              <Routes>
                <Route path="/" element={
                  <Feed isConnecting={isConnecting} displayedEvents={displayedEvents} activeTag={activeTag} />
                } />
                <Route path="/post/:eventId" element={<Thread ndk={ndk} pubkey={pubkey} />} />
              </Routes>
            )}
          </main>
        </div>

        {/* Floating Composer Modal */}
        <ComposerModal 
          isOpen={isComposerOpen} 
          onClose={() => setIsComposerOpen(false)}
          ndk={ndk}
          pubkey={pubkey}
          setEvents={setEvents}
          availableTags={AVAILABLE_TAGS}
        />
      </div>
    </Router>
  );
}