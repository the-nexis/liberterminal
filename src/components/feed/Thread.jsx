import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import PostItem from './PostItem';

export default function Thread({ ndk, pubkey }) {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const [originalPost, setOriginalPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [replyContent, setReplyContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  // Fetch the thread data from Nostr
  useEffect(() => {
    if (!ndk || !eventId) return;

    const fetchThread = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch the Hero post
        const post = await ndk.fetchEvent(eventId);
        setOriginalPost(post);

        // 2. Fetch all replies pointing to this post's ID
        const replyFilter = { 
          kinds: [1], 
          '#e': [eventId] 
        };
        const fetchedReplies = await ndk.fetchEvents(replyFilter);
        
        // Sort replies chronologically (oldest first beneath the main post)
        const sortedReplies = Array.from(fetchedReplies).sort((a, b) => a.created_at - b.created_at);
        setReplies(sortedReplies);
      } catch (error) {
        console.error("Failed to fetch thread:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThread();
  }, [ndk, eventId]);

  // Handle publishing a reply
  const publishReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim() || !ndk || !pubkey || !originalPost) return;

    setIsPublishing(true);
    try {
      const event = new NDKEvent(ndk);
      event.kind = 1;
      event.content = replyContent;
      
      // NIP-10 Threading tags: ["e", event_id, relay_url, marker] and ["p", pubkey]
      event.tags = [
        ["e", originalPost.id, "", "root"],
        ["p", originalPost.pubkey],
        ["t", "liberterminal"] // Keep it tagged in our community
      ];
      
      await event.publish();

      // Optimistic UI update: Append new reply to the bottom
      setReplies(prev => [...prev, event]);
      setReplyContent("");
    } catch (error) {
      console.error("Failed to publish reply:", error);
      alert("Failed to publish reply.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Loader2 size={32} className="animate-spin mb-4 text-emerald-600" />
        <p>Loading decentralized thread...</p>
      </div>
    );
  }

  if (!originalPost) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>Post not found on connected relays.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-emerald-500 hover:underline">
          Return to Feed
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors mb-4"
      >
        <ArrowLeft size={20} />
        Back to Feed
      </button>

      {/* Hero Post */}
      <div className="ring-2 ring-emerald-500/30 rounded-xl shadow-lg shadow-emerald-900/10">
        <PostItem event={originalPost} />
      </div>

      {/* Reply Composer */}
      {pubkey ? (
        <form onSubmit={publishReply} className="bg-gray-900 p-4 rounded-xl border border-gray-800 shadow-lg ml-8 relative before:absolute before:-top-5 before:-left-4 before:w-8 before:h-8 before:border-l-2 before:border-b-2 before:border-gray-700 before:rounded-bl-xl">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Add to the discussion..."
            className="w-full bg-transparent border-none resize-none focus:ring-0 text-gray-100 placeholder-gray-500 p-2 min-h-[80px]"
            disabled={isPublishing}
          />
          <div className="flex justify-end items-center mt-2 pt-2 border-t border-gray-800">
            <button 
              type="submit"
              disabled={!replyContent.trim() || isPublishing}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {isPublishing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Reply
            </button>
          </div>
        </form>
      ) : (
        <div className="ml-8 p-4 border border-gray-800 rounded-xl bg-gray-900/50 text-center text-sm text-gray-500">
          Connect your extension to join the discussion.
        </div>
      )}

      {/* Replies List */}
      <div className="space-y-4 ml-8">
        <h3 className="text-gray-400 text-sm font-medium border-b border-gray-800 pb-2">
          {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
        </h3>
        {replies.map(reply => (
          <div key={reply.id} className="relative before:absolute before:top-[-24px] before:left-[-16px] before:w-8 before:h-12 before:border-l-2 before:border-b-2 before:border-gray-800 before:rounded-bl-xl">
            <PostItem event={reply} />
          </div>
        ))}
      </div>
    </div>
  );
}