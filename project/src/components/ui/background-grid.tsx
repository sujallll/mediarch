import React from 'react';

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-cyber-grid bg-[length:50px_50px] opacity-10 bg-yellow-500/20 animate-grid-flow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
    </div>
  );
}