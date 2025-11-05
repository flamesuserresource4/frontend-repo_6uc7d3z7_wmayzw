import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSection({ connected, currentTrack }) {
  return (
    <section className="relative w-full h-[340px] md:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900 to-black border border-zinc-800">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent" />

      <div className="relative z-10 h-full w-full flex flex-col items-start justify-end p-6 md:p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${connected ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-yellow-500/30 bg-yellow-500/10 text-yellow-200'}`}>
            <span className={`h-2 w-2 rounded-full ${connected ? 'bg-emerald-400 animate-pulse' : 'bg-yellow-400'}`} />
            {connected ? 'Connected' : 'Connecting...'}
          </span>
          <span className="text-xs text-zinc-300/80">Realtime Remote Control</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
          Control Center
        </h1>
        <p className="mt-1 text-sm md:text-base text-zinc-300/90">
          Now playing: <span className="font-medium text-white">{currentTrack?.title || 'No media'}</span>
          {currentTrack?.artist ? <span className="text-zinc-400"> • {currentTrack.artist}</span> : null}
        </p>
      </div>
    </section>
  );
}
