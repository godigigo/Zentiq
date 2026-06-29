"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(SplitText, ScrollTrigger);

const TruckScene = lazy(() => import("./TruckScene"));

const STATS = [
  { value: "12K+", label: "Moves completed" },
  { value: "98%", label: "On-time delivery" },
  { value: "4.9★", label: "Client rating" },
];

const BADGES = [
  { icon: "🛡️", label: "Fully insured" },
  { icon: "📍", label: "Pan-Canada" },
  { icon: "🚛", label: "10k+ moves" },
  { icon: "⭐", label: "4.9 / 5" },
];

export default function Hero() {
  const wrapperRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const btnsRef = useRef(null);
  const badgesRef = useRef(null);
  const statsRef = useRef(null);
  const scrollHint = useRef(null);
  const progressRef = useRef(null);

  const [canvasReady, setCanvasReady] = useState(false);
  useEffect(() => setCanvasReady(true), []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanupFns = [];

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const total = wrapper.offsetHeight - window.innerHeight;
      const prog = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${prog})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    cleanupFns.push(() => window.removeEventListener("scroll", onScroll));

    if (reduceMotion) {
      [headingRef, subRef, btnsRef, badgesRef, statsRef]
        .map((r) => r.current)
        .filter(Boolean)
        .forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
      onScroll();
      return () => cleanupFns.forEach((fn) => fn());
    }

    const ctx = gsap.context(() => {
      let split = null;

      if (headingRef.current) {
        split = new SplitText(headingRef.current, {
          type: "lines",
          linesClass: "h-line",
        });

        split.lines.forEach((line) => {
          const mask = document.createElement("div");
          mask.className = "h-mask";
          line.parentNode.insertBefore(mask, line);
          mask.appendChild(line);
        });

        gsap.set(split.lines, { yPercent: 110, opacity: 0 });
      }

      gsap.set(
        [subRef.current, btnsRef.current, badgesRef.current, statsRef.current].filter(Boolean),
        { y: 22, opacity: 0 }
      );

      const entrance = gsap.timeline({ delay: 0.25, defaults: { ease: "power4.out" } });

      if (split?.lines?.length) {
        entrance.to(split.lines, { yPercent: 0, opacity: 1, stagger: 0.1, duration: 1.0 }, 0);
      }

      entrance
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.45)
        .to(btnsRef.current, { y: 0, opacity: 1, duration: 0.72 }, 0.58)
        .to(badgesRef.current, { y: 0, opacity: 1, duration: 0.72 }, 0.7)
        .to(statsRef.current, { y: 0, opacity: 1, duration: 0.72 }, 0.82);

      const textEls = [
        headingRef.current,
        subRef.current,
        btnsRef.current,
        badgesRef.current,
        statsRef.current,
      ].filter(Boolean);

      const textTween = gsap.to(textEls, {
        yPercent: -35,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=120%",
          scrub: true,
        },
      });

      let hintTween = null;
      if (scrollHint.current) {
        hintTween = gsap.to(scrollHint.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=28%",
            scrub: true,
          },
        });
      }

      const ctas = wrapper.querySelectorAll("[data-cta]");
      ctas.forEach((el) => {
        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          gsap.to(el, {
            x: (e.clientX - r.left - r.width / 2) * 0.22,
            y: (e.clientY - r.top - r.height / 2) * 0.28,
            scale: 1.03,
            duration: 0.24,
            ease: "power2.out",
          });
        };

        const onLeave = () =>
          gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.38, ease: "power3.out" });

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);

        cleanupFns.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });

      ScrollTrigger.refresh();

      cleanupFns.push(() => {
        textTween.scrollTrigger?.kill();
        textTween.kill();
        hintTween?.scrollTrigger?.kill();
        hintTween?.kill();
      });
    }, wrapper);

    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      onScroll();
    }, 60);

    cleanupFns.push(() => window.clearTimeout(id));

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
      split?.revert?.();
    };
  }, []);

  return (
    <>
      <style>{`
        .h-mask { overflow: hidden; padding-block: 0.05em; }
        .h-line { will-change: transform, opacity; }
        @keyframes hint-bob {
          0%,100% { transform: translateX(-50%) translateY(0); opacity: 0.72; }
          50% { transform: translateX(-50%) translateY(8px); opacity: 0.26; }
        }
      `}</style>

      <div
        ref={progressRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "#004FEC",
          transformOrigin: "left",
          transform: "scaleX(0)",
          zIndex: 100,
          boxShadow: "0 0 8px #004FEC",
        }}
      />

      <div ref={wrapperRef} style={{ height: "300vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden",
            background:
              "radial-gradient(ellipse 130% 85% at 55% 40%, #091428 0%, #020508 100%)",
          }}
        >
          {canvasReady && (
            <Suspense fallback={null}>
              <div style={{ position: "absolute", inset: 0 }}>
                <TruckScene scrollerRef={wrapperRef} />
              </div>
            </Suspense>
          )}

          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "linear-gradient(to top, rgba(2,5,8,0.88) 0%, transparent 32%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: "linear-gradient(to bottom, rgba(2,5,8,0.58) 0%, transparent 20%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(95deg, rgba(3,10,24,0.84) 0%, rgba(3,10,24,0.46) 36%, transparent 62%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 clamp(22px, 6vw, 96px)",
              pointerEvents: "none",
            }}
          >
            <p
              style={{
                marginBottom: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "#004FEC",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 28,
                  height: 1,
                  background: "#004FEC",
                  boxShadow: "0 0 6px #004FEC",
                }}
              />
              Canada&apos;s Trusted Movers
            </p>

            <h1
              ref={headingRef}
              className={unbounded.className}
              style={{
                fontSize: "clamp(2.6rem, 5vw, 5.4rem)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.045em",
                color: "#ffffff",
                maxWidth: 660,
                margin: 0,
                textShadow: "0 2px 40px rgba(0,0,0,0.55)",
              }}
            >
              Moving made simple across Canada
            </h1>

            <p
              ref={subRef}
              style={{
                marginTop: "1.45rem",
                fontSize: "clamp(14px, 1.3vw, 16px)",
                lineHeight: 1.82,
                color: "rgba(255,255,255,0.56)",
                maxWidth: 430,
                opacity: 0,
              }}
            >
              From a single room to a full cross-country haul — real-time
              tracking, insured cargo, and a dedicated crew from door to door.
            </p>

            <div
              ref={btnsRef}
              style={{
                marginTop: "2.25rem",
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                alignItems: "center",
                pointerEvents: "all",
                opacity: 0,
              }}
            >
              <Link
                href="/book-appointment"
                data-cta
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 50,
                  padding: "0 30px",
                  borderRadius: 11,
                  background: "#004FEC",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  boxShadow: "0 0 0 1px rgba(0,79,236,0.55), 0 8px 32px rgba(0,79,236,0.42)",
                  transition: "background 0.2s",
                }}
              >
                Get Free Quote
              </Link>

              <Link
                href="/about"
                data-cta
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  height: 50,
                  padding: "0 6px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.67)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                How it works
                <svg
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            </div>

            <div
              ref={badgesRef}
              style={{
                marginTop: "2rem",
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                opacity: 0,
              }}
            >
              {BADGES.map((b) => (
                <span
                  key={b.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 13px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.56)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {b.icon} {b.label}
                </span>
              ))}
            </div>

            <div
              ref={statsRef}
              style={{
                marginTop: "3rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0 40px",
                opacity: 0,
              }}
            >
              {STATS.map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span
                    className={unbounded.className}
                    style={{
                      fontSize: "clamp(1.7rem,2.4vw,2.1rem)",
                      fontWeight: 400,
                      lineHeight: 1,
                      color: "#fff",
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      color: "rgba(255,255,255,0.38)",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={scrollHint}
            style={{
              position: "absolute",
              bottom: 32,
              left: "50%",
              zIndex: 10,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              animation: "hint-bob 2.4s ease-in-out infinite",
            }}
          >
            <span
              style={{
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.38)",
              }}
            >
              Scroll
            </span>
            <svg
              viewBox="0 0 16 16"
              width="11"
              height="11"
              fill="none"
              stroke="rgba(255,255,255,0.38)"
              strokeWidth="1.6"
            >
              <path d="M3 6l5 5 5-5" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}