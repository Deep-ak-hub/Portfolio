"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

// Helper function to generate random entry animation
const getRandomAnimation = (idx: number) => {
  const directions = [
    { x: 100, y: -100 },    // top-right
    { x: -100, y: -100 },   // top-left
    { x: 100, y: 100 },     // bottom-right
    { x: -100, y: 100 },    // bottom-left
    { x: 150, y: 0 },       // right
    { x: -150, y: 0 },      // left
  ];
  
  // Use index to create pseudo-randomness but ensure consistency
  const direction = directions[idx % directions.length];
  const rotation = (idx % 3) * 5 - 5; // Range: -5 to 5 degrees
  
  return {
    initial: { 
      opacity: 0, 
      x: direction.x, 
      y: direction.y,
      rotate: rotation
    },
    animate: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      rotate: 0
    }
  };
};

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  glowColor: string; // RGB color for radial tracking glow
  link: string;
}

const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Multi-Vendor E-Commerce Platform",
    category: "Full Stack / E-Commerce",
    description: "End-to-end e-commerce system with React/TypeScript admin dashboard, Node.js/Express API, three-tier JWT/RBAC auth layer, Redis caching, and Cloudinary image management. Architected vendor onboarding, product catalogue, and complete order lifecycle.",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Redis", "JWT", "RBAC"],
    gradient: "from-indigo-500/20 via-purple-500/5 to-transparent",
    glowColor: "99, 102, 241", // indigo
    link: "https://github.com/Deep-ak-hub",
  },
  {
    id: "project-2",
    title: "Lead Management System",
    category: "Backend / API",
    description: "RESTful Node.js/Express API for lead pipeline management with RBAC enforcement, thin controllers, isolated service classes, and dependency inversion throughout. Ensures admins and super admins operate within strict permission scopes.",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "RBAC", "Express Validator"],
    gradient: "from-cyan-500/20 via-blue-500/5 to-transparent",
    glowColor: "6, 182, 212", // cyan
    link: "https://github.com/Deep-ak-hub",
  },
  {
    id: "project-3",
    title: "Full Stack Development",
    category: "MERN Stack / Production",
    description: "Production-grade web applications with TypeScript, component-driven UIs using React Hook Form and Zod validation, clean architecture, and comprehensive backend APIs. Expertise in authentication, error handling, and API design.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Vite"],
    gradient: "from-emerald-500/20 via-teal-500/5 to-transparent",
    glowColor: "16, 185, 129", // emerald
    link: "https://github.com/Deep-ak-hub",
  },
  {
    id: "project-4",
    title: "Client Project Solutions",
    category: "Agency / Multiple Clients",
    description: "Contributed to diverse client-facing projects at Kitwosd IT Support Center. Full-stack feature development, debugging integration issues, and iterative feature delivery across concurrent projects. Proficient in MERN stack and modern tooling.",
    tags: ["MERN Stack", "Git", "Postman", "VS Code", "TypeScript", "Tailwind CSS"],
    gradient: "from-rose-500/20 via-orange-500/5 to-transparent",
    glowColor: "244, 63, 94", // rose
    link: "https://github.com/Deep-ak-hub",
  },
];

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const animation = getRandomAnimation(idx);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={animation.initial}
      whileInView={animation.animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card group relative p-8 md:p-12 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[400px] border border-white/[0.04] hover:border-white/10"
    >
      {/* Static background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none`} />
      
      {/* Interactive Cursor-Tracking Radial Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(${project.glowColor}, 0.12), transparent 50%)`
        }}
      />

      {/* Top Details */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
            {project.category}
          </span>
          <a 
            href={project.link}
            className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-neutral-400 hover:text-white"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4 group-hover:text-indigo-300 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed mb-8 max-w-lg">
          {project.description}
        </p>
      </div>

      {/* Bottom Tags & Interaction */}
      <div className="relative z-10 mt-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2.5 py-1 text-[10px] font-mono tracking-wider rounded-md bg-white/5 border border-white/5 text-neutral-400 group-hover:border-white/10 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <a 
          href={project.link} 
          className="inline-flex items-center text-xs tracking-[0.2em] font-medium text-white group/btn"
        >
          VIEW CASE STUDY 
          <ArrowRight size={14} className="ml-2 transform group-hover/btn:translate-x-1.5 transition-transform duration-300 text-indigo-400" />
        </a>
      </div>
    </motion.div>
  );
}

interface ProjectsProps {
  className?: string;
}

export default function Projects({ className = "" }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "start 10%"],
  });

  // Animate the heading elements as section comes into view
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const tagY = useTransform(scrollYProgress, [0, 0.3], [15, 0]);
  const tagOpacity = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className={`relative pt-8 md:pt-12 pb-32 px-6 bg-gradient-to-b from-[#121212]/0 via-[#121212]/50 to-[#121212] overflow-hidden z-20 scroll-mt-24 ${className}`}
    >

      {/* Visual Accent Glows in background — more subtle */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/4 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/3 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Heading — appears as canvas scrolls away */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-[25svh] md:pt-[30svh]">
          <div>
            <motion.span 
              style={{ opacity: tagOpacity, y: tagY }}
              className="text-xs font-mono text-indigo-400 tracking-[0.3em] uppercase block mb-3"
            >
              Selected Works
            </motion.span>
            <motion.h2 
              style={{ opacity: headingOpacity, y: headingY }}
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-white glow-text"
            >
              CRAFTING INTERACTIVE PRODUCTS
            </motion.h2>
          </div>
          <motion.p 
            style={{ opacity: headingOpacity, y: headingY }}
            className="text-sm text-neutral-500 font-light max-w-xs md:text-right leading-relaxed"
          >
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
