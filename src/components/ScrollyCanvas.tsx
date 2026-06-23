"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring, useMotionValueEvent, useTransform } from "framer-motion";
import Overlay from "./Overlay";

/** Scroll runway height — controls how far you scroll through the hero animation */
const HERO_SCROLL_VH = 350;

export default function ScrollyCanvas() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHeroPinned, setIsHeroPinned] = useState(true);

  const activeFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sentinelRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 45,
    stiffness: 150,
    restDelta: 0.0001,
  });

  // Finish frame animation at ~82% of hero scroll; last stretch is handoff only
  const animationProgress = useTransform(smoothProgress, [0, 0.82], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsHeroPinned(latest < 0.998);
  });

  const drawImageCover = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = ctx.canvas;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const wr = canvasWidth / imgWidth;
    const hr = canvasHeight / imgHeight;
    const ratio = Math.max(wr, hr);

    const newWidth = imgWidth * ratio;
    const newHeight = imgHeight * ratio;
    const x = (canvasWidth - newWidth) / 2;
    const y = (canvasHeight - newHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight, x, y, newWidth, newHeight);
  }, []);

  const renderFrame = useCallback((index: number, framesList: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    if (!canvas || framesList.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const safeIndex = Math.min(framesList.length - 1, Math.max(0, index));
    const img = framesList[safeIndex];
    if (img && img.complete) {
      drawImageCover(ctx, img);
    }
  }, [drawImageCover]);

  useEffect(() => {
    let isMounted = true;

    const generateFallbackFiles = () => {
      const TOTAL_FRAMES = 144;
      return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        const num = i.toString().padStart(3, "0");
        return `frame_${num}_delay-0.041s.webp`;
      });
    };

    const startPreload = (files: string[]) => {
      if (files.length === 0) {
        console.error("No image frames found.");
        return;
      }

      let loadedCount = 0;
      const loadedImages: HTMLImageElement[] = [];

      const onLoad = () => {
        if (!isMounted) return;
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / files.length) * 100));
        if (loadedCount === files.length) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      const onError = (e: string | Event, file: string) => {
        console.error(`Failed to load image frame: /sequence/${file}`, e);
        if (!isMounted) return;
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / files.length) * 100));
        if (loadedCount === files.length) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      for (let i = 0; i < files.length; i++) {
        const img = new Image();
        img.src = `/sequence/${files[i]}`;
        img.onload = onLoad;
        img.onerror = (e) => onError(e, files[i]);
        loadedImages.push(img);
      }
    };

    fetch("/api/sequence")
      .then((res) => {
        if (!res.ok) throw new Error("API returned non-200 status");
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        const files: string[] = data.files || [];
        if (files.length === 0) {
          startPreload(generateFallbackFiles());
        } else {
          startPreload(files);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch sequence API, using client fallback:", err);
        if (isMounted) {
          startPreload(generateFallbackFiles());
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useMotionValueEvent(animationProgress, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;
    const framesCount = images.length;
    const startFrame = Math.floor(framesCount / 2); // Start from middle frame (~72)
    const remainingFrames = framesCount - startFrame;
    // Use smoother frame transition with proper rounding
    const frameIndex = Math.min(
      framesCount - 1,
      startFrame + Math.round(latest * remainingFrames)
    );
    activeFrameRef.current = frameIndex;
    renderFrame(frameIndex, images);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      if (isLoaded && images.length > 0) {
        renderFrame(activeFrameRef.current, images);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, images, renderFrame]);

  useEffect(() => {
    if (isLoaded && images.length > 0) {
      const startFrame = Math.floor(images.length / 2); // Start from middle frame (~72)
      renderFrame(startFrame, images);
    }
  }, [isLoaded, images, renderFrame]);

  return (
    <>
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212] transition-opacity duration-700">
          <div className="flex flex-col items-center max-w-xs w-full px-6">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8 animate-pulse font-medium">
              Warm Welcome to You
            </h2>
            <div className="relative w-full h-[2px] bg-white/10 overflow-hidden rounded-full mb-4">
              <div
                className="absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="text-white font-mono text-sm tracking-wider tabular-nums">
              {loadingProgress.toString().padStart(3, "0")}%
            </div>
          </div>
        </div>
      )}

      {/* Scroll sentinel — fixed canvas stays on screen for the full height of this block */}
      <div
        ref={sentinelRef}
        className="relative w-full bg-[#121212]"
        style={{ height: `${HERO_SCROLL_VH}svh` }}
      >
        <div
          className={`w-full overflow-hidden z-10 transition-none ${
            isHeroPinned
              ? "fixed top-0 left-0 right-0 h-[100svh]"
              : "relative h-0 opacity-0 pointer-events-none"
          }`}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: isLoaded ? 1 : 0 }}
          />

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#121212] via-[#121212]/20 to-[#121212]/50" />
          <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[#121212] via-[#121212]/95 to-transparent" />

          {isLoaded && <Overlay scrollProgress={smoothProgress} />}
        </div>
      </div>
    </>
  );
}
