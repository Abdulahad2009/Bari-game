import { useEffect, useRef } from "react";

export function ExplosionsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
    }> = [];

    const colors = ["#f97316", "#fb923c", "#fbbf24", "#ef4444", "#fff7ed"];

    function createExplosion() {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height;
      const count = 30 + Math.random() * 40;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 30 + Math.random() * 40,
          size: 2 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    let frameId: number;
    let explosionTimer: number;

    function animate() {
      ctx.fillStyle = "rgba(26, 26, 26, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = 1 - progress;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          p.size * (1 - progress * 0.5),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      frameId = requestAnimationFrame(animate);
    }

    function scheduleExplosion() {
      createExplosion();
      explosionTimer = window.setTimeout(
        scheduleExplosion,
        400 + Math.random() * 800
      );
    }

    scheduleExplosion();
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(explosionTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
