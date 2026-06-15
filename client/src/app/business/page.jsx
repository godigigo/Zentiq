"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─────────────────────────────────────────── */

const b2cFeatures = [
  {
    title: "Instant Quote Engine",
    text: "Get price in under 60 seconds. No calls needed.",
  },
  {
    title: "Live GPS Move Tracking",
    text: "Watch your truck in real-time on the Zentiq app.",
  },
  {
    title: "Secure Online Booking",
    text: "Book, reschedule & manage your move entirely online.",
  },
  {
    title: "Packing & Storage Add-ons",
    text: "Add services at checkout — packing, storage, assembly.",
  },
  {
    title: "Dedicated Move Concierge",
    text: "A real human coordinator assigned to every move.",
  },
  {
    title: "Post-Move Rating & Review",
    text: "Rate movers; helps the network maintain quality.",
  },
];

const b2bFeatures = [
  {
    title: "Corporate Relocation Portal",
    text: "Manage employee relocations at scale with one login.",
  },
  {
    title: "Multi-Site Move Management",
    text: "Coordinate office moves across multiple locations.",
  },
  {
    title: "Volume Pricing & Contracts",
    text: "Custom SLA agreements and negotiated fleet rates.",
  },
  {
    title: "HR & Finance Integration",
    text: "API integration with HRIS, SAP, Oracle, Workday.",
  },
  {
    title: "Compliance & Insurance Mgmt",
    text: "COI management, regulatory compliance tracking.",
  },
  {
    title: "Dedicated Account Manager",
    text: "Enterprise-grade support with quarterly reviews.",
  },
];

const journeySteps = [
  {
    number: "01",
    title: "Instant Quote",
    text: "Destination, date, Enter origin.",
    color: "#22D3EE",
  },
  {
    number: "02",
    title: "Smart Matching",
    text: "Verified movers, AI matches best.",
    color: "#3b82f6",
  },
  {
    number: "03",
    title: "Secure Booking",
    text: "Confirm details, Pay deposit.",
    color: "#8b5cf6",
  },
  {
    number: "04",
    title: "Live Tracking",
    text: "In real-time, GPS track truck.",
    color: "#34d399",
  },
  {
    number: "05",
    title: "Move Complete",
    text: "Your experience, Sign-off, rate.",
    color: "#fbbf24",
  },
];

const comparisonRows = [
  {
    feature: "Instant Online Quotes",
    individual: true,
    smb: true,
    enterprise: true,
  },
  {
    feature: "Live GPS Tracking",
    individual: true,
    smb: true,
    enterprise: true,
  },
  {
    feature: "Multi-Location Management",
    individual: false,
    smb: true,
    enterprise: true,
  },
  {
    feature: "Custom SLA Contracts",
    individual: false,
    smb: false,
    enterprise: true,
  },
  {
    feature: "HR System Integration (API)",
    individual: false,
    smb: false,
    enterprise: true,
  },
  {
    feature: "Dedicated Account Manager",
    individual: false,
    smb: false,
    enterprise: true,
  },
  {
    feature: "Volume / Fleet Pricing",
    individual: false,
    smb: true,
    enterprise: true,
  },
  {
    feature: "Analytics & Custom Reports",
    individual: false,
    smb: true,
    enterprise: true,
  },
];

/* ─── COMPONENT ─────────────────────────────────────── */

export default function BusinessPage() {
  const pageRef = useRef(null);
  const glowRef = useRef(null);
  const heroGlowRef = useRef(null);
  const magneticRefs = useRef([]);
  const cardGlowRefs = useRef([]);
  const tiltCardRefs = useRef([]);
  const journeyRefs = useRef([]);
  const tableRowRefs = useRef([]);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray("[data-reveal]");
      const cards = gsap.utils.toArray("[data-card]");

      if (reduced) {
        gsap.set(
          "[data-hero-tag],[data-hero-title],[data-hero-text],[data-reveal],[data-card]",
          { opacity: 1, clearProps: "all" }
        );
        return;
      }

      gsap.set(reveals, { opacity: 0, y: 34 });
      gsap.set(cards, { opacity: 0, y: 28, scale: 0.985 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero-tag]",
          { opacity: 0, x: -22 },
          { opacity: 1, x: 0, duration: 0.55 }
        )
        .fromTo(
          "[data-hero-title]",
          { opacity: 0, y: 44, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.95 },
          0.08
        )
        .fromTo(
          "[data-hero-text]",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.72 },
          0.22
        );

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          yPercent: -14,
          xPercent: 5,
          repeat: -1,
          yoyo: true,
          duration: 6,
          ease: "sine.inOut",
        });
      }

      if (heroGlowRef.current) {
        gsap.to(heroGlowRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      reveals.forEach((el) =>
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.82,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        })
      );

      cards.forEach((el) =>
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        })
      );

      journeyRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.3)",
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      tableRowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: row, start: "top 95%", once: true },
          }
        );
      });

      magneticRefs.current.forEach((btn) => {
        if (!btn) return;
        const onMove = (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.16,
            y: (e.clientY - r.top - r.height / 2) * 0.2,
            duration: 0.28,
            ease: "power3.out",
          });
        };
        const onLeave = () =>
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
          });

        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
        btn._onMove = onMove;
        btn._onLeave = onLeave;
      });

      cardGlowRefs.current.forEach((card) => {
        if (!card) return;
        const glow = card.querySelector("[data-inner-glow]");
        if (!glow) return;

        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          gsap.to(glow, {
            x: e.clientX - r.left,
            y: e.clientY - r.top,
            duration: 0.22,
            ease: "power2.out",
          });
        };

        const onEnter = () => {
          gsap.to(glow, { opacity: 1, duration: 0.22, ease: "power2.out" });
          gsap.to(card, {
            y: -5,
            borderColor: "rgba(255,255,255,0.20)",
            duration: 0.22,
            ease: "power2.out",
          });
        };

        const onLeave = () => {
          gsap.to(glow, { opacity: 0, duration: 0.28, ease: "power2.out" });
          gsap.to(card, {
            y: 0,
            borderColor: "rgba(255,255,255,0.10)",
            duration: 0.22,
            ease: "power2.out",
          });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        card._onMove = onMove;
        card._onEnter = onEnter;
        card._onLeave = onLeave;
      });

      tiltCardRefs.current.forEach((card) => {
        if (!card) return;
        const glow = card.querySelector("[data-inner-glow]");

        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const xPct = (e.clientX - r.left - r.width / 2) / (r.width / 2);
          const yPct = (e.clientY - r.top - r.height / 2) / (r.height / 2);

          gsap.to(card, {
            rotateX: -yPct * 4,
            rotateY: xPct * 4,
            transformPerspective: 1200,
            duration: 0.35,
            ease: "power2.out",
          });

          if (glow) {
            gsap.to(glow, {
              x: e.clientX - r.left,
              y: e.clientY - r.top,
              duration: 0.22,
              ease: "power2.out",
            });
          }
        };

        const onEnter = () => {
          if (glow) {
            gsap.to(glow, { opacity: 1, duration: 0.22, ease: "power2.out" });
          }
          gsap.to(card, {
            y: -7,
            borderColor: "rgba(255,255,255,0.22)",
            scale: 1.01,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        const onLeave = () => {
          if (glow) {
            gsap.to(glow, { opacity: 0, duration: 0.28, ease: "power2.out" });
          }
          gsap.to(card, {
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            borderColor: "rgba(255,255,255,0.10)",
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
          });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        card._onMove = onMove;
        card._onEnter = onEnter;
        card._onLeave = onLeave;
      });
    }, page);

    return () => {
      magneticRefs.current.forEach((btn) => {
        if (!btn) return;
        btn.removeEventListener("mousemove", btn._onMove);
        btn.removeEventListener("mouseleave", btn._onLeave);
      });

      cardGlowRefs.current.forEach((card) => {
        if (!card) return;
        card.removeEventListener("mousemove", card._onMove);
        card.removeEventListener("mouseenter", card._onEnter);
        card.removeEventListener("mouseleave", card._onLeave);
      });

      tiltCardRefs.current.forEach((card) => {
        if (!card) return;
        card.removeEventListener("mousemove", card._onMove);
        card.removeEventListener("mouseenter", card._onEnter);
        card.removeEventListener("mouseleave", card._onLeave);
      });

      ctx.revert();
    };
  }, []);

  const renderCheck = (value, color = "#34d399") =>
    value ? (
      <span className="inline-flex items-center justify-center text-[15px] font-bold" style={{ color }}>
        ✓
      </span>
    ) : (
      <span className="inline-flex items-center justify-center text-[15px] font-bold text-white/28">
        —
      </span>
    );

  return (
    <main ref={pageRef} className="overflow-hidden bg-[#06111d] text-white">
      {/* HERO */}
      <section data-hero className="relative isolate overflow-hidden border-b border-white/10 bg-[#07111d]">
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 will-change-transform bg-[radial-gradient(circle_at_18%_22%,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.12),transparent_24%),radial-gradient(circle_at_50%_82%,rgba(34,211,238,0.07),transparent_24%)]"
        />
        <div
          ref={heroGlowRef}
          className="pointer-events-none absolute inset-[-8%] will-change-transform bg-[radial-gradient(circle_at_60%_40%,rgba(34,211,238,0.09),transparent_30%)]"
        />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="site-container relative z-10 py-28 md:py-32">
          <div className="max-w-[920px]">
            <p
              data-hero-tag
              className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55"
            >
              <span className="h-px w-10 bg-[#22D3EE]/80" />
              Client Solutions
            </p>

            <h1
              data-hero-title
              className={`${unbounded.className} max-w-[15ch] text-[clamp(2.4rem,5.2vw,5rem)] font-[500] leading-[0.93] tracking-[-0.06em] text-white`}
            >
              Built for Every Client — Consumer & Enterprise
            </h1>

            <p
              data-hero-text
              className="mt-6 max-w-[54ch] text-[15px] leading-[1.9] text-white/65 md:text-[16px]"
            >
              From individual residential moves to enterprise relocation
              workflows, Zentiq gives every client a faster, cleaner, and more
              transparent experience.
            </p>
          </div>
        </div>
      </section>

      {/* TWO FEATURE CARDS */}
      <section className="relative overflow-hidden bg-[#06111d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,rgba(34,211,238,0.07),transparent_22%),radial-gradient(circle_at_90%_55%,rgba(129,140,248,0.07),transparent_22%)]" />

        <div className="site-container relative z-10 py-20 md:py-24">
          <div className="grid gap-5 lg:grid-cols-2">
            {/* B2C */}
            <div
              ref={(el) => {
                tiltCardRefs.current[0] = el;
                cardGlowRefs.current[0] = el;
              }}
              data-card
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-[16px] md:p-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                data-inner-glow
                className="pointer-events-none absolute left-0 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22D3EE]/16 opacity-0 blur-[60px]"
              />
              <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-[#22D3EE]/10 blur-[80px]" />

              <div className="relative z-10">
                <div className="mb-7 inline-flex rounded-[12px] border border-[#22D3EE]/25 bg-[#22D3EE]/12 px-4 py-2">
                  <span className={`${unbounded.className} text-[0.85rem] font-[500] tracking-[-0.02em] text-[#22D3EE]`}>
                    B2C — Individual & Residential Clients
                  </span>
                </div>

                <div className="space-y-5">
                  {b2cFeatures.map((item) => (
                    <div key={item.title} className="flex items-start gap-3.5">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.80)]" />
                      <div>
                        <p className={`${unbounded.className} text-[0.92rem] font-[500] tracking-[-0.03em] text-white`}>
                          {item.title}
                        </p>
                        <p className="mt-1 text-[13px] leading-[1.75] text-white/60">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* B2B */}
            <div
              ref={(el) => {
                tiltCardRefs.current[1] = el;
                cardGlowRefs.current[1] = el;
              }}
              data-card
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-[16px] md:p-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                data-inner-glow
                className="pointer-events-none absolute left-0 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6]/16 opacity-0 blur-[60px]"
              />
              <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#8b5cf6]/10 blur-[80px]" />

              <div className="relative z-10">
                <div className="mb-7 inline-flex rounded-[12px] border border-[#8b5cf6]/30 bg-[#8b5cf6]/12 px-4 py-2">
                  <span className={`${unbounded.className} text-[0.85rem] font-[500] tracking-[-0.02em] text-[#b794f6]`}>
                    B2B — Corporate & Enterprise Clients
                  </span>
                </div>

                <div className="space-y-5">
                  {b2bFeatures.map((item) => (
                    <div key={item.title} className="flex items-start gap-3.5">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#8b5cf6] shadow-[0_0_10px_rgba(139,92,246,0.80)]" />
                      <div>
                        <p className={`${unbounded.className} text-[0.92rem] font-[500] tracking-[-0.03em] text-white`}>
                          {item.title}
                        </p>
                        <p className="mt-1 text-[13px] leading-[1.75] text-white/60">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER JOURNEY */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[#071420]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.06),transparent_30%)]" />

        <div className="site-container relative z-10 py-18 md:py-20">
          <div className="mb-10 text-center" data-reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/48">
              Customer Journey
            </p>
            <h2 className={`${unbounded.className} text-[clamp(2rem,4.2vw,3.3rem)] font-[500] leading-[0.95] tracking-[-0.055em] text-white`}>
              Customer Journey — From Quote to Completion
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {journeySteps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => (journeyRefs.current[index] = el)}
                className="group relative overflow-hidden rounded-[20px] border p-5 text-center backdrop-blur-[12px]"
                style={{
                  borderColor: `${step.color}35`,
                  backgroundColor: `${step.color}0a`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${step.color}18, transparent 72%)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border text-[13px] font-bold"
                    style={{
                      borderColor: `${step.color}55`,
                      backgroundColor: `${step.color}18`,
                      color: step.color,
                      boxShadow: `0 0 16px ${step.color}38`,
                    }}
                  >
                    {step.number}
                  </div>
                  <p className={`${unbounded.className} text-[0.82rem] font-[500] leading-snug tracking-[-0.02em] text-white`}>
                    {step.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-[1.55] text-white/55">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE COMPARISON */}
      <section className="relative overflow-hidden bg-[#06111d]">
        <div className="site-container relative z-10 py-20 md:py-24">
          <div className="mb-10 text-center" data-reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/48">
              Comparison
            </p>
            <h2 className={`${unbounded.className} text-[clamp(2rem,4.2vw,3.3rem)] font-[500] leading-[0.95] tracking-[-0.055em] text-white`}>
              Feature Comparison
            </h2>
          </div>

          <div
            ref={(el) => (cardGlowRefs.current[2] = el)}
            data-card
            className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04] backdrop-blur-[14px]"
          >
            <div
              data-inner-glow
              className="pointer-events-none absolute left-0 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22D3EE]/12 opacity-0 blur-[60px]"
            />

            <div className="relative z-10 overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-[#08111d]">
                    <th className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/62">
                      Feature
                    </th>
                    <th className="px-5 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-white/62">
                      Individual
                    </th>
                    <th className="px-5 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-white/62">
                      SMB
                    </th>
                    <th className="px-5 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-white/62">
                      Enterprise
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr
                      key={row.feature}
                      ref={(el) => (tableRowRefs.current[index] = el)}
                      className="border-b border-white/6 transition-colors duration-200 hover:bg-white/[0.03]"
                    >
                      <td className="px-5 py-4 text-[13px] font-medium text-white/78">
                        {row.feature}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {renderCheck(row.individual, "#3b82f6")}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {renderCheck(row.smb, "#8b5cf6")}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {renderCheck(row.enterprise, "#34d399")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#07131f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.11),transparent_30%)]" />

        <div className="site-container relative z-10 py-20 md:py-24">
          <div
            ref={(el) => (cardGlowRefs.current[3] = el)}
            data-card
            className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-6 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-[18px] md:px-10 md:py-12"
          >
            <div
              data-inner-glow
              className="pointer-events-none absolute left-0 top-0 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22D3EE]/16 opacity-0 blur-[60px]"
            />
            <div className="absolute -left-12 top-0 h-36 w-36 rounded-full bg-[#22D3EE]/12 blur-[80px]" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#8b5cf6]/10 blur-[90px]" />
            <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:52px_52px]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[700px]">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                  Built for teams
                </p>
                <h2 className={`${unbounded.className} text-[clamp(2rem,4.4vw,3.6rem)] font-[500] leading-[0.96] tracking-[-0.05em] text-white`}>
                  Ready to move faster with Zentiq?
                </h2>
                <p className="mt-5 max-w-[50ch] text-[15px] leading-[1.85] text-white/64">
                  Whether you’re moving one home or coordinating a multi-site
                  enterprise relocation, Zentiq gives you clarity from start to finish.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  ref={(el) => (magneticRefs.current[0] = el)}
                  href="/contact"
                  className="inline-flex h-[48px] items-center justify-center rounded-[14px] bg-[#22D3EE] px-6 text-[13px] font-semibold text-[#07111d] shadow-[0_12px_34px_rgba(34,211,238,0.24)] transition-[background,transform] duration-200 hover:bg-[#43dff4] hover:-translate-y-[1px]"
                >
                  Talk to Sales
                </Link>
                <Link
                  ref={(el) => (magneticRefs.current[1] = el)}
                  href="/pricing"
                  className="inline-flex h-[48px] items-center justify-center rounded-[14px] border border-white/12 bg-white/5 px-6 text-[13px] font-medium text-white transition-[background,border-color,transform] duration-200 hover:border-white/22 hover:bg-white/10"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}