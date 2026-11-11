import React, { useEffect, useRef } from 'react';

interface OceanCanvasProps {
  currentDepth: number;
  isHeadlightOn: boolean;
  mousePos: { x: number; y: number };
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: 'bubble' | 'marine-snow' | 'biolum' | 'vent-smoke';
  hue?: number;
}

export const OceanCanvas: React.FC<OceanCanvasProps> = ({
  currentDepth,
  isHeadlightOn,
  mousePos
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.min(80, Math.floor(width / 18));
      const list: Particle[] = [];
      for (let i = 0; i < count; i++) {
        list.push(createParticle(width, height, currentDepth, true));
      }
      particlesRef.current = list;
    };

    const createParticle = (w: number, h: number, depth: number, randomY = false): Particle => {
      const x = Math.random() * w;
      const y = randomY ? Math.random() * h : (depth < 600 ? h + 10 : -10);

      if (depth < 200) {
        // Surface: Rising bubbles
        return {
          x,
          y,
          size: Math.random() * 3 + 1,
          speedY: -(Math.random() * 1.5 + 0.5),
          speedX: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.4 + 0.2,
          type: 'bubble'
        };
      } else if (depth < 1000) {
        // Twilight: Bioluminescent drifting plankton
        return {
          x,
          y,
          size: Math.random() * 2.5 + 0.8,
          speedY: (Math.random() - 0.5) * 0.5,
          speedX: (Math.random() - 0.5) * 0.6,
          opacity: Math.random() * 0.7 + 0.3,
          type: 'biolum',
          hue: 180 + Math.random() * 50
        };
      } else if (depth < 6000) {
        // Midnight / Abyss: Sinking "Marine Snow"
        return {
          x,
          y,
          size: Math.random() * 2.2 + 0.6,
          speedY: Math.random() * 0.8 + 0.2,
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          type: 'marine-snow'
        };
      } else {
        // Hadal: Rising hydrothermal particulate smoke or mineral specks
        return {
          x,
          y,
          size: Math.random() * 3 + 1,
          speedY: -(Math.random() * 1.2 + 0.3),
          speedX: (Math.random() - 0.5) * 0.6,
          opacity: Math.random() * 0.6 + 0.2,
          type: 'vent-smoke',
          hue: Math.random() > 0.4 ? 190 : 35
        };
      }
    };

    initParticles();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw light shafts if in epipelagic sunlit zone (0-200m)
      if (currentDepth < 250) {
        const sunIntensity = Math.max(0, 1 - currentDepth / 250);
        ctx.save();
        const grad = ctx.createLinearGradient(0, 0, width, height * 0.8);
        grad.addColorStop(0, `rgba(56, 189, 248, ${0.15 * sunIntensity})`);
        grad.addColorStop(0.5, `rgba(14, 165, 233, ${0.08 * sunIntensity})`);
        grad.addColorStop(1, 'rgba(3, 7, 18, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // 2. Render particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.y < -20 || p.y > height + 20 || p.x < -20 || p.x > width + 20) {
          particles[i] = createParticle(width, height, currentDepth, false);
          continue;
        }

        ctx.save();
        if (p.type === 'bubble') {
          ctx.strokeStyle = `rgba(186, 230, 253, ${p.opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.stroke();
        } else if (p.type === 'biolum') {
          ctx.fillStyle = `hsla(${p.hue || 190}, 90%, 65%, ${p.opacity})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsla(${p.hue || 190}, 90%, 65%, 0.8)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'marine-snow') {
          ctx.fillStyle = `rgba(226, 232, 240, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'vent-smoke') {
          ctx.fillStyle = `hsla(${p.hue || 200}, 80%, 60%, ${p.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `hsla(${p.hue || 200}, 80%, 60%, 0.7)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 3. Render Submersible Spotlight if active
      if (isHeadlightOn) {
        ctx.save();
        const spotRadius = 260;
        const spotGrad = ctx.createRadialGradient(
          mousePos.x,
          mousePos.y,
          20,
          mousePos.x,
          mousePos.y,
          spotRadius
        );
        spotGrad.addColorStop(0, 'rgba(240, 253, 250, 0.28)');
        spotGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.12)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, spotRadius, 0, Math.PI * 2);
        ctx.fill();

        // Spotlight rim ring
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentDepth, isHeadlightOn, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
