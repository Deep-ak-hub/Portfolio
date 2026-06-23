"use client";

import React from "react";
import { ArrowUpRight, Star } from "lucide-react";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-[#121212] pt-24 md:pt-32 pb-16 px-6 border-t border-white/[0.06] z-20 overflow-hidden scroll-mt-24">
      {/* Decorative Grids and Glows */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Big Typography Column */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-indigo-400 tracking-[0.3em] uppercase block mb-6">
                Let&apos;s Connect
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-8 leading-tight">
                {"BUILD AMBITIOUS"}<br />
                WEB SOLUTIONS.
              </h2>
              <p className="text-neutral-400 font-light max-w-md leading-relaxed mb-8">
                Always interested in production challenges, scalable architecture, and projects pushing MERN stack capabilities. Let&apos;s collaborate on something impactful.
              </p>
            </div>
            
            <a 
              href="mailto:dipendrajoshi.dev@gmail.com" 
              className="inline-flex items-center text-lg md:text-2xl font-mono text-white hover:text-indigo-400 transition-colors duration-300 group mt-4"
            >
              dipendrajoshi.dev@gmail.com
              <ArrowUpRight size={20} className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-indigo-400" />
            </a>
          </div>

          {/* Connect Column (Glass Panel) */}
          <div id="about" className="glass-card rounded-2xl p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-white uppercase mb-8 pb-4 border-b border-white/[0.06]">
                Connect With Me
              </h3>
              
              <ul className="space-y-6">
                <li>
                  <a 
                    href="https://github.com/Deep-ak-hub" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex justify-between items-center group/link text-neutral-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-sm font-light">GitHub</span>
                    <span className="text-xs font-mono text-neutral-500 group-hover/link:text-white transition-colors">@Deep-ak-hub</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/deepak-joshi-software-developer/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex justify-between items-center group/link text-neutral-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-sm font-light">LinkedIn</span>
                    <span className="text-xs font-mono text-neutral-500 group-hover/link:text-white transition-colors">in/dipendra-joshi</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+977-9763815817" 
                    className="flex justify-between items-center group/link text-neutral-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-sm font-light">Phone</span>
                    <span className="text-xs font-mono text-neutral-500 group-hover/link:text-white transition-colors">+977 9763815817</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:dipendrajoshi.dev@gmail.com" 
                    className="flex justify-between items-center group/link text-neutral-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-sm font-light">Email</span>
                    <span className="text-xs font-mono text-neutral-500 group-hover/link:text-white transition-colors">dipendrajoshi.dev@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-neutral-500 font-mono tracking-widest mt-12">
              <Star size={10} className="text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>AWWWARDS DESIGN INSPIRED</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[11px] font-mono text-neutral-500 tracking-wider">
          <p>© 2026 DIPENDRA JOSHI. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" onClick={scrollToTop} className="hover:text-white transition-colors">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
