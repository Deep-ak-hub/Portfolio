"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollProgress: MotionValue<number>;
}

export default function Overlay({ scrollProgress }: OverlayProps) {
  // --- Section 1: Intro (0% - 30% scroll) ---
  // Global fade-out
  const opacity1 = useTransform(scrollProgress, [0, 0.15, 0.30], [1, 1, 0]);
  // Multi-layered parallax translation
  const yTag1 = useTransform(scrollProgress, [0, 0.30], [0, -120]);
  const yTitle1 = useTransform(scrollProgress, [0, 0.30], [0, -70]);
  const yDesc1 = useTransform(scrollProgress, [0, 0.30], [0, -30]);
  const yIndicator1 = useTransform(scrollProgress, [0, 0.12], [0, 50]);
  const opacityIndicator1 = useTransform(scrollProgress, [0, 0.10], [1, 0]);

  // --- Section 2: Philosophy (25% - 55% scroll) ---
  // Global fade (smooth transition with section 1)
  const opacity2 = useTransform(scrollProgress, [0.20, 0.30, 0.48, 0.55], [0, 1, 1, 0]);
  // Multi-layered parallax translation
  const yTag2 = useTransform(scrollProgress, [0.20, 0.30, 0.48, 0.55], [120, 0, 0, -120]);
  const yTitle2 = useTransform(scrollProgress, [0.20, 0.30, 0.48, 0.55], [80, 0, 0, -80]);
  const yDesc2 = useTransform(scrollProgress, [0.20, 0.30, 0.48, 0.55], [40, 0, 0, -40]);

  // --- Section 3: Execution (45% - 55% scroll) ---
  const opacity3 = useTransform(scrollProgress, [0.45, 0.52, 0.55, 0.58], [0, 1, 1, 0]);
  const yTag3 = useTransform(scrollProgress, [0.45, 0.52, 0.55, 0.58], [120, 0, 0, -80]);
  const yTitle3 = useTransform(scrollProgress, [0.45, 0.52, 0.55, 0.58], [80, 0, 0, -50]);
  const yDesc3 = useTransform(scrollProgress, [0.45, 0.52, 0.55, 0.58], [40, 0, 0, -25]);

  // --- Section 4: Handoff (58% - 68% scroll) ---
  const opacity4 = useTransform(scrollProgress, [0.58, 0.62, 0.68, 0.72], [0, 1, 1, 0]);
  const yBridge = useTransform(scrollProgress, [0.58, 0.62, 0.68, 0.72], [30, 0, 0, -50]);

  return (
    <div className="absolute inset-0 z-10 w-full h-full pointer-events-none select-none">
      <div className="max-w-7xl mx-auto h-full w-full px-6 md:px-12 flex flex-col justify-center relative">
        
        {/* Section 1: Intro */}
        <motion.div
          style={{ opacity: opacity1 }}
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
        >
          <motion.span 
            style={{ y: yTag1 }}
            className="text-xs uppercase tracking-[0.4em] text-indigo-400 font-semibold mb-4 block"
          >
            Full Stack Developer
          </motion.span>
          <motion.h1 
            style={{ y: yTitle1 }}
            className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl leading-tight"
          >
            DIPENDRA JOSHI
          </motion.h1>
          <motion.p 
            style={{ y: yDesc1 }}
            className="text-sm md:text-lg text-neutral-400 max-w-lg leading-relaxed font-light"
          >
            MERN Stack specialist crafting type-safe, scalable web applications with React, Node.js, and modern architecture.
          </motion.p>
          <motion.div 
            style={{ y: yIndicator1, opacity: opacityIndicator1 }}
            className="mt-12 flex flex-col items-center"
          >
            <span className="text-[10px] text-neutral-500 uppercase tracking-[0.25em] mb-2 animate-bounce">
              Scroll to explore
            </span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-indigo-500 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Section 2: Philosophy */}
        <motion.div
          style={{ opacity: opacity2 }}
          className="absolute left-6 md:left-12 max-w-xl pr-6 text-left flex flex-col justify-center h-full"
        >
          <motion.span 
            style={{ y: yTag2 }}
            className="text-xs font-mono text-indigo-400 mb-3 tracking-widest block"
          >
          </motion.span>
          <motion.h2 
            style={{ y: yTitle2 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            Type-safe, scalable systems.
          </motion.h2>
          <motion.div style={{ y: yDesc2 }} className="space-y-4">
            <p className="text-neutral-400 leading-relaxed font-light text-sm md:text-base">
              Production-grade MERN stack expertise — React/TypeScript frontends, Node.js/Express APIs, MongoDB & Redis backends.
            </p>
            <p className="text-neutral-500 text-xs md:text-sm leading-relaxed font-light">
              SOLID principles, MVC architecture, and middleware layering aren&apos;t trends — they&apos;re foundational engineering practices.
            </p>
          </motion.div>
        </motion.div>

        {/* Section 3: Engineering */}
        <motion.div
          style={{ opacity: opacity3 }}
          className="absolute right-6 md:right-12 max-w-xl pl-6 text-right flex flex-col justify-center items-end h-full"
        >
          <motion.span 
            style={{ y: yTag3 }}
            className="text-xs font-mono text-indigo-400 mb-3 tracking-widest block"
          >
          </motion.span>
          <motion.h2 
            style={{ y: yTitle3 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            Real-world problem solving.
          </motion.h2>
          <motion.div style={{ y: yDesc3 }} className="space-y-4">
            <p className="text-neutral-400 leading-relaxed font-light text-sm md:text-base">
              Multi-vendor e-commerce platform built and deployed — full auth layers, Redis caching, image processing via Cloudinary.
            </p>
            <p className="text-neutral-500 text-xs md:text-sm leading-relaxed font-light">
              Internship at Kitwosd IT Support Center debugging production issues, collaborating on client projects, and delivering features end-to-end.
            </p>
          </motion.div>
        </motion.div>

        {/* Section 4: Handoff — visible while Projects slides in underneath */}
        <motion.div
          style={{ opacity: opacity4, y: yBridge }}
          className="absolute inset-0 flex flex-col justify-end items-center pb-[18vh] md:pb-[20vh] px-4 text-center pointer-events-auto"
        >
          
          <a
            href="#work"
            className="interactive-cursor group inline-flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors duration-300"
          >
            <span className="text-[10px] uppercase tracking-[0.25em]">Keep scrolling</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-indigo-500 to-transparent group-hover:h-12 transition-all duration-500" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
