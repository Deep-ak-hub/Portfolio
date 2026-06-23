"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Header() {
  const { scrollYProgress } = useScroll();
  const headerBg = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-40 px-4 md:px-6 py-4 md:py-6"
      >
        <motion.div
          style={{ opacity: headerBg }}
          className="absolute inset-0 bg-gradient-to-b from-[#121212]/90 via-[#121212]/60 to-transparent pointer-events-none"
        />
        <div className={`max-w-7xl mx-auto flex items-center justify-between glass-panel px-5 md:px-6 py-3.5 rounded-full transition-shadow duration-500 ${
          scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-white/[0.08]" : "shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
        }`}>
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2 group">
          <span className="text-sm font-mono tracking-widest text-white group-hover:text-indigo-400 transition-colors duration-300">
            DIPENDRA.JOSHI
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:animate-ping" />
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#work" 
            className="text-xs font-mono text-neutral-400 hover:text-white tracking-widest transition-colors duration-300"
          >
             WORK
          </a>
          <a 
            href="#about" 
            className="text-xs font-mono text-neutral-400 hover:text-white tracking-widest transition-colors duration-300"
          >
             ABOUT
          </a>
          <a 
            href="#contact" 
            className="text-xs font-mono text-neutral-400 hover:text-white tracking-widest transition-colors duration-300"
          >
             CONTACT
          </a>
        </nav>

        {/* Contact/Social Shortcuts */}
        <div className="flex items-center space-x-4">
          <a 
            href="https://github.com/Deep-ak-hub" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors duration-300"
          >
            <GithubIcon size={16} />
          </a>
          <a 
            href="https://www.linkedin.com/in/deepak-joshi-software-developer/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors duration-300"
          >
            <LinkedinIcon size={16} />
          </a>
          <a 
            href="#contact" 
            className="hidden sm:inline-flex items-center px-4 py-1.5 text-[10px] font-mono tracking-wider border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 rounded-full text-white transition-all duration-300"
          >
            GET IN TOUCH
          </a>
        </div>
        </div>
      </motion.header>
    </>
  );
}
