import { Terminal, LogIn } from 'lucide-react';
import { truncatePubkey } from '../../utils/formatters';

export default function Navbar({ pubkey, login }) {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 sticky top-0 z-10 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="text-emerald-500" size={28} />
          <h1 className="text-xl font-bold tracking-tight">Liberterminal</h1>
        </div>
        
        {pubkey ? (
          <div className="bg-gray-800 px-4 py-2 rounded-full text-sm font-mono text-emerald-400 border border-gray-700">
            {truncatePubkey(pubkey)}
          </div>
        ) : (
          <button 
            onClick={login}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <LogIn size={18} />
            Connect
          </button>
        )}
      </div>
    </header>
  );
}