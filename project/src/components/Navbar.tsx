import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavHeader from './ui/nav-header';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-yellow-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <span className="font-bold tracking-[0.2em] text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-600">
              MEDIARCH
            </span>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <NavHeader />
          </div>

          {/* Empty div for flex balance */}
          <div className="flex-1 flex justify-end">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-foreground hover:text-yellow-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex justify-center py-4">
              <NavHeader />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}