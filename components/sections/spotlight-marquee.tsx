"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

/**
 * 鼠标在卡片上时跟随的 spotlight / 3D tilt 动效。
 * 通过 transform-style: preserve-3d 让鼠标交互与子元素的浮动一致。
 */
type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  /** 最大倾斜角度（度） */
  maxTilt?: number;
  /** spotlight 颜色 */
  glow?: string;
};

export default function SpotlightCard({
  children,
  className,
  maxTilt = 6,
  glow = "rgba(37,99,235,0.18)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const node = ref.current;
    const inner = innerRef.current;
    if (!mounted || !node || !inner || reducedMotion) return;

    const handleMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width;
      const relativeY = (event.clientY - rect.top) / rect.height;
      const rotateY = (relativeX - 0.5) * 2 * maxTilt;
      const rotateX = -(relativeY - 0.5) * 2 * maxTilt;

      gsap.to(inner, {
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformOrigin: "center center",
        duration: 0.4,
        ease: "power3.out",
      });

      node.style.setProperty("--spot-x", `${relativeX * 100}%`);
      node.style.setProperty("--spot-y", `${relativeY * 100}%`);
    };

    const handleLeave = () => {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    node.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", handleLeave);
    return () => {
      node.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, [maxTilt, mounted, reducedMotion]);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative isolate overflow-hidden border border-blue-100 bg-white transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(37,99,235,0.12)]",
        className
      )}
      style={{
        ["--spot-x" as string]: "50%",
        ["--spot-y" as string]: "50%",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--spot-x) var(--spot-y), ${glow}, transparent 55%)`,
        }}
      />
      <div ref={innerRef} className="relative h-full w-full">
        {children}
      </div>
    </div>
  );
}
