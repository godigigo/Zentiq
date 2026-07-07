"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: "Call your hub office",
    text: "Reach out to our local team and start planning",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.29a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    title: "Speak with moving expert",
    text: "Our specialists answer questions and understand your needs",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    ),
  },
  {
    title: "Receive estimate",
    text: "Our team calculates your move with precision and transparency. No surprises, just honest pricing for your journey.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    ),
  },
  {
    title: "Moving day",
    text: "Your belongings arrive safely and on schedule. We handle the heavy lifting while you settle in with confidence.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 17h4V5H2v12h3" />
        <path d="M14 8h4l4 4v5h-3" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const itemsRef = useRef([]);
  const linesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([introRef.current, headingRef.current, buttonRef.current], {
        y: 20,
        opacity: 0,
      });
      gsap.set(itemsRef.current, { y: 26, opacity: 0 });
      gsap.set(linesRef.current, { scaleY: 0, transformOrigin: "top center" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        defaults: { ease: "power3.out" },
      });

      tl.to(introRef.current, { y: 0, opacity: 1, duration: 0.45 })
        .to(headingRef.current, { y: 0, opacity: 1, duration: 0.72 }, 0.08)
        .to(buttonRef.current, { y: 0, opacity: 1, duration: 0.52 }, 0.16)
        .to(linesRef.current, { scaleY: 1, duration: 0.58, stagger: 0.12 }, 0.18)
        .to(itemsRef.current, { y: 0, opacity: 1, duration: 0.66, stagger: 0.14 }, 0.22);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#ffff] text-black"
    >
      <div className="site-container py-16 md:py-20 xl:py-[80px]">

        {/* Exact 50/50 split matching the Figma design */}
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-2 xl:gap-20">

          {/* Left column */}
          <div className="flex flex-col justify-center">
            <p
              ref={introRef}
              className="text-[13px] font-medium tracking-normal text-black/75"
            >
              Process
            </p>

            <h2
              ref={headingRef}
              className={`${unbounded.className} mt-4 text-[clamp(2.4rem,3.8vw,3.2rem)] font-[400] leading-[1.08] tracking-[-0.035em] text-black`}
            >
              Four steps to your move
            </h2>

            {/* <div ref={buttonRef} className="mt-8 flex items-center gap-4">
              <a
                href="#contact"
                className="inline-flex h-[40px] items-center justify-center rounded-[7px] border border-black/10 bg-[#dff1f5] px-5 text-[14px] font-medium text-black shadow-[0_1px_0_rgba(0,0,0,0.04),0_6px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-white"
              >
                Learn
              </a>

              <a
                href="#contact"
                aria-label="Next"
                className="inline-flex h-[40px] w-[40px] items-center justify-center text-black transition-transform duration-300 hover:translate-x-1"
              >
                <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              </a>
            </div> */}
          </div>

          {/* Right column */}
          <div>
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                ref={(el) => (itemsRef.current[index] = el)}
                className="grid grid-cols-[32px_1fr] gap-x-5 pb-8 last:pb-0 md:gap-x-6"
              >
                {/* Icon + line */}
                <div className="flex flex-col items-center">
                  <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center text-black">
                    {step.icon}
                  </div>
                  {index !== STEPS.length - 1 && (
                    <span
                      ref={(el) => (linesRef.current[index] = el)}
                      className="mt-3 block h-[56px] w-px bg-black/12"
                    />
                  )}
                </div>

                {/* Text */}
                <div className="pb-1">
                  <h3
                    className={`${unbounded.className} text-[clamp(1.4rem,1.7vw,1.75rem)] font-[400] leading-[1.1] tracking-[-0.03em] text-black`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[460px] text-[14px] leading-[1.55] text-black/65 md:text-[15px]">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}