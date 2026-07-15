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
    let splitInstance;

    const ctx = gsap.context(() => {
      splitInstance = new SplitText(headingRef.current, {
        type: "lines",
        linesClass: "hero-line",
      });

      splitInstance.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.className = "hero-line-mask";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set(splitInstance.lines, { yPercent: 110, opacity: 0 });
      gsap.set(bgRef.current, { scale: 1.05 });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(btnsRef.current, { y: 22, opacity: 0 });
      gsap.set(copyRef.current, { y: 18, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(bgRef.current, { scale: 1, duration: 1.9, ease: "expo.out" })
        .to(overlayRef.current, { opacity: 1, duration: 1.05 }, 0)
        .to(
          splitInstance.lines,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.95,
            ease: "power4.out",
          },
          0.18,
        )
        .to(btnsRef.current, { y: 0, opacity: 1, duration: 0.65 }, 0.62)
        .to(copyRef.current, { y: 0, opacity: 1, duration: 0.65 }, 0.8);

      gsap.to(bgRef.current, {
        y: -16,
        duration: 7.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    const enterHandlers = [];
    const leaveHandlers = [];

    buttons.forEach((btn, i) => {
      enterHandlers[i] = () =>
        gsap.to(btn, {
          y: -2,
          scale: 1.02,
          duration: 0.22,
          ease: "power2.out",
        });

      leaveHandlers[i] = () =>
        gsap.to(btn, {
          y: 0,
          scale: 1,
          duration: 0.22,
          ease: "power2.out",
        });

      btn.addEventListener("mouseenter", enterHandlers[i]);
      btn.addEventListener("mouseleave", leaveHandlers[i]);
    });

    return () => {
      buttons.forEach((btn, i) => {
        btn.removeEventListener("mouseenter", enterHandlers[i]);
        btn.removeEventListener("mouseleave", leaveHandlers[i]);
      });

      if (splitInstance) splitInstance.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white"
    >
      <style jsx>{`
        .hero-line-mask {
          overflow: hidden;
          padding-block: 0.08em;
        }
      `}</style>

      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: "url('/hero.png')" }}
      />

      {/* Gradient overlays */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(105deg, rgba(5,12,22,0.76) 0%, rgba(5,12,22,0.46) 35%, rgba(5,12,22,0.12) 62%, rgba(5,12,22,0.10) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.00) 40%, rgba(0,0,0,0.18) 78%, rgba(0,0,0,0.42) 100%)
          `,
        }}
      />

      {/* CONTENT — single responsive layout for all breakpoints */}
      <div className="relative z-10 flex min-h-[100svh] w-full flex-col justify-between px-4 pb-8 pt-24 sm:px-6 sm:pt-28 md:pb-24 md:pt-[110px] lg:px-10 lg:pt-[120px]">
        {/* Top / main content */}
        <div className="mx-auto w-full max-w-[1440px] flex-1 md:flex md:flex-col md:justify-center">
          <div className="w-full max-w-[92%] sm:max-w-[420px] md:max-w-[560px] lg:max-w-[640px]">
            <p className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/50 sm:mb-4 sm:text-[11px] sm:tracking-[0.18em] md:mb-5 md:text-white/55">
              <span className="inline-block h-px w-5 bg-[#004FEC]/55 sm:w-6 sm:bg-[#004FEC]/60" />
              Canada&apos;s Trusted Movers
            </p>

            <h1
              ref={headingRef}
              className={`${unbounded.className} text-[clamp(2.25rem,8vw,5rem)] font-[400] leading-[1.05] tracking-[-0.03em] text-white sm:leading-[1.03] md:leading-[1.02] md:tracking-[-0.045em]`}
            >
              Moving made simple and reliable across Canada
            </h1>

            <div
              ref={btnsRef}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4 md:mt-10 md:gap-5"
            >
              <a
                href="/book-appointment"
                data-cta
                className="inline-flex h-[42px] items-center justify-center rounded-[9px] bg-[#004FEC] px-5 text-[12px] font-semibold text-[#07111d] shadow-[0_0_0_1px_rgba(34,211,238,0.3),0_6px_20px_rgba(34,211,238,0.3)] transition-colors duration-200 hover:bg-[#0047D4] sm:h-[44px] sm:px-5 sm:text-[13px] md:h-[46px] md:px-6 md:shadow-[0_0_0_1px_rgba(34,211,238,0.3),0_8px_28px_rgba(34,211,238,0.32)]"
              >
                Get Quote
              </a>

              <a
                href="/about"
                data-cta
                className="group inline-flex h-[42px] items-center justify-center gap-[5px] text-[13px] font-medium text-white/75 transition-colors duration-200 hover:text-white sm:h-[44px] sm:text-[14px] md:h-[46px] md:gap-[6px]"
              >
                Learn more
                <svg
                  viewBox="0 0 16 16"
                  className="h-[12px] w-[12px] transition-transform duration-200 group-hover:translate-x-[3px] sm:h-[13px] sm:w-[13px]"
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

        {/* Bottom copy — left aligned on mobile/tablet, right aligned on desktop */}
        <div className="mx-auto flex w-full max-w-[1440px] justify-start pt-8 md:justify-end md:pt-0">
          <p
            ref={copyRef}
            className="max-w-[280px] text-[13px] leading-[1.75] text-white/68 sm:max-w-[320px] sm:text-[15px] sm:leading-[1.78] md:max-w-[340px] md:text-[16px] md:leading-[1.8] lg:text-[17px]"
          >
            We handle every detail of your move with care and precision. From
            local relocations to cross-country journeys, trust us to deliver
            your belongings safely and on time.
          </p>
        </div>
      </div>
    </section>
  );
}
