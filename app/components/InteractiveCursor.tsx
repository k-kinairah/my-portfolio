"use client";

import { useEffect, useRef, useState } from "react";

type ClickBurst = {
  id: number;
  x: number;
  y: number;
};

export default function InteractiveCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const targetPointRef = useRef({ x: 0, y: 0 });
  const glowPointRef = useRef({ x: 0, y: 0 });
  const hasPointRef = useRef(false);
  const burstIdRef = useRef(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [bursts, setBursts] = useState<ClickBurst[]>([]);

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncAvailability = () => {
      setIsEnabled(finePointerQuery.matches && !reducedMotionQuery.matches);
    };

    syncAvailability();
    finePointerQuery.addEventListener("change", syncAvailability);
    reducedMotionQuery.addEventListener("change", syncAvailability);

    return () => {
      finePointerQuery.removeEventListener("change", syncAvailability);
      reducedMotionQuery.removeEventListener("change", syncAvailability);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const moveCursor = () => {
      const targetPoint = targetPointRef.current;
      const glowPoint = glowPointRef.current;

      glowPoint.x += (targetPoint.x - glowPoint.x) * 0.28;
      glowPoint.y += (targetPoint.y - glowPoint.y) * 0.28;

      glowRef.current?.style.setProperty("transform", `translate3d(${glowPoint.x}px, ${glowPoint.y}px, 0)`);

      frameRef.current = window.requestAnimationFrame(moveCursor);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetPointRef.current = { x: event.clientX, y: event.clientY };

      if (!hasPointRef.current) {
        glowPointRef.current = { x: event.clientX, y: event.clientY };
        hasPointRef.current = true;
      }

      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(moveCursor);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      setIsPressed(true);

      const burst = {
        id: burstIdRef.current,
        x: event.clientX,
        y: event.clientY,
      };

      burstIdRef.current += 1;
      setBursts((currentBursts) => [...currentBursts, burst]);
      window.setTimeout(() => {
        setBursts((currentBursts) => currentBursts.filter((currentBurst) => currentBurst.id !== burst.id));
      }, 760);
    };

    const onPointerUp = () => {
      setIsPressed(false);
    };

    const onPointerLeave = () => {
      visibleRef.current = false;
      hasPointRef.current = false;
      setIsVisible(false);
      setIsPressed(false);
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerUp);
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      className="interactive-cursor-layer"
      data-visible={isVisible ? "true" : undefined}
      data-pressed={isPressed ? "true" : undefined}
      aria-hidden="true"
    >
      <div ref={glowRef} className="cursor-glow" />
      {bursts.map((burst) => (
        <span key={burst.id} className="cursor-burst" style={{ left: `${burst.x}px`, top: `${burst.y}px` }}>
          <span />
          <span />
          <span />
          <span />
        </span>
      ))}
    </div>
  );
}
