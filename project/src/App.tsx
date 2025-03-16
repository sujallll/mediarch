import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BackgroundGrid } from './components/ui/background-grid';
import { AuraGlow } from './components/ui/aura-glow';
import { Waves } from './components/ui/waves-background';
import { Users, Mail, Trophy, Target, Gamepad2, Github, Linkedin, ArrowRight } from 'lucide-react';
import { supabase } from './lib/supabase';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { About } from './pages/About';
import { ContactForm } from './pages/ContactForm';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function Hero() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Waves
          lineColor="rgba(255, 0, 0, 0.4)"
          backgroundColor="transparent"
          waveSpeedX={0.01}
          waveSpeedY={0.005}
          waveAmpX={50}
          waveAmpY={25}
          friction={0.95}
          tension={0.008}
          maxCursorMove={150}
          xGap={10}
          yGap={30}
        />
      </div>
      <AuraGlow className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/40" />
      <AuraGlow className="absolute bottom-1/4 -right-48 w-96 h-96 bg-yellow-500/40" />
      <div className="container mx-auto px-4 z-10 pt-20 md:pt-0">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-red-500 to-red-700">
            Play the Part. <br />
            Master the Art
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-8 leading-relaxed">
            Join the next generation of streaming excellence with Mediarch's immersive events 
            and expert-led courses. Experience streaming like never before.
          </p>
          {/*<div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-yellow-500" />
              <span className="text-foreground/80">10K+ Active Players</span>
            </div>
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-yellow-500" />
              <span className="text-foreground/80">50+ Gaming Events</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-yellow-500" />
              <span className="text-foreground/80">24/7 Support</span>
            </div>
          </div>*/}
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="py-16 md:py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video rounded-xl overflow-hidden order-2 md:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800"
              alt="Gaming Setup"
              className="object-cover w-full h-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-600">
              About Mediarch
            </h2>
            <p className="text-base md:text-lg text-black/80 leading-relaxed mb-6">
              At Mediarch, we're revolutionizing the gaming landscape by combining competitive 
              excellence with educational development. Our platform serves as a bridge between 
              casual gaming and professional esports.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { icon: <Trophy className="w-6 h-6" />, text: "Professional Tournaments" },
                { icon: <Target className="w-6 h-6" />, text: "Skill Development" },
                { icon: <Users className="w-6 h-6" />, text: "Community Events" },
                { icon: <Gamepad2 className="w-6 h-6" />, text: "Gaming Excellence" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-yellow-500">
                  {item.icon}
                  <span className="text-black/80 text-sm md:text-base">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CreatorsSection() {
  return (
    <div className="relative">
      {/* White background section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          {/* Empty space for overlap */}
        </div>
      </div>

      {/* Red statistics section with negative margin to pull it up */}
      <div className="bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 -mt-32">
        {/* Creators box - positioned to overlap */}
        <div className="relative -top-32 mb-8">
          <div className="max-w-2xl mx-auto px-4">
            <div className="p-10 bg-black rounded-3xl text-white hover:shadow-2xl transition-shadow transform hover:-translate-y-1 duration-300">
              <h3 className="text-5xl font-bold mb-4">FOR CREATORS</h3>
              <p className="text-gray-200 mb-6 text-xl">BOOST YOUR CONTENT'S IMPACT</p>
            </div>
          </div>
        </div>

        {/* Stats content */}
        <div className="container mx-auto px-4">
          {/* Animated text section */}
          <div className="relative max-w-4xl mx-auto mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 opacity-30 blur-xl animate-pulse" />
            <div className="relative bg-white/95 backdrop-blur-sm rounded-[2rem] p-12 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500/10 rounded-full translate-x-1/2 translate-y-1/2 animate-spin-slow" />
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-center relative"
              >
                <span className="bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 text-transparent bg-clip-text animate-gradient">
                  Unlock your potential
                </span>
                <br />
                <span className="text-black/80 mt-2 block">
                  and join our community of creators
                </span>
                <span className="bg-gradient-to-l from-red-600 via-yellow-500 to-red-600 text-transparent bg-clip-text animate-gradient-reverse block mt-2">
                  making waves in the streaming industry
                </span>
              </motion.p>
            </div>
          </div>

          {/* Stats grid with enhanced animation */}
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center max-w-4xl mx-auto">
              {[
                { number: "28M", label: "Followers" },
                { number: "364M", label: "Total Views per Month" },
                { number: "18K", label: "Total Hours of Content Created" },
                { number: "170", label: "Brand Campaigns Executed" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    bounce: 0.4
                  }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-yellow-500/20 rounded-lg blur-lg group-hover:bg-yellow-500/30 transition-all duration-300" />
                  <div className="relative">
                    <div className="text-3xl md:text-4xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamSection() {
  const team = [
    {
      name: "Sahad 'ADEFT' Shaikh",
      role: "",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&h=400",
      social: { instagram: "#" }
    },
    {
      name: "Debraj 'RONZ' Saikia",
      role: "",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400",
      social: { instagram: "#" }
    },
    {
      name: "Pratham 'PATRAT' Biju",
      role: "",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400",
      social: { instagram: "#" }
    },
    /**{
      name: "Emily Zhang",
      role: "",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&h=400",
      social: { github: "#", linkedin: "#" }
    }**/
  ];

  return (
    <div className="py-16 md:py-24 relative">
      <AuraGlow className="absolute bottom-1/4 -left-48 w-96 h-96 bg-yellow-500/20" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-600">
            Meet Our Team
          </h2>
          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
            Our diverse team of gaming enthusiasts and industry professionals is dedicated 
            to creating the best possible experience for our community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-yellow-500/20"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full object-cover w-full h-full"
                />
                <div className="absolute inset-0 rounded-full border-2 border-red-500/20" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">{member.name}</h3>
              <p className="text-yellow-500 text-sm md:text-base mb-4">{member.role}</p>
              <div className="flex justify-center gap-4">
                <a href={member.social.github} className="text-foreground/60 hover:text-red-500 transition">
                  <Github size={20} />
                </a>
                <a href={member.social.linkedin} className="text-foreground/60 hover:text-red-500 transition">
                  <Linkedin size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground relative">
        <BackgroundGrid />
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/" element={
            <>
              <Navbar />
              <main className="relative">
                <Hero />
                <AboutSection />
                <CreatorsSection />
                <TeamSection />
              </main>
              <Footer />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={
            <>
              <Navbar />
              <ContactForm />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;