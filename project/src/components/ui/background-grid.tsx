import React from 'react';

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-cyber-grid bg-[length:50px_50px] opacity-5 bg-yellow-500/10 animate-grid-flow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </div>
  );
}