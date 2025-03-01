import React from 'react';

export function AuraGlow({ className }: { className?: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl animate-glow opacity-20 ${className}`} />
  );
}