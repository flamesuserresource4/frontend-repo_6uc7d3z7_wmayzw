import React from 'react';
import SystemStats from './SystemStats';

export default function StatsPage({ stats }) {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 md:p-5">
        <h3 className="text-sm text-zinc-400 mb-3">System Overview</h3>
        <SystemStats stats={stats} />
      </div>
    </div>
  );
}
