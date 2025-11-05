import React from 'react';
import { Music, Gauge, Rocket } from 'lucide-react';

export default function Navbar({ page, onNavigate }) {
  const items = [
    { key: 'music', label: 'Music', icon: Music },
    { key: 'stats', label: 'System', icon: Gauge },
    { key: 'apps', label: 'Apps', icon: Rocket },
  ];

  return (
    <nav className="sticky top-0 z-20 mb-4 md:mb-6">
      <div className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl px-2 py-2 flex items-center gap-2 w-full max-w-fit mx-auto">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition border ${
              page === key
                ? 'bg-zinc-900/80 border-zinc-700 text-white'
                : 'bg-transparent border-transparent text-zinc-300 hover:text-white hover:bg-zinc-900/40'
            }`}
            aria-current={page === key ? 'page' : undefined}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
