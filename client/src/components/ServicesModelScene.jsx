"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

const ServicesModelScene = dynamic(() => import("@/components/ServicesModelScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[340px] w-full items-center justify-center bg-[#f6f7f9] text-sm text-[#07111d]/60">
      Loading 3D model...
    </div>
  ),
});

const SERVICES = {
  left: [
    {
      title: "Local movers",
      body: "Expert local moving teams ready for your neighborhood relocation.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 15.5 10 10l3.2 3.2L19 7.5" />
          <path d="M15.5 7.5H19v3.5" />
        </svg>
      ),
    },
    {
      title: "Long distance movers",
      body: "Professional long distance movers handling cross-country journeys with care.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20.5s6.5-4.1 6.5-10.2a6.5 6.5 0 1 0-13 0c0 6.1 6.5 10.2 6.5 10.2Z" />
          <circle cx="12" cy="10.3" r="2.2" />
        </svg>
      ),
    },
    {
      title: "Office relocation",
      body: "Seamless business and office moves with minimal downtime and full coordination.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20h16" />
          <path d="M6.5 20V7.5A1.5 1.5 0 0 1 8 6h8a1.5 1.5 0 0 1 1.5 1.5V20" />
          <path d="M10 10h.01" />
          <path d="M14 10h.01" />
          <path d="M10 14h.01" />
          <path d="M14 14h.01" />
        </svg>
      ),
    },
  ],
  right: [
    {
      title: "Packing services",
      body: "Complete packing services protecting your belongings throughout transport.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8h8" />
          <path d="M4 12h6" />
          <path d="M4 16h8" />
          <path d="M15 9h5l-2.5-2.5" />
          <path d="M20 9l-2.5 2.5" />
          <path d="M14 16h6" />
        </svg>
      ),
    },
    {
      title: "Moving supplies and storage",
      body: "Quality boxes, tape, and secure climate-controlled storage when you need it.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="5.5" width="14" height="3" rx="1.2" />
          <rect x="5" y="10.5" width="14" height="3" rx="1.2" />
          <rect x="5" y="15.5" width="14" height="3" rx="1.2" />
        </svg>
      ),
    },
    {
      title: "Junk removal",
      body: "Fast and efficient removal of unwanted items before or after your move.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 7h12" />
          <path d="M9 7V5.8c0-.44.36-.8.8-.8h4.4c.44 0 .8.36.8.8V7" />
          <path d="M8 7l.7 11.2c.03.45.4.8.85.8h5.9c.45 0 .82-.35.85-.8L17 7" />
          <path d="M10 10.5v5" />
          <path d="M14 10.5v5" />
        </svg>
      ),
    },
  ],
};

function ServiceItem({ icon, title, body, align = "left", itemRef, iconRef }) {
  const isLeft = align === "left";

  return (
    <article ref={itemRef} className={`group relative ${isLeft ? "text-right" : "text-left"}`}>
      <div
        ref={iconRef}
        className={`mb-2 flex text-[#07111d] transition-colors duration-300 group-hover:text-[#0b5360] ${
          isLeft ? "justify-end" : "justify-start"
        }`}
      >
        {icon}
      </div>

      <h3
        className={`${unbounded.className} text-[clamp(1.12rem,1.4vw,1.68rem)] font-[400] leading-[0.98] tracking-[-0.045em] text-[#07111d] transition-transform duration-300 group-hover:translate-y-[-1px]`}
      >
        {title}
      </h3>

      <p
        className={`mt-2 text-[13px] leading-[1.62] text-[#07111d]/62 ${
          isLeft ? "ml-auto max-w-[240px]" : "max-w-[240px]"
        }`}
      >
        {body}
      </p>

      <div
        className={`mt-3 h-px bg-[#07111d]/10 transition-all duration-300 group-hover:bg-[#07111d]/18 ${
          isLeft ? "ml-auto w-[76px] group-hover:w-[102px]" : "w-[76px] group-hover:w-[102px]"
        }`}
      />
    </article>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const copyRef = useRef(null);
  const imageCardRef = useRef(null);
  const buttonRef = useRef(null);
  const spotlightRef = useRef(null);
  const itemRefs = useRef([]);
  const iconRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { y: 22, opacity: 0 });
      gsap.set(copyRef.current, { y: 16, opacity: 0 });
      gsap.set(imageCardRef.current, { y: 20, opacity: 0, scale: 0.985 });
      gsap.set(buttonRef.current, { y: 10, opacity: 0 });
      gsap.set(itemRefs.current, { y: 16, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(headingRef.current, { y: 0, opacity: 1, duration: 0.72 })
        .to(copyRef.current, { y: 0, opacity: 1, duration: 0.52 }, 0.12)
        .to(imageCardRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.72 }, 0.18)
        .to(itemRefs.current, { y: 0, opacity: 1, duration: 0.52, stagger: 0.04 }, 0.22)
        .to(buttonRef.current, { y: 0, opacity: 1, duration: 0.4 }, 0.36);

      const moveSpotlight = (e) => {
        const bounds = section.getBoundingClientRect();
        const x = ((e.clientX - bounds.left) / bounds.width) * 100;
        const y = ((e.clientY - bounds.top) / bounds.height) * 100;

        gsap.to(spotlightRef.current, {
          x: `${x - 50}%`,
          y: `${y - 50}%`,
          duration: 0.35,
          ease: "power2.out",
        });

        gsap.to(imageCardRef.current, {
          rotateY: gsap.utils.mapRange(0, bounds.width, -1.6, 1.6, e.clientX - bounds.left),
          rotateX: gsap.utils.mapRange(0, bounds.height, 1.1, -1.1, e.clientY - bounds.top),
          transformPerspective: 1200,
          transformOrigin: "center center",
          duration: 0.35,
          ease: "power2.out",
        });
      };

      const resetSpotlight = () => {
        gsap.to(spotlightRef.current, {
          x: "0%",
          y: "0%",
          duration: 0.45,
          ease: "power2.out",
        });

        gsap.to(imageCardRef.current, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.45,
          ease: "power2.out",
        });
      };

      section.addEventListener("mousemove", moveSpotlight);
      section.addEventListener("mouseleave", resetSpotlight);

      const cleanups = [];

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const icon = iconRefs.current[index];

        const enter = () => {
          gsap.to(item, { y: -2, duration: 0.18, ease: "power2.out" });
          if (icon) {
            gsap.to(icon, {
              rotate: index % 2 === 0 ? -3 : 3,
              scale: 1.04,
              duration: 0.18,
              ease: "power2.out",
            });
          }
        };

        const leave = () => {
          gsap.to(item, { y: 0, duration: 0.18, ease: "power2.out" });
          if (icon) {
            gsap.to(icon, {
              rotate: 0,
              scale: 1,
              duration: 0.18,
              ease: "power2.out",
            });
          }
        };

        item.addEventListener("mouseenter", enter);
        item.addEventListener("mouseleave", leave);

        cleanups.push(() => {
          item.removeEventListener("mouseenter", enter);
          item.removeEventListener("mouseleave", leave);
        });
      });

      const button = buttonRef.current?.querySelector("[data-btn]");
      let btnEnter;
      let btnLeave;

      if (button) {
        btnEnter = () =>
          gsap.to(button, {
            y: -2,
            scale: 1.02,
            duration: 0.18,
            ease: "power2.out",
          });

        btnLeave = () =>
          gsap.to(button, {
            y: 0,
            scale: 1,
            duration: 0.18,
            ease: "power2.out",
          });

        button.addEventListener("mouseenter", btnEnter);
        button.addEventListener("mouseleave", btnLeave);
      }

      return () => {
        section.removeEventListener("mousemove", moveSpotlight);
        section.removeEventListener("mouseleave", resetSpotlight);
        cleanups.forEach((fn) => fn());

        if (button && btnEnter && btnLeave) {
          button.removeEventListener("mouseenter", btnEnter);
          button.removeEventListener("mouseleave", btnLeave);
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white text-[#07111d]">
      <div className="absolute inset-0 opacity-[0.24]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(7,17,29,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(7,17,29,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
            backgroundPosition: "center center",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={spotlightRef}
          className="absolute left-1/2 top-[58%] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-[88px] md:h-[300px] md:w-[300px]"
        />
      </div>

      <div className="site-container relative z-10 py-[58px] md:py-[68px]">
        <div className="mx-auto max-w-[700px] text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#07111d]/72">
            Services
          </p>

          <h2
            ref={headingRef}
            className={`${unbounded.className} mx-auto max-w-[620px] text-[clamp(2rem,3.2vw,3.2rem)] font-[400] leading-[0.98] tracking-[-0.045em] text-[#07111d]`}
          >
            Relocation solutions for every move
          </h2>

          <p
            ref={copyRef}
            className="mx-auto mt-4 max-w-[610px] text-[14px] leading-[1.68] text-[#07111d]/62"
          >
            From local shifting to packing, storage, and cleanup, every service
            is designed to make your move smoother, faster, and more reliable.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(240px,280px)_minmax(0,520px)_minmax(240px,280px)] lg:justify-center lg:gap-x-10 xl:grid-cols-[300px_560px_300px] xl:gap-x-14">
          <div className="order-2 grid grid-cols-1 gap-8 lg:order-1 lg:pr-4">
            {SERVICES.left.map((item, index) => (
              <ServiceItem
                key={item.title}
                {...item}
                align="left"
                itemRef={(el) => (itemRefs.current[index] = el)}
                iconRef={(el) => (iconRefs.current[index] = el)}
              />
            ))}
          </div>

          <div className="order-1 lg:order-2">
            <div
              ref={imageCardRef}
              className="group relative mx-auto w-full max-w-[560px] overflow-hidden rounded-[28px] border border-[#07111d]/8 bg-white/70 shadow-[0_20px_40px_rgba(7,17,29,0.08)] backdrop-blur-[2px]"
            >
              <div className="absolute inset-0 rounded-[28px] ring-1 ring-white/30" />
              <div className="relative aspect-[1/1] min-h-[320px] overflow-hidden rounded-[28px] sm:min-h-[420px] lg:min-h-[500px]">
                <ServicesModelScene modelPath="/Pibacsu.glb" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.01)_45%,rgba(7,17,29,0.04)_100%)]" />
              </div>
            </div>
          </div>

          <div className="order-3 grid grid-cols-1 gap-8 lg:pl-4">
            {SERVICES.right.map((item, index) => (
              <ServiceItem
                key={item.title}
                {...item}
                align="right"
                itemRef={(el) => (itemRefs.current[index + 3] = el)}
                iconRef={(el) => (iconRefs.current[index + 3] = el)}
              />
            ))}
          </div>
        </div>

        <div ref={buttonRef} className="mt-10 flex justify-center">
          <a
            href="/services"
            data-btn
            className="group inline-flex h-[42px] items-center gap-2.5 rounded-[10px] border border-[#07111d]/10 bg-white/70 px-5 text-[13px] font-semibold text-[#07111d] shadow-[0_8px_16px_rgba(7,17,29,0.04)] backdrop-blur-[4px] transition-all duration-200 hover:bg-white"
          >
            Learn More
            <svg
              viewBox="0 0 16 16"
              className="h-[12px] w-[12px] transition-transform duration-200 group-hover:translate-x-[3px]"
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
    </section>
  );
}