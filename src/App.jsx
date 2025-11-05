import React, { useEffect, useMemo, useRef, useState } from 'react';
import HeroSection from './components/HeroSection';
import MediaControls from './components/MediaControls';
import SystemStats from './components/SystemStats';
import AppLaunchers from './components/AppLaunchers';

function deriveWsUrl() {
  const envUrl = import.meta.env.VITE_WS_URL;
  if (envUrl) return envUrl;
  const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return `${proto}://${window.location.host}/ws`;
}

export default function App() {
  const [connected, setConnected] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [stats, setStats] = useState({});
  const wsRef = useRef(null);

  const wsUrl = useMemo(() => deriveWsUrl(), []);

  // Demo playlist for immediate UI
  useEffect(() => {
    setPlaylist([
      { id: '1', title: 'Neon Voyage', artist: 'Aetherwave' },
      { id: '2', title: 'Cosmic Echoes', artist: 'Lunar Drive' },
      { id: '3', title: 'Digital Drift', artist: 'Synth Horizon' },
      { id: '4', title: 'Stellar Bloom', artist: 'Nova District' },
    ]);
    setCurrentTrack({ id: '1', title: 'Neon Voyage', artist: 'Aetherwave' });
  }, []);

  // WebSocket connection
  useEffect(() => {
    let ws;
    try {
      ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.addEventListener('open', () => {
        setConnected(true);
        // Request initial state
        ws.send(JSON.stringify({ type: 'hello', client: 'dashboard' }));
        ws.send(JSON.stringify({ type: 'get_state' }));
        ws.send(JSON.stringify({ type: 'get_stats' }));
      });

      ws.addEventListener('message', (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'state') {
            if (typeof msg.playing === 'boolean') setPlaying(msg.playing);
            if (typeof msg.volume === 'number') setVolume(msg.volume);
            if (msg.currentTrack) setCurrentTrack(msg.currentTrack);
            if (Array.isArray(msg.playlist)) setPlaylist(msg.playlist);
          } else if (msg.type === 'stats') {
            setStats(msg.payload || {});
          } else if (msg.type === 'media') {
            // media event feedback
            if (msg.action === 'play') setPlaying(true);
            if (msg.action === 'pause') setPlaying(false);
            if (msg.action === 'next' && msg.currentTrack) setCurrentTrack(msg.currentTrack);
            if (msg.action === 'prev' && msg.currentTrack) setCurrentTrack(msg.currentTrack);
            if (msg.action === 'volume' && typeof msg.volume === 'number') setVolume(msg.volume);
          }
        } catch (e) {
          // ignore malformed
        }
      });

      ws.addEventListener('close', () => setConnected(false));
      ws.addEventListener('error', () => setConnected(false));
    } catch (e) {
      setConnected(false);
    }

    return () => {
      if (ws) ws.close();
    };
  }, [wsUrl]);

  // Fallback demo stats ticker if not connected
  useEffect(() => {
    let t;
    const tick = () => {
      setStats((prev) => {
        const cpu = Math.min(100, Math.max(5, (prev.cpu || 15) + (Math.random() * 8 - 4)));
        const ramTotal = 16;
        const ramUsed = Math.min(ramTotal, Math.max(2, (prev.ramUsed || 7.2) + (Math.random() * 0.3 - 0.15)));
        const diskTotal = 512;
        const diskUsed = Math.min(diskTotal, Math.max(40, (prev.diskUsed || 128) + (Math.random() * 1.5 - 0.75)));
        const netUp = Math.max(0, Math.round((prev.netUp || 2) + (Math.random() * 3 - 1.5)));
        const netDown = Math.max(0, Math.round((prev.netDown || 8) + (Math.random() * 5 - 2.5)));
        return {
          cpu: Math.round(cpu),
          ramUsed: Math.round(ramUsed * 10) / 10,
          ramTotal,
          diskUsed: Math.round(diskUsed),
          diskTotal,
          netUp,
          netDown,
        };
      });
      t = setTimeout(tick, 1200);
    };

    if (!connected) tick();
    return () => clearTimeout(t);
  }, [connected]);

  // Command helpers
  const send = (payload) => {
    if (wsRef.current && wsRef.current.readyState === 1) {
      wsRef.current.send(JSON.stringify(payload));
    }
  };

  const handlePlayPause = () => {
    const action = playing ? 'pause' : 'play';
    setPlaying(!playing); // immediate feedback
    send({ type: 'media', action });
  };

  const handlePrev = () => {
    const idx = playlist.findIndex((t) => t.id === currentTrack?.id);
    const next = idx > 0 ? playlist[idx - 1] : playlist[0];
    if (next) setCurrentTrack(next);
    send({ type: 'media', action: 'prev' });
  };

  const handleNext = () => {
    const idx = playlist.findIndex((t) => t.id === currentTrack?.id);
    const next = idx >= 0 && idx < playlist.length - 1 ? playlist[idx + 1] : playlist[playlist.length - 1];
    if (next) setCurrentTrack(next);
    send({ type: 'media', action: 'next' });
  };

  const handleVolume = (v) => {
    setVolume(v);
    send({ type: 'media', action: 'volume', volume: v });
  };

  const handleSelectTrack = (track) => {
    setCurrentTrack(track);
    setPlaying(true);
    send({ type: 'media', action: 'play_track', trackId: track.id });
  };

  const handleLaunch = (app) => {
    send({ type: 'system', action: 'launch', app });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-6 md:space-y-8">
        <HeroSection connected={connected} currentTrack={currentTrack} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <MediaControls
              playing={playing}
              volume={volume}
              onPlayPause={handlePlayPause}
              onPrev={handlePrev}
              onNext={handleNext}
              onVolume={handleVolume}
              playlist={playlist}
              currentTrack={currentTrack}
              onSelectTrack={handleSelectTrack}
            />

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 md:p-5">
              <h3 className="text-sm text-zinc-400 mb-3">System Overview</h3>
              <SystemStats stats={stats} />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 md:p-5">
              <h3 className="text-sm text-zinc-400 mb-3">Launch Apps</h3>
              <AppLaunchers onLaunch={handleLaunch} />
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 md:p-5">
              <h3 className="text-sm text-zinc-400 mb-2">Connection</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${connected ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                  <span className="text-sm text-zinc-300">{connected ? 'Connected to host' : 'Attempting to connect...'}</span>
                </div>
                <code className="text-xs text-zinc-500 bg-black/40 border border-zinc-800 rounded px-2 py-1">{wsUrl}</code>
              </div>
              <p className="text-xs text-zinc-500 mt-3">
                Example realtime messages are exchanged via WebSocket. Try the controls to see instant feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
