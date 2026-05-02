import { useState, useEffect } from 'react';
import NDK, { NDKNip07Signer } from '@nostr-dev-kit/ndk';

const RELAYS = [
  "wss://relay.damus.io",
  "wss://nos.lol",
  "wss://relay.primal.net"
];

export function useNostr() {
  const [ndk, setNdk] = useState(null);
  const [events, setEvents] = useState([]);
  const [isConnecting, setIsConnecting] = useState(true);
  const [pubkey, setPubkey] = useState(null);

  useEffect(() => {
    const initNostr = async () => {
      try {
        const ndkInstance = new NDK({ explicitRelayUrls: RELAYS });
        await ndkInstance.connect();
        setNdk(ndkInstance);

        const filter = { 
          kinds: [1], 
          '#t': ['liberterminal'], 
          limit: 50 
        };
        
        const fetchedEvents = await ndkInstance.fetchEvents(filter);
        const sortedEvents = Array.from(fetchedEvents).sort((a, b) => b.created_at - a.created_at);
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error connecting to Nostr:", error);
      } finally {
        setIsConnecting(false);
      }
    };

    initNostr();
  }, []);

  const login = async () => {
    if (!window.nostr) {
      alert("No Nostr extension found! Please install Alby or nos2x.");
      return;
    }
    try {
      const signer = new NDKNip07Signer();
      if (ndk) ndk.signer = signer;
      const user = await signer.user();
      setPubkey(user.pubkey);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return { ndk, events, setEvents, isConnecting, pubkey, login };
}