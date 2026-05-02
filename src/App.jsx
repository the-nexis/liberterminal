import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { useNostr } from './hooks/useNostr';
import Navbar from './components/layout/Navbar';
import TopicNav from './components/feed/TopicNav';
import Composer from './components/composer/Composer';
import Feed from './components/feed/Feed';
import Thread from './components/feed/Thread';

const AVAILABLE_TAGS = ["crypto", "agorism", "economy"];

export default function App() {
  const { ndk, events, setEvents, isConnecting, pubkey, login } = useNostr();
  const [activeTag, setActiveTag] = useState("all");

  const displayedEvents = activeTag === "all" 
    ? events 
    : events.filter(e => e.tags.some(t => t[0] === 't' && t[1] === activeTag));

  // The main index feed
  const HomeLayout = () => (
    <>
      <TopicNav activeTag={activeTag} setActiveTag={setActiveTag} availableTags={AVAILABLE_TAGS} />
      <Composer ndk={ndk} pubkey={pubkey} setEvents={setEvents} availableTags={AVAILABLE_TAGS} />
      <Feed isConnecting={isConnecting} displayedEvents={displayedEvents} activeTag={activeTag} />
    </>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-emerald-500/30">
        <Navbar pubkey={pubkey} login={login} />

        <main className="max-w-3xl mx-auto px-4 py-8">
          {isConnecting && !ndk ? (
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="animate-spin text-emerald-600" />
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<HomeLayout />} />
              <Route path="/post/:eventId" element={<Thread ndk={ndk} pubkey={pubkey} />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}