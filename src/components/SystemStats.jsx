import React from 'react';
import { Cpu, HardDrive, Activity, Gauge } from 'lucide-react';

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-zinc-100">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
          <Icon className="h-5 w-5 text-zinc-300" />
        </div>
        <div>
          <div className="text-sm text-zinc-400">{label}</div>
          <div className="text-lg font-semibold">{value}</div>
          {sub ? <div className="text-xs text-zinc-500 mt-0.5">{sub}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default function SystemStats({ stats }) {
  const { cpu = 0, ramUsed = 0, ramTotal = 0, diskUsed = 0, diskTotal = 0, netUp = 0, netDown = 0 } = stats || {};
  const ramPct = ramTotal ? Math.round((ramUsed / ramTotal) * 100) : 0;
  const diskPct = diskTotal ? Math.round((diskUsed / diskTotal) * 100) : 0;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <StatCard icon={Cpu} label="CPU" value={`${cpu}%`} />
      <StatCard icon={Gauge} label="RAM" value={`${ramPct}%`} sub={`${ramUsed} / ${ramTotal} GB`} />
      <StatCard icon={HardDrive} label="Disk" value={`${diskPct}%`} sub={`${diskUsed} / ${diskTotal} GB`} />
      <StatCard icon={Activity} label="Network" value={`↓ ${netDown} • ↑ ${netUp}`} />
    </section>
  );
}
