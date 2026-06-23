"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "project">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics-based spring follower for the outer ring (lag effect)
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 220, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 220, mass: 0.6 });

  useEffect(() => {
    // Detect if hover is supported (mouse is present)
    const media = window.matchMedia("(hover: none)");
    setIsTouchDevice(media.matches);
    
    const mediaListener = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };
    media.addEventListener("change", mediaListener);

    if (media.matches) return;

    // Hide default cursor
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Project card context
      const isProjectCard = target.closest(".glass-card");
      if (isProjectCard) {
        setCursorType("project");
        return;
      }

      // Simple interactive element context (buttons, links, inputs)
      const isInteractive = target.closest("a, button, [role='button'], input, select, textarea, .interactive-cursor");
      if (isInteractive) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      media.removeEventListener("change", mediaListener);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out ${
          cursorType === "project"
            ? "w-20 h-20 bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center backdrop-blur-[2px]"
            : cursorType === "pointer"
            ? "w-12 h-12 border border-indigo-400 bg-indigo-500/5 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
            : "w-8 h-8 border border-white/25"
        }`}
      >
        {cursorType === "project" && (
          <span className="text-[10px] font-mono tracking-widest text-indigo-300 font-bold animate-pulse">
            VIEW
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 transition-all duration-150 ease-out mix-blend-difference ${
          cursorType === "project"
            ? "w-1.5 h-1.5 bg-indigo-400"
            : cursorType === "pointer"
            ? "w-3.5 h-3.5 bg-white"
            : "w-1.5 h-1.5 bg-white"
        }`}
      />
    </>
  );
}
