import React, { useEffect, useRef, useState } from 'react';
import { BackgroundPaths } from '../components/ui/background-paths';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { Trophy, Target, Users, Gamepad2 } from 'lucide-react';

function AboutContent() {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-600">
              Our Mission
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              At Mediarch, we're dedicated to revolutionizing the streaming experience through innovative
              technology and community-driven development. Our platform combines competitive gaming
              with educational resources, creating an ecosystem where players can learn, compete,
              and grow together.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-video rounded-xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800"
              alt="Gaming Setup"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <Trophy className="w-8 h-8 text-yellow-500" />,
              title: "24/7",
              description: "Host and participate in tournaments across multiple game titles"
            },
            {
              icon: <Target className="w-8 h-8 text-yellow-500" />,
              title: "Skill Development",
              description: "Access professional coaching and training resources"
            },
            {
              icon: <Users className="w-8 h-8 text-yellow-500" />,
              title: "Personality Development",
              description: "Connect with players who share your passion for gaming"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-600">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10K+", label: "Active Players" },
                { number: "50+", label: "Tournaments" },
                { number: "24/7", label: "Support" },
                { number: "95%", label: "Satisfaction" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-4"
                >
                  <div className="text-3xl font-bold text-yellow-500 mb-2">{stat.number}</div>
                  <div className="text-foreground/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function PingPongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on container size
    const updateCanvasSize = () => {
      const container = containerRef.current;
      if (!container) return;
      
      // Make canvas size responsive but maintain aspect ratio
      const maxWidth = Math.min(800, container.offsetWidth - 32);
      canvas.width = maxWidth;
      canvas.height = maxWidth * 0.5; // 2:1 aspect ratio
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const paddleHeight = canvas.height * 0.25;
    const paddleWidth = 10;
    const ballSize = 8;

    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = canvas.width * 0.005;
    let ballSpeedY = canvas.height * 0.004;

    let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
    let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

    let leftScore = 0;
    let rightScore = 0;

    function drawRect(x: number, y: number, width: number, height: number, color: string) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    }

    function drawCircle(x: number, y: number, radius: number, color: string) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawText(text: string, x: number, y: number, color: string) {
      ctx.fillStyle = color;
      ctx.font = '30px Arial';
      ctx.fillText(text, x, y);
    }

    function draw() {
      // Clear canvas
      drawRect(0, 0, canvas.width, canvas.height, '#000000');

      // Draw paddles
      drawRect(0, leftPaddleY, paddleWidth, paddleHeight, '#FFD700');
      drawRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight, '#FFD700');

      // Draw ball
      drawCircle(ballX, ballY, ballSize, '#FF0000');

      // Draw scores
      drawText(leftScore.toString(), canvas.width / 4, 50, '#FFD700');
      drawText(rightScore.toString(), 3 * canvas.width / 4, 50, '#FFD700');

      // Draw center line
      for (let i = 0; i < canvas.height; i += 40) {
        drawRect(canvas.width / 2 - 1, i, 2, 20, '#FFD700');
      }
    }

    function update() {
      if (!gameStarted || !isInView) return;

      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // AI movement
      const rightPaddleCenter = rightPaddleY + paddleHeight / 2;
      if (rightPaddleCenter < ballY - 35) {
        rightPaddleY += canvas.height * 0.01;
      } else if (rightPaddleCenter > ballY + 35) {
        rightPaddleY -= canvas.height * 0.01;
      }

      // Ball collision with top and bottom
      if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
      }

      // Ball collision with paddles
      if (
        (ballX < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
        (ballX > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
      ) {
        ballSpeedX = -ballSpeedX;
      }

      // Score points
      if (ballX < 0) {
        rightScore++;
        resetBall();
      } else if (ballX > canvas.width) {
        leftScore++;
        resetBall();
      }
    }

    function resetBall() {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = -ballSpeedX;
      ballSpeedY = canvas.height * 0.004;
    }

    function handleMouseMove(e: MouseEvent) {
      if (!isInView) return;
      
      const rect = canvas.getBoundingClientRect();
      const scrollY = window.scrollY;
      const mouseY = e.clientY + scrollY - rect.top;
      const relativeY = (mouseY / rect.height) * canvas.height;
      
      leftPaddleY = relativeY - paddleHeight / 2;

      // Keep paddle within canvas
      if (leftPaddleY < 0) leftPaddleY = 0;
      if (leftPaddleY > canvas.height - paddleHeight) {
        leftPaddleY = canvas.height - paddleHeight;
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    function gameLoop() {
      update();
      draw();
      animationFrameId = requestAnimationFrame(gameLoop);
    }

    // Initial draw
    draw();

    // Start game loop
    gameLoop();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, isInView]);

  return (
    <div ref={containerRef} className="relative py-16 bg-background z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-red-600 inline-flex items-center gap-2">
            <Gamepad2 className="w-8 h-8" />
            Challenge Yourself
          </h2>
          <p className="text-foreground/70 mb-6">Move your mouse up and down to control the left paddle</p>
          {!gameStarted && (
            <button
              onClick={() => setGameStarted(true)}
              className="px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition"
            >
              Start Game
            </button>
          )}
        </div>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="border-2 border-yellow-500/20 rounded-lg cursor-none"
          />
        </div>
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackgroundPaths title="About Mediarch" />
      <AboutContent />
      <PingPongGame />
      <Footer />
    </div>
  );
}