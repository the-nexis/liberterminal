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