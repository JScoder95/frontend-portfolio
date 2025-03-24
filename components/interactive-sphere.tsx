"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

type Point = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
};

export default function InteractiveSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);
  const animationRef = useRef<number>(0);
  const isMouseOverRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Initialize points
    const initPoints = () => {
      const points: Point[] = [];
      const colors = ["#9B15EB", "#E115EB", "#B215EB", "#D115EB"];
      const numPoints = 100;
      const radius = Math.min(canvas.width, canvas.height) * 0.4;

      for (let i = 0; i < numPoints; i++) {
        // Create points in a spherical distribution
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta) + canvas.width / 2;
        const y = radius * Math.sin(phi) * Math.sin(theta) + canvas.height / 2;
        const z = radius * Math.cos(phi);

        points.push({
          x,
          y,
          z,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          vz: (Math.random() - 0.5) * 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      pointsRef.current = points;
    };

    // Draw function
    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw points
      pointsRef.current.forEach((point) => {
        const size = 2 + (point.z + 200) / 40; // Size based on z-position
        const opacity = 0.5 + point.z / 400;

        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle =
          point.color +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, "0");
        ctx.fill();
      });
    };

    // Update function
    const update = () => {
      if (!canvas) return;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      pointsRef.current.forEach((point) => {
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply influence if mouse is over the canvas
        if (isMouseOverRef.current && distance < 100) {
          const influence = 100 / distance;
          point.vx += (dx / distance) * influence * 0.5;
          point.vy += (dy / distance) * influence * 0.5;
        }

        // Update positions
        point.x += point.vx;
        point.y += point.vy;
        point.z += point.vz;

        // Slow down over time
        point.vx *= 0.76;
        point.vy *= 0.76;
        point.vz *= 0.76;
      });
    };

    // Animation loop
    const animate = () => {
      update();
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Mouse enter/leave handlers
    const handleMouseEnter = () => {
      isMouseOverRef.current = true;
    };

    const handleMouseLeave = () => {
      isMouseOverRef.current = false;
    };

    // Initialize and start animation
    initPoints();
    animate();

    // Add event listeners
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", setCanvasDimensions);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-full relative rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center px-6"
        >
          <h3 className="text-xl font-bold mb-2 gradient-text">
            Interactive Sphere
          </h3>
          <p className="text-sm text-muted-foreground">
            Move your cursor and clean all the circles. Enjoy!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
