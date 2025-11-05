import React from 'react';
import AppLaunchers from './AppLaunchers';

export default function LaunchersPage({ onLaunch }) {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 md:p-5">
        <h3 className="text-sm text-zinc-400 mb-3">Launch Apps</h3>
        <AppLaunchers onLaunch={onLaunch} />
      </div>
    </div>
  );
}
