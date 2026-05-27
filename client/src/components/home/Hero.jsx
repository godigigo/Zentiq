"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const headingRef = useRef(null);
  const btnsRef = useRef(null);
  const copyRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const buttons = hero.querySelectorAll("[data-cta]");

    const ctx = gsap.context(() => {
      const split = new SplitText(headingRef.current, {
        type: "lines",
        linesClass: "line-wrap",
      });

      // Wrap each line in a clip container
      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set(split.lines, { y: "110%", opacity: 0 });
      gsap.set(bgRef.current, { scale: 1.06 });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(btnsRef.current, { y: 22, opacity: 0 });
      gsap.set(copyRef.current, { y: 16, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(bgRef.current, { scale: 1, duration: 1.9, ease: "expo.out" })
        .to(overlayRef.current, { opacity: 1, duration: 1.1 }, 0)
        .to(
          split.lines,
          { y: "0%", opacity: 1, stagger: 0.09, duration: 1.0 },
          0.18
        )
        .to(btnsRef.current, { y: 0, opacity: 1, duration: 0.65 }, 0.62)
        .to(copyRef.current, { y: 0, opacity: 1, duration: 0.65 }, 0.80);

      // Slow float parallax
      gsap.to(bgRef.current, {
        y: -16,
        duration: 7.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      return () => split.revert();
    }, heroRef);

    // Button micro-interactions
    const enterHandlers = [];
    const leaveHandlers = [];
    buttons.forEach((btn, i) => {
      enterHandlers[i] = () =>
        gsap.to(btn, { y: -2, scale: 1.02, duration: 0.22, ease: "power2.out" });
      leaveHandlers[i] = () =>
        gsap.to(btn, { y: 0, scale: 1, duration: 0.22, ease: "power2.out" });
      btn.addEventListener("mouseenter", enterHandlers[i]);
      btn.addEventListener("mouseleave", leaveHandlers[i]);
    });

    return () => {
      buttons.forEach((btn, i) => {
        btn.removeEventListener("mouseenter", enterHandlers[i]);
        btn.removeEventListener("mouseleave", leaveHandlers[i]);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-black text-white"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      {/* Gradient overlays */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(105deg, rgba(5,12,22,0.72) 0%, rgba(5,12,22,0.42) 35%, rgba(5,12,22,0.10) 62%, rgba(5,12,22,0.08) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.00) 40%, rgba(0,0,0,0.18) 78%, rgba(0,0,0,0.38) 100%)
          `,
        }}
      />

      {/* ── DESKTOP ── */}
      <div className="relative z-10 hidden h-full md:flex md:flex-col md:justify-between">

        {/* Top area — heading + buttons, respects site-container */}
        <div className="site-container flex flex-1 flex-col justify-center pb-[80px]">
          <div className="max-w-[520px]">

            {/* Eyebrow label */}
            <p className="mb-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
              <span className="inline-block h-px w-6 bg-[#22D3EE]/60" />
              Canada's Trusted Movers
            </p>

            <h1
              ref={headingRef}
              className={`${unbounded.className} text-[clamp(3rem,4.2vw,4.8rem)] font-[400] leading-[0.92] tracking-[-0.04em] text-white`}
            >
              Moving made simple and reliable across Canada
            </h1>

            <div ref={btnsRef} className="mt-9 flex items-center gap-5">
              <a
                href="#contact"
                data-cta
                className="inline-flex h-[44px] items-center justify-center rounded-[9px] bg-[#22D3EE] px-6 text-[13px] font-semibold text-[#07111d] shadow-[0_0_0_1px_rgba(34,211,238,0.3),0_8px_28px_rgba(34,211,238,0.32)] transition-colors duration-200 hover:bg-[#38e4f7]"
              >
                Get Quote
              </a>
              <a
                href="#services"
                data-cta
                className="group inline-flex h-[44px] items-center justify-center gap-[6px] text-[13px] font-medium text-white/70 transition-colors duration-200 hover:text-white"
              >
                Learn more
                <svg
                  viewBox="0 0 16 16"
                  className="h-[13px] w-[13px] transition-transform duration-200 group-hover:translate-x-[3px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar — copy text pinned to bottom right */}
        <div className="site-container flex justify-end pb-[52px]">
          <p
            ref={copyRef}
            className="w-[280px] text-[14px] leading-[1.72] text-white/55"
          >
            We handle every detail of your move with care and precision.
            From local relocations to cross-country journeys, trust us to
            deliver your belongings safely and on time.
          </p>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-10 pt-24 sm:px-6 md:hidden">
        <div className="max-w-[310px]">

          <p className="mb-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
            <span className="inline-block h-px w-5 bg-[#22D3EE]/55" />
            Canada's Trusted Movers
          </p>

          <h1
            className={`${unbounded.className} text-[clamp(2.5rem,10vw,4rem)] font-[400] leading-[0.92] tracking-[-0.04em] text-white`}
          >
            Moving made simple and reliable across Canada
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              data-cta
              className="inline-flex h-[42px] items-center justify-center rounded-[9px] bg-[#22D3EE] px-5 text-[13px] font-semibold text-[#07111d] shadow-[0_6px_20px_rgba(34,211,238,0.28)]"
            >
              Get Quote
            </a>
            <a
              href="#services"
              data-cta
              className="inline-flex h-[42px] items-center justify-center gap-[5px] text-[13px] font-medium text-white/72"
            >
              Learn more
              <svg viewBox="0 0 16 16" className="h-[12px] w-[12px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>

        <p className="max-w-[265px] text-[12px] leading-[1.68] text-white/55">
          We handle every detail of your move with care and precision. From
          local relocations to cross-country journeys, trust us to deliver
          your belongings safely and on time.
        </p>
      </div>
    </section>
  );
}