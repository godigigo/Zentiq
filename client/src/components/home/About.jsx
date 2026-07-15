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

    let splitInstance;

    const ctx = gsap.context(() => {
      splitInstance = new SplitText(headingRef.current, {
        type: "lines",
        linesClass: "about-line",
      });

      splitInstance.lines.forEach((line) => {
        const wrap = document.createElement("div");
        wrap.className = "about-line-mask";
        line.parentNode.insertBefore(wrap, line);
        wrap.appendChild(line);
      });

      gsap.set(taglineRef.current, { x: -16, opacity: 0 });
      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(splitInstance.lines, { yPercent: 110, opacity: 0 });
      gsap.set(bodyWrapRef.current, { y: 22, opacity: 0 });
      gsap.set(btnWrapRef.current, { y: 14, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
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
          splitInstance.lines,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.86,
            ease: "power4.out",
          },
          0.14
        )
        .to(bodyWrapRef.current, { y: 0, opacity: 1, duration: 0.64 }, 0.34)
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

      if (splitInstance) splitInstance.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black text-white"
    >
      <style jsx>{`
        .about-line-mask {
          overflow: hidden;
          padding-block: 0.08em;
        }
      `}</style>

      <div className="relative min-h-[720px] w-full md:min-h-[760px]">
        {/* Background */}
        <div
          ref={bgRef}
          className="absolute inset-[-8%] bg-cover bg-center bg-no-repeat will-change-transform"
          style={{ backgroundImage: "url('/about-bg.png')" }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(4,10,18,0.88)_0%,rgba(4,10,18,0.68)_34%,rgba(4,10,18,0.30)_62%,rgba(4,10,18,0.16)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.02)_45%,rgba(0,0,0,0.22)_100%)]" />

        {/* DESKTOP */}
        <div className="relative z-10 hidden min-h-[720px] md:flex md:flex-col md:justify-between md:min-h-[760px]">
          {/* Top-left */}
          <div className="site-container pt-[110px]">
            <div className="max-w-[560px]">
              <div
                ref={taglineRef}
                className="mb-5 flex items-center gap-3 md:mb-6"
              >
                <span
                  ref={lineRef}
                  className="inline-block h-px w-8 bg-[#004FEC]/65"
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/52">
                  About Us
                </p>
              </div>

              <h2
                ref={headingRef}
                className={`${unbounded.className} max-w-[520px] text-[clamp(2.9rem,3.6vw,4.4rem)] font-[400] leading-[1.02] tracking-[-0.045em] text-white`}
              >
                Our Commitment to Every Move
              </h2>
            </div>
          </div>

          {/* Bottom-right */}
          <div className="site-container flex justify-end pb-[58px]">
            <div
              ref={bodyWrapRef}
              className="w-full max-w-[420px] md:text-left"
            >
              <p className="text-[16px] leading-[1.82] text-white/72 md:text-[17px]">
                We make moving easy with reliable, affordable, and professional
                relocation services tailored to your needs. Whether you&apos;re
                moving within Toronto or anywhere across Canada, our experienced
                team ensures a smooth and stress-free experience with careful
                handling, secure transportation, on-time delivery, and
                transparent pricing from start to finish.
              </p>

              <div ref={btnWrapRef} className="mt-8">
                <a
                  href="/about"
                  data-btn
                  className="inline-flex h-[44px] items-center justify-center rounded-[10px] bg-[#004FEC] px-7 text-[13px] font-semibold text-[#07111d] shadow-[0_0_0_1px_rgba(34,211,238,0.22),0_8px_24px_rgba(34,211,238,0.24)] transition-all duration-200 hover:bg-[#0047D4]"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE */}
        <div className="relative z-10 flex min-h-[680px] flex-col justify-between px-5 pb-10 pt-24 sm:px-6 md:hidden">
          <div className="max-w-[340px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-block h-px w-7 bg-[#004FEC]/65" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                About Us
              </p>
            </div>

            <h2
              className={`${unbounded.className} text-[clamp(2.45rem,9vw,3.6rem)] font-[400] leading-[1.02] tracking-[-0.045em] text-white`}
            >
              Our Commitment to Every Move
            </h2>
          </div>

          <div className="max-w-[320px]">
            <p className="text-[14px] leading-[1.78] text-white/68 sm:text-[15px]">
              We make moving easy with reliable, affordable, and professional
              relocation services tailored to your needs. Whether you&apos;re
              moving within Toronto or anywhere across Canada, our experienced
              team ensures a smooth and stress-free experience with careful
              handling, secure transportation, on-time delivery, and transparent
              pricing from start to finish.
            </p>

            <div className="mt-7">
              <a
                href="/about"
                className="inline-flex h-[44px] items-center justify-center rounded-[10px] bg-[#004FEC] px-6 text-[13px] font-semibold text-[#07111d] shadow-[0_6px_20px_rgba(34,211,238,0.24)]"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}