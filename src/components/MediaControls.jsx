import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, ListMusic, Music } from 'lucide-react';

export default function MediaControls({
  playing,
  volume,
  onPlayPause,
  onPrev,
  onNext,
  onVolume,
  playlist,
  onSelectTrack,
  currentTrack,
}) {
  return (
    <section className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 md:p-5 text-zinc-100">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-600/40 to-pink-600/40 border border-purple-500/30 flex items-center justify-center">
            <Music className="h-6 w-6 text-purple-200" />
          </div>
          <div className="min-w-0">
            <div className="text-sm text-zinc-400">Now Playing</div>
            <div className="font-medium truncate">{currentTrack?.title || '—'}</div>
            <div className="text-xs text-zinc-400 truncate">{currentTrack?.artist || ''}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition"
            aria-label="Previous"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={onPlayPause}
            className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition"
            aria-label="Play/Pause"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button
            onClick={onNext}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition"
            aria-label="Next"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Volume2 className="h-4 w-4 text-zinc-400" />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => onVolume(Number(e.target.value))}
          className="w-full accent-purple-500"
        />
        <div className="w-10 text-right text-sm text-zinc-300">{volume}</div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
          <ListMusic className="h-4 w-4" />
          Playlist
        </div>
        <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
          {playlist?.length ? (
            playlist.map((track, idx) => (
              <button
                key={idx}
                onClick={() => onSelectTrack(track)}
                className={`w-full text-left px-3 py-2 rounded-md border transition ${
                  currentTrack && currentTrack.id === track.id
                    ? 'bg-purple-600/20 border-purple-500/30'
                    : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                <div className="text-sm font-medium truncate">{track.title}</div>
                <div className="text-xs text-zinc-400 truncate">{track.artist}</div>
              </button>
            ))
          ) : (
            <div className="text-sm text-zinc-500">No tracks loaded</div>
          )}
        </div>
      </div>
    </section>
  );
}
