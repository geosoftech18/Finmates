"use client";
import { useEffect, useRef } from "react";

export default function MagneticCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current!;
    const inner = innerRef.current!;

    let mouseX = 0,
      mouseY = 0;
    let outerX = 0,
      outerY = 0;

    // Dot follows instantly
    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      inner.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    // Circle follows smoothly
    const animate = () => {
      outerX += (mouseX - outerX) * 0.15;
      outerY += (mouseY - outerY) * 0.15;
      outer.style.transform = `translate(${outerX}px, ${outerY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };

    // Expand circle on click
    const handleClick = () => {
      outer.animate(
        [
          { width: "48px", height: "48px" },
          { width: "70px", height: "70px" },
          { width: "48px", height: "48px" },
        ],
        {
          duration: 300,
          easing: "ease-out",
        }
      );
    };

    // Hover effect for interactive elements
    const addHoverEffects = () => {
      const targets = document.querySelectorAll("a, button, .cursor-hover");
      targets.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          outer.style.transition = "all 0.2s ease-out";
          outer.style.width = "70px";
          outer.style.height = "70px";
          outer.style.borderColor = "#007BFF";
          outer.style.backgroundColor = "rgba(0,123,255,0.1)";
        });
        el.addEventListener("mouseleave", () => {
          outer.style.width = "48px";
          outer.style.height = "48px";
          outer.style.backgroundColor = "transparent";
        });
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("click", handleClick);
    addHoverEffects();
    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {/* Outer Circle (follower) */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-blue-500 rounded-full pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>

      {/* Inner Dot (precise cursor) */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-blue-500 rounded-full pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
