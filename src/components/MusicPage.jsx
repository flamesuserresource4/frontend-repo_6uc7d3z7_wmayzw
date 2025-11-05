import React from 'react';
import HeroSection from './HeroSection';
import MediaControls from './MediaControls';

export default function MusicPage({ connected, currentTrack, playing, volume, onPlayPause, onPrev, onNext, onVolume, playlist, onSelectTrack }) {
  return (
    <div className="space-y-4 md:space-y-6">
      <HeroSection connected={connected} currentTrack={currentTrack} />
      <MediaControls
        playing={playing}
        volume={volume}
        onPlayPause={onPlayPause}
        onPrev={onPrev}
        onNext={onNext}
        onVolume={onVolume}
        playlist={playlist}
        currentTrack={currentTrack}
        onSelectTrack={onSelectTrack}
      />
    </div>
  );
}
