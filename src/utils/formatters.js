// Utility to format the public key for display
export const truncatePubkey = (pk) => {
  if (!pk) return "";
  return `${pk.slice(0, 8)}...${pk.slice(-8)}`;
};

// Utility to format unix timestamps
export const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};
// Extracts a pseudo-title and preview text from a raw post
export const extractTitleAndPreview = (content) => {
  // Remove URLs so they don't clutter the preview
  const textWithoutUrls = content.replace(/(https?:\/\/[^\s]+)/g, '').trim();
  const lines = textWithoutUrls.split('\n').filter(l => l.trim().length > 0);
  
  if (lines.length === 0) return { title: "[Media Only]", preview: "" };

  let title = lines[0];
  if (title.length > 80) title = title.substring(0, 80) + '...';

  const preview = textWithoutUrls.replace(lines[0], '').trim().substring(0, 120);
  
  return { 
    title, 
    preview: preview.length === 120 ? preview + '...' : preview 
  };
};