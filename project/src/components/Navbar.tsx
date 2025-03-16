import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavHeader from './ui/nav-header';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold tracking-[0.2em] text-lg md:text-xl text-white hover:text-yellow-500 transition-colors">
              MEDIARCH
            </span>
          </div>
          
          {/* Desktop Navigation - Right aligned */}
          <div className="hidden md:flex justify-end">
            <NavHeader />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-yellow-500 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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