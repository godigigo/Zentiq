"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    label: "Local Movers",
    href: "/services/local-movers",
    text: "Organized same-city moves with reliable timing and protected handling.",
    tag: "Residential",
  },
  {
    number: "02",
    label: "Long Distance Movers",
    href: "/services/long-dsitance-movers",
    text: "Structured intercity and cross-province relocations with clear milestones.",
    tag: "Long haul",
  },
  {
    number: "03",
    label: "Office Relocation",
    href: "/services/office-relocation",
    text: "Business and workspace moves planned around minimal operational downtime.",
    tag: "Commercial",
  },
  {
    number: "04",
    label: "Packing Services",
    href: "/services/packing-services",
    text: "Professional packing with protective wrapping and careful item assessment.",
    tag: "Add-on",
  },
  {
    number: "05",
    label: "Moving Supplies & Storage",
    href: "/services/moving-supplies",
    text: "Quality materials and flexible short-term storage for transitional moves.",
    tag: "Support",
  },
  {
    number: "06",
    label: "Junk Removal",
    href: "/services/junk-removal",
    text: "Pre-move and post-move removal support to help clear and reset your space.",
    tag: "Cleanup",
  },
];

export default function ServicesPage() {
  const pageRef     = useRef(null);
  const magneticRefs = useRef([]);
  const cardRefs    = useRef([]);
  const glowBgRef   = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          "[data-header-tag],[data-header-title],[data-header-sub],[data-header-meta],[data-service-card],[data-cta-card]",
          { opacity: 1, clearProps: "all" }
        );
        return;
      }

      /* ── Page header entrance ── */
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-header-tag]",
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.48 }
        )
        .fromTo(
          "[data-header-title]",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.06
        )
        .fromTo(
          "[data-header-sub]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.16
        )
        .fromTo(
          "[data-header-meta]",
          { opacity: 0 },
          { opacity: 1, duration: 0.55 },
          0.26
        );

      /* ── Service cards stagger ── */
      gsap.utils.toArray("[data-service-card]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            delay: i * 0.055,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        );
      });

      /* ── CTA card ── */
      gsap.fromTo(
        "[data-cta-card]",
        { opacity: 0, y: 28, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-cta-card]", start: "top 88%", once: true },
        }
      );

      /* ── Subtle ambient glow float ── */
      if (glowBgRef.current) {
        gsap.to(glowBgRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: page,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* ── Magnetic buttons ── */
      magneticRefs.current.forEach((btn) => {
        if (!btn) return;

        const onMove = (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width  / 2) * 0.12,
            y: (e.clientY - r.top  - r.height / 2) * 0.16,
            duration: 0.28,
            ease: "power3.out",
          });
        };

        const onLeave = () =>
          gsap.to(btn, { x: 0, y: 0, duration: 0.35, ease: "power3.out" });

        btn.addEventListener("mousemove",  onMove);
        btn.addEventListener("mouseleave", onLeave);
        btn._onMove  = onMove;
        btn._onLeave = onLeave;
      });

      /* ── Card glow-follow ── */
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const glow = card.querySelector("[data-inner-glow]");
        if (!glow) return;

        const arrowEl = card.querySelector("[data-arrow]");

        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          gsap.to(glow, {
            x: e.clientX - r.left,
            y: e.clientY - r.top,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        const onEnter = () => {
          gsap.to(glow,  { opacity: 1, duration: 0.22, ease: "power2.out" });
          gsap.to(card,  {
            y: -6,
            borderColor: "rgba(34,211,238,0.28)",
            duration: 0.24,
            ease: "power2.out",
          });
          if (arrowEl)
            gsap.to(arrowEl, { x: 4, y: -4, opacity: 1, duration: 0.22, ease: "power2.out" });
        };

        const onLeave = () => {
          gsap.to(glow,  { opacity: 0, duration: 0.26, ease: "power2.out" });
          gsap.to(card,  {
            y: 0,
            borderColor: "rgba(255,255,255,0.10)",
            duration: 0.24,
            ease: "power2.out",
          });
          if (arrowEl)
            gsap.to(arrowEl, { x: 0, y: 0, opacity: 0.4, duration: 0.22, ease: "power2.out" });
        };

        card.addEventListener("mousemove",  onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        card._onMove  = onMove;
        card._onEnter = onEnter;
        card._onLeave = onLeave;
      });
    }, page);

    return () => {
      magneticRefs.current.forEach((btn) => {
        if (!btn) return;
        btn.removeEventListener("mousemove",  btn._onMove);
        btn.removeEventListener("mouseleave", btn._onLeave);
      });
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.removeEventListener("mousemove",  card._onMove);
        card.removeEventListener("mouseenter", card._onEnter);
        card.removeEventListener("mouseleave", card._onLeave);
      });
      ctx.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className="overflow-hidden bg-[#06111d] text-white py-8">

      {/* ══ AMBIENT GLOW (non-intrusive) ══ */}
      <div
        ref={glowBgRef}
        className="pointer-events-none fixed inset-0 z-0 will-change-transform"
        aria-hidden
      >
        <div className="absolute left-[12%] top-[8%] h-[520px] w-[520px] rounded-full bg-[#22D3EE]/[0.07] blur-[120px]" />
        <div className="absolute right-[8%] top-[40%] h-[380px] w-[380px] rounded-full bg-[#22D3EE]/[0.05] blur-[100px]" />
      </div>

      {/* ══ PAGE HEADER ══ */}
      <header className="relative z-10 border-b border-white/10 bg-[#07111d]/90 backdrop-blur-[12px]">
        <div className="site-container py-16 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div>
              <p
                data-header-tag
                className="mb-4 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/52"
              >
                <span className="h-px w-10 bg-[#22D3EE]/80" />
                What we do
              </p>

              <h1
                data-header-title
                className={`${unbounded.className} max-w-[10ch] text-[clamp(2.8rem,6vw,5.8rem)] font-[500] leading-[0.91] tracking-[-0.06em] text-white`}
              >
                Our Services
              </h1>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
              <p
                data-header-sub
                className="max-w-[38ch] text-[15px] leading-[1.8] text-white/64 md:text-right"
              >
                Residential, commercial, packing,
                storage, and removal services —
                tailored to the move.
              </p>

              <p
                data-header-meta
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/34 md:text-right"
              >
                {services.length} services available
              </p>
            </div>

          </div>
        </div>
      </header>

      {/* ══ SERVICES GRID ══ */}
      <section className="relative z-10">
        <div className="site-container py-16 md:py-20">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Link
                key={service.label}
                href={service.href}
                ref={(el) => (cardRefs.current[index] = el)}
                data-service-card
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-[14px] transition-colors duration-200"
              >
                {/* cursor glow */}
                <div
                  data-inner-glow
                  className="pointer-events-none absolute left-0 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22D3EE]/16 opacity-0 blur-[52px]"
                />

                <div className="relative z-10 flex h-full flex-col">
                  {/* top row */}
                  <div className="mb-7 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#22D3EE]/20 bg-[#22D3EE]/8 text-[#8ef4ff]">
                      <span className="text-[12px] font-semibold">{service.number}</span>
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/46">
                      {service.tag}
                    </span>
                  </div>

                  {/* title */}
                  <h2
                    className={`${unbounded.className} text-[1.16rem] font-[500] leading-[1.06] tracking-[-0.04em] text-white`}
                  >
                    {service.label}
                  </h2>

                  {/* body */}
                  <p className="mt-4 flex-1 text-[14px] leading-[1.8] text-white/60">
                    {service.text}
                  </p>

                  {/* footer */}
                  <div className="mt-7 flex items-center justify-between">
                    <span className="h-px flex-1 bg-gradient-to-r from-[#22D3EE]/28 via-white/8 to-transparent" />
                    <span
                      data-arrow
                      className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-[#8ef4ff] opacity-40"
                      aria-hidden
                    >
                      {/* diagonal arrow */}
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M3 10L10 3M10 3H4M10 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative z-10 border-t border-white/10">
        <div className="site-container py-16 md:py-20">
          <div
            data-cta-card
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] px-6 py-10 backdrop-blur-[18px] md:px-10 md:py-12"
          >
            <div className="pointer-events-none absolute -left-16 -top-8 h-40 w-40 rounded-full bg-[#22D3EE]/12 blur-[80px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-44 w-44 rounded-full bg-[#22D3EE]/08 blur-[90px]" />
            <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:52px_52px]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[600px]">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                  Not sure where to start?
                </p>
                <h2
                  className={`${unbounded.className} text-[clamp(1.8rem,4vw,3.4rem)] font-[500] leading-[0.96] tracking-[-0.05em] text-white`}
                >
                  Tell us about your move
                </h2>
                <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.8] text-white/62">
                  We'll match you to the right service and put together a clear, no-pressure quote.
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  ref={(el) => (magneticRefs.current[0] = el)}
                  href="/contact"
                  className="inline-flex h-[48px] items-center justify-center rounded-[14px] bg-[#22D3EE] px-6 text-[13px] font-semibold text-[#07111d] shadow-[0_12px_34px_rgba(34,211,238,0.24)] transition-[background,transform] duration-200 hover:bg-[#43dff4]"
                >
                  Get a free quote
                </Link>

                <Link
                  ref={(el) => (magneticRefs.current[1] = el)}
                  href="/about"
                  className="inline-flex h-[48px] items-center justify-center rounded-[14px] border border-white/12 bg-white/5 px-6 text-[13px] font-medium text-white transition-[background,border-color,transform] duration-200 hover:border-white/22 hover:bg-white/10"
                >
                  About Zentiq
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}