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
          0.18
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
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
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
        style={{ backgroundImage: "url('/hero-bg1.jpeg')" }}
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

      {/* DESKTOP */}
      <div className="relative z-10 hidden min-h-screen md:flex md:flex-col md:justify-between">
        <div className="site-container flex flex-1 flex-col justify-center pt-[120px] pb-[96px]">
          <div className="max-w-[640px]">
            <p className="mb-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
              <span className="inline-block h-px w-6 bg-[#004FEC]/60" />
              Canada&apos;s Trusted Movers
            </p>

            <h1
              ref={headingRef}
              className={`${unbounded.className} text-[clamp(3rem,4.4vw,5rem)] font-[400] leading-[1.02] tracking-[-0.045em] text-white`}
            >
              Moving made simple and reliable across Canada
            </h1>

            <div ref={btnsRef} className="mt-10 flex items-center gap-5">
              <a
                href="/book-appointment"
                data-cta
                className="inline-flex h-[46px] items-center justify-center rounded-[10px] bg-[#004FEC] px-6 text-[13px] font-semibold text-[#07111d] shadow-[0_0_0_1px_rgba(34,211,238,0.3),0_8px_28px_rgba(34,211,238,0.32)] transition-colors duration-200 hover:bg-[#0047D4]"
              >
                Get Quote
              </a>

              <a
                href="/about"
                data-cta
                className="group inline-flex h-[46px] items-center justify-center gap-[6px] text-[14px] font-medium text-white/75 transition-colors duration-200 hover:text-white"
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

        <div className="site-container flex justify-end pb-[58px]">
          <p
            ref={copyRef}
            className="w-[340px] text-[16px] leading-[1.8] text-white/68 md:text-[17px]"
          >
            We handle every detail of your move with care and precision. From
            local relocations to cross-country journeys, trust us to deliver
            your belongings safely and on time.
          </p>
        </div>
      </div>

      {/* MOBILE */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-5 pb-10 pt-28 sm:px-6 md:hidden">
        <div className="max-w-[340px]">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
            <span className="inline-block h-px w-5 bg-[#004FEC]/55" />
            Canada&apos;s Trusted Movers
          </p>

          <h1
            className={`${unbounded.className} text-[clamp(2.65rem,10vw,4rem)] font-[400] leading-[1.02] tracking-[-0.045em] text-white`}
          >
            Moving made simple and reliable across Canada
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="book-appointment"
              data-cta
              className="inline-flex h-[44px] items-center justify-center rounded-[9px] bg-[#004FEC] px-5 text-[13px] font-semibold text-[#07111d] shadow-[0_6px_20px_rgba(34,211,238,0.28)]"
            >
              Get Quote
            </a>

            <a
              href="/about"
              data-cta
              className="inline-flex h-[44px] items-center justify-center gap-[5px] text-[14px] font-medium text-white/75"
            >
              Learn more
              <svg
                viewBox="0 0 16 16"
                className="h-[12px] w-[12px]"
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

        <p className="max-w-[300px] text-[14px] leading-[1.78] text-white/68 sm:text-[15px]">
          We handle every detail of your move with care and precision. From
          local relocations to cross-country journeys, trust us to deliver your
          belongings safely and on time.
        </p>
      </div>
    </section>
  );
}
