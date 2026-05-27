"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const taglineRef = useRef(null);
  const headingRef = useRef(null);
  const bodyWrapRef = useRef(null);
  const btnWrapRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(headingRef.current, {
        type: "lines",
        linesClass: "about-line",
      });

      split.lines.forEach((line) => {
        const wrap = document.createElement("div");
        wrap.style.overflow = "hidden";
        line.parentNode.insertBefore(wrap, line);
        wrap.appendChild(line);
      });

      gsap.set(taglineRef.current, { x: -16, opacity: 0 });
      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(split.lines, { yPercent: 110, opacity: 0 });
      gsap.set(bodyWrapRef.current, { y: 20, opacity: 0 });
      gsap.set(btnWrapRef.current, { y: 14, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 74%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(taglineRef.current, { x: 0, opacity: 1, duration: 0.45 })
        .to(
          lineRef.current,
          { scaleX: 1, duration: 0.5, ease: "power2.out" },
          0.05
        )
        .to(
          split.lines,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.82,
          },
          0.14
        )
        .to(bodyWrapRef.current, { y: 0, opacity: 1, duration: 0.62 }, 0.34)
        .to(btnWrapRef.current, { y: 0, opacity: 1, duration: 0.5 }, 0.48);

      gsap.to(bgRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    const btn = btnWrapRef.current?.querySelector("[data-btn]");
    let enter;
    let leave;

    if (btn) {
      enter = () =>
        gsap.to(btn, {
          y: -2,
          scale: 1.02,
          duration: 0.2,
          ease: "power2.out",
        });

      leave = () =>
        gsap.to(btn, {
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });

      btn.addEventListener("mouseenter", enter);
      btn.addEventListener("mouseleave", leave);
    }

    return () => {
      if (btn && enter && leave) {
        btn.removeEventListener("mouseenter", enter);
        btn.removeEventListener("mouseleave", leave);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
    >
      <div className="relative min-h-[540px] w-full">
        {/* Background */}
        <div
          ref={bgRef}
          className="absolute inset-[-8%] bg-cover bg-center bg-no-repeat will-change-transform"
          style={{ backgroundImage: "url('/about-bg.jpg')" }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,18,0.88)_0%,rgba(4,10,18,0.70)_30%,rgba(4,10,18,0.34)_58%,rgba(4,10,18,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.04)_48%,rgba(0,0,0,0.18)_100%)]" />

        {/* Content */}
        <div className="site-container relative z-10 flex min-h-[540px] items-center">
          <div className="grid w-full grid-cols-1 items-center gap-12 py-16 md:grid-cols-[minmax(0,500px)_minmax(0,1fr)] md:gap-10 md:py-0 lg:grid-cols-[500px_minmax(0,1fr)] lg:gap-14">
            {/* Left */}
            <div className="overflow-visible md:-translate-y-[8px]">
              <div
                ref={taglineRef}
                className="mb-5 flex items-center gap-3 md:mb-6"
              >
                <span
                  ref={lineRef}
                  className="inline-block h-px w-8 bg-[#22D3EE]/65"
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/48">
                  About Us
                </p>
              </div>

              <h2
                ref={headingRef}
                className={`${unbounded.className} max-w-[460px] text-[clamp(2.7rem,3.35vw,4.1rem)] font-[400] leading-[0.92] tracking-[-0.045em] text-white`}
              >
                Our Commitment to Every Move
              </h2>
            </div>

            {/* Right */}
            <div className="flex items-center md:justify-center">
              <div
                ref={bodyWrapRef}
                className="w-full max-w-[550px] md:-translate-y-[2px]"
              >
                <p className="text-[15px] leading-[1.8] text-white/72">
                  We make moving easy with reliable, affordable, and
                  professional relocation services tailored to your needs.
                  Whether you&apos;re moving within Toronto or anywhere across
                  Canada, our experienced team ensures a smooth and stress-free
                  experience with careful handling, secure transportation,
                  on-time delivery, and transparent pricing from start to
                  finish.
                </p>

                <div ref={btnWrapRef} className="mt-8">
                  <a
                    href="#contact"
                    data-btn
                    className="inline-flex h-[42px] items-center justify-center rounded-[10px] bg-[#22D3EE] px-7 text-[13px] font-semibold text-[#07111d] shadow-[0_0_0_1px_rgba(34,211,238,0.22),0_8px_24px_rgba(34,211,238,0.24)] transition-all duration-200 hover:bg-[#38e4f7]"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}