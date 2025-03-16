import React from 'react';
import { Link } from 'react-router-dom';
import { TowerControl as GameController, Users, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black/30 backdrop-blur-sm border-t-4 border-red-500">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GameController className="h-10 w-10 text-yellow-500" />
              <span className="text-yellow-500 font-bold text-xl">MEDIARCH</span>
            </div>
            <p className="text-foreground/80">Play the Part. Master the Art.</p>
          </div>
          <div>
            <h3 className="text-red-500 font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-foreground/80 hover:text-yellow-500">Home</Link></li>
              <li><Link to="/about" className="text-foreground/80 hover:text-yellow-500">About</Link></li>
              <li><Link to="/contact" className="text-foreground/80 hover:text-yellow-500">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-red-500 font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/80 hover:text-yellow-500">Gaming Events</a></li>
              <li><a href="#" className="text-foreground/80 hover:text-yellow-500">Training Courses</a></li>
              <li><a href="#" className="text-foreground/80 hover:text-yellow-500">Tournaments</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-red-500 font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/80 hover:text-yellow-500">
                <GameController size={24} />
              </a>
              <a href="#" className="text-foreground/80 hover:text-yellow-500">
                <Users size={24} />
              </a>
              <a href="#" className="text-foreground/80 hover:text-yellow-500">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-red-500/20 text-center text-foreground/60">
          <p>&copy; 2024 Mediarch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}