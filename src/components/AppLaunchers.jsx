import React from 'react';
import { PlayCircle, Youtube, Disc3 } from 'lucide-react';

export default function AppLaunchers({ onLaunch }) {
  const items = [
    { id: 'spotify', label: 'Spotify', icon: Disc3, accent: 'from-emerald-600/40 to-emerald-500/20', border: 'border-emerald-500/30' },
    { id: 'vlc', label: 'VLC', icon: PlayCircle, accent: 'from-orange-600/40 to-orange-500/20', border: 'border-orange-500/30' },
    { id: 'youtube', label: 'YouTube', icon: Youtube, accent: 'from-red-600/40 to-red-500/20', border: 'border-red-500/30' },
  ];

  return (
    <section className="grid grid-cols-3 gap-3 md:gap-4">
      {items.map(({ id, label, icon: Icon, accent, border }) => (
        <button
          key={id}
          onClick={() => onLaunch(id)}
          className={`group flex flex-col items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-br ${accent} border ${border} hover:brightness-110 transition`}
        >
          <div className="h-10 w-10 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm text-white/90">{label}</span>
        </button>
      ))}
    </section>
  );
}
