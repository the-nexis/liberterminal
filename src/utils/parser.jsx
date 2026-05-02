import ReactPlayer from 'react-player';
import { PlaySquare } from 'lucide-react';

// Utility to parse text and embed video URLs
export const renderContent = (content) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);

  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      // Check if the URL belongs to a common video platform
      const isVideo = part.includes('youtube.com') || part.includes('youtu.be') || 
                      part.includes('rumble.com') || part.includes('vimeo.com') ||
                      part.includes('odysee.com') || part.includes('bitchute.com');
      
      if (isVideo) {
        return (
          <div key={i} className="my-4 rounded-xl overflow-hidden border border-gray-800 bg-black aspect-video flex items-center justify-center">
            <ReactPlayer url={part} width="100%" height="100%" controls={true} light={true} playIcon={<PlaySquare size={48} className="text-emerald-500 bg-gray-900 rounded-lg p-2" />} />
          </div>
        );
      }
      // If it's a link but not a video, make it clickable
      return <a key={i} href={part} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 hover:underline">{part}</a>;
    }
    return <span key={i}>{part}</span>;
  });
};