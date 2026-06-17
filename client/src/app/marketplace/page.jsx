"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─────────────────────────────────────────── */

const forMovers = [
  { title: "Verified Lead Feed",      text: "Receive pre-qualified move requests matched to your capacity & region." },
  { title: "Bid & Win Jobs",          text: "Competitive bidding on open requests with instant acceptance workflow." },
  { title: "Zentiq Certified Badge",  text: "Earn trust with verified reviews, licensing and insurance display." },
  { title: "Network Partnerships",    text: "Sub-contract overflow work to other verified Zentiq partners." },
  { title: "Performance Dashboard",   text: "Track win rate, revenue, ratings and growth metrics in real-time." },
];

const forClients = [
  { title: "Instant Mover Matching",   text: "AI pairs your move with top-rated movers available on your date." },
  { title: "Transparent Quotes",       text: "Side-by-side price comparison with no hidden fees guaranteed." },
  { title: "Verified Reviews Only",    text: "All reviews are post-move verified. No fake ratings on Zentiq." },
  { title: "Price Match Guarantee",    text: "Found it cheaper? We match it or upgrade your move for free." },
  { title: "Move Protection Cover",    text: "Every Zentiq marketplace move comes with $10K protection cover." },
];

const stats = [
  { value: 1200, display: "1,200+", label: "Verified Mover Partners",    color: "#004FEC" },
  { value: 38,   display: "38",     label: "States & Provinces Covered", color: "#004FEC" },
  { value: 2.4,  display: "$2.4M",  label: "Avg Monthly Lead Value",     color: "#4ade80" },
  { value: 72,   display: "72hrs",  label: "Avg Lead-to-Book Time",      color: "#facc15" },
  { value: 99.1, display: "99.1%",  label: "Marketplace Uptime SLA",     color: "#a78bfa" },
];

const steps = [
  { number: "1", label: "Client",       sub: "Submits Move",    color: "#004FEC" },
  { number: "2", label: "Zentiq AI",    sub: "Matches Movers",  color: "#818cf8" },
  { number: "3", label: "Movers",       sub: "Submit Quotes",   color: "#a78bfa" },
  { number: "4", label: "Client",       sub: "Selects & Books", color: "#34d399" },
  { number: "5", label: "Move Executed",sub: "& Tracked",       color: "#facc15" },
  { number: "6", label: "Review &",     sub: "Payout",          color: "#f87171" },
];

/* ─── COMPONENT ─────────────────────────────────────── */

export default function MarketplacePage() {
  const pageRef       = useRef(null);
  const glowRef       = useRef(null);
  const heroGlowRef   = useRef(null);
  const magneticRefs  = useRef([]);
  const cardGlowRefs  = useRef([]);
  const tiltCardRefs  = useRef([]);
  const counterRefs   = useRef([]);
  const statCardRefs  = useRef([]);
  const stepRefs      = useRef([]);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray("[data-reveal]");
      const cards   = gsap.utils.toArray("[data-card]");

      if (reduced) {
        gsap.set(
          "[data-hero-tag],[data-hero-title],[data-hero-text],[data-reveal],[data-card]",
          { opacity: 1, clearProps: "all" }
        );
        return;
      }

      /* ── initial hidden states ── */
      gsap.set(reveals, { opacity: 0, y: 34 });
      gsap.set(cards,   { opacity: 0, y: 28, scale: 0.984 });

      /* ── hero entrance ── */
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo("[data-hero-tag]",   { opacity: 0, x: -22 },            { opacity: 1, x: 0, duration: 0.55 })
        .fromTo("[data-hero-title]", { opacity: 0, y: 44, skewY: 1.5 }, { opacity: 1, y: 0, skewY: 0, duration: 0.95 }, 0.08)
        .fromTo("[data-hero-text]",  { opacity: 0, y: 28 },             { opacity: 1, y: 0, duration: 0.72 }, 0.22);

      /* ── floating ambient glow ── */
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          yPercent: -14, xPercent: 5,
          repeat: -1, yoyo: true,
          duration: 6, ease: "sine.inOut",
        });
      }

      /* ── hero glow parallax on scroll ── */
      if (heroGlowRef.current) {
        gsap.to(heroGlowRef.current, {
          yPercent: -22, ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* ── scroll reveals ── */
      reveals.forEach((el) =>
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.82, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        })
      );
      cards.forEach((el) =>
        gsap.to(el, {
          opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        })
      );

      /* ── stat counter animations ── */
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat   = stats[i];
        const isFloat = !Number.isInteger(stat.value);
        const obj    = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            if (stat.display.includes("$")) {
              el.textContent = `$${isFloat ? obj.val.toFixed(1) : Math.round(obj.val)}M`;
            } else if (stat.display.includes("%")) {
              el.textContent = `${obj.val.toFixed(1)}%`;
            } else if (stat.display.includes("hrs")) {
              el.textContent = `${Math.round(obj.val)}hrs`;
            } else if (stat.display.includes("+")) {
              el.textContent = `${Math.round(obj.val).toLocaleString()}+`;
            } else {
              el.textContent = Math.round(obj.val);
            }
          },
        });
      });

      /* ── stat card pop-in stagger ── */
      statCardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 24, scale: 0.92 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, ease: "back.out(1.4)",
            delay: i * 0.09,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      /* ── step cards stagger with slide-up ── */
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 30, scale: 0.94 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.65, ease: "back.out(1.3)",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      /* ── magnetic buttons ── */
      magneticRefs.current.forEach((btn) => {
        if (!btn) return;
        const onMove = (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width  / 2) * 0.16,
            y: (e.clientY - r.top  - r.height / 2) * 0.20,
            duration: 0.28, ease: "power3.out",
          });
        };
        const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
        btn.addEventListener("mousemove",  onMove);
        btn.addEventListener("mouseleave", onLeave);
        btn._onMove  = onMove;
        btn._onLeave = onLeave;
      });

      /* ── cursor-glow cards ── */
      cardGlowRefs.current.forEach((card) => {
        if (!card) return;
        const glow = card.querySelector("[data-inner-glow]");
        if (!glow) return;
        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          gsap.to(glow, { x: e.clientX - r.left, y: e.clientY - r.top, duration: 0.22, ease: "power2.out" });
        };
        const onEnter = () => {
          gsap.to(glow, { opacity: 1, duration: 0.22, ease: "power2.out" });
          gsap.to(card, { y: -5, borderColor: "rgba(255,255,255,0.20)", duration: 0.22, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(glow, { opacity: 0, duration: 0.28, ease: "power2.out" });
          gsap.to(card, { y: 0, borderColor: "rgba(255,255,255,0.10)", duration: 0.22, ease: "power2.out" });
        };
        card.addEventListener("mousemove",  onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        card._onMove  = onMove;
        card._onEnter = onEnter;
        card._onLeave = onLeave;
      });

      /* ── 3D tilt cards (big two-column cards) ── */
      tiltCardRefs.current.forEach((card) => {
        if (!card) return;
        const glow = card.querySelector("[data-inner-glow]");

        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const xPct = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
          const yPct = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
          gsap.to(card, {
            rotateX: -yPct * 4,
            rotateY:  xPct * 4,
            transformPerspective: 1200,
            duration: 0.35, ease: "power2.out",
          });
          if (glow) {
            gsap.to(glow, {
              x: e.clientX - r.left,
              y: e.clientY - r.top,
              duration: 0.22, ease: "power2.out",
            });
          }
        };
        const onEnter = () => {
          if (glow) gsap.to(glow, { opacity: 1, duration: 0.22, ease: "power2.out" });
          gsap.to(card, { y: -7, borderColor: "rgba(255,255,255,0.22)", scale: 1.01, duration: 0.25, ease: "power2.out" });
        };
        const onLeave = () => {
          if (glow) gsap.to(glow, { opacity: 0, duration: 0.28, ease: "power2.out" });
          gsap.to(card, {
            y: 0, rotateX: 0, rotateY: 0, scale: 1,
            borderColor: "rgba(255,255,255,0.10)",
            duration: 0.5, ease: "elastic.out(1, 0.4)",
          });
        };
        card.addEventListener("mousemove",  onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        card._onMove  = onMove;
        card._onEnter = onEnter;
        card._onLeave = onLeave;
      });

      /* ── step cards hover pulse ── */
      stepRefs.current.forEach((card) => {
        if (!card) return;
        const circle = card.querySelector("[data-step-circle]");
        const onEnter = () => {
          gsap.to(card,   { y: -6, scale: 1.04, duration: 0.22, ease: "power2.out" });
          if (circle) gsap.to(circle, { scale: 1.2, duration: 0.22, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(card,   { y: 0, scale: 1, duration: 0.35, ease: "elastic.out(1, 0.5)" });
          if (circle) gsap.to(circle, { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.5)" });
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        card._stepEnter = onEnter;
        card._stepLeave = onLeave;
      });

    }, page);

    return () => {
      magneticRefs.current.forEach((btn) => {
        if (!btn) return;
        btn.removeEventListener("mousemove",  btn._onMove);
        btn.removeEventListener("mouseleave", btn._onLeave);
      });
      cardGlowRefs.current.forEach((card) => {
        if (!card) return;
        card.removeEventListener("mousemove",  card._onMove);
        card.removeEventListener("mouseenter", card._onEnter);
        card.removeEventListener("mouseleave", card._onLeave);
      });
      tiltCardRefs.current.forEach((card) => {
        if (!card) return;
        card.removeEventListener("mousemove",  card._onMove);
        card.removeEventListener("mouseenter", card._onEnter);
        card.removeEventListener("mouseleave", card._onLeave);
      });
      stepRefs.current.forEach((card) => {
        if (!card) return;
        card.removeEventListener("mouseenter", card._stepEnter);
        card.removeEventListener("mouseleave", card._stepLeave);
      });
      ctx.revert();
    };
  }, []);

  /* ─── JSX ─────────────────────────────────────────── */
  return (
    <main ref={pageRef} className="overflow-hidden bg-[#06111d] text-white">

      {/* ══════ HERO ══════ */}
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

        <div className="site-container relative z-10 py-28 text-center md:py-32">
          <p
            data-hero-tag
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#004FEC]/22 bg-[#004FEC]/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8ef4ff]"
          >
            Zentiq Marketplace & Mover Network
          </p>

          <h1
            data-hero-title
            className={`${unbounded.className} mx-auto max-w-[18ch] text-[clamp(2.4rem,5.5vw,5.2rem)] font-[500] leading-[0.93] tracking-[-0.06em] text-white`}
          >
            The Largest Verified Moving Network in North America
          </h1>

          <p
            data-hero-text
            className="mx-auto mt-6 max-w-[52ch] text-[15px] leading-[1.9] text-white/65 md:text-[16px]"
          >
            Whether you run a moving company or planning your next relocation —
            Zentiq connects verified movers with real clients, transparently.
          </p>
        </div>
      </section>

      {/* ══════ TWO COLUMN CARDS ══════ */}
      <section className="relative overflow-hidden bg-[#06111d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,rgba(34,211,238,0.07),transparent_22%),radial-gradient(circle_at_90%_55%,rgba(129,140,248,0.07),transparent_22%)]" />

        <div className="site-container relative z-10 py-20 md:py-24">
          <div className="grid gap-5 lg:grid-cols-2">

            {/* For Moving Companies */}
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
                className="pointer-events-none absolute left-0 top-0 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004FEC]/16 opacity-0 blur-[60px]"
              />
              <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-[#004FEC]/10 blur-[80px]" />

              <div className="relative z-10">
                <div className="mb-7 inline-flex rounded-[12px] border border-[#004FEC]/25 bg-[#004FEC]/12 px-4 py-2">
                  <span className={`${unbounded.className} text-[0.85rem] font-[500] tracking-[-0.02em] text-[#004FEC]`}>
                    For Moving Companies
                  </span>
                </div>

                <div className="space-y-5">
                  {forMovers.map((item) => (
                    <div key={item.title} className="flex items-start gap-3.5">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#004FEC] shadow-[0_0_10px_rgba(34,211,238,0.80)]" />
                      <div>
                        <p className={`${unbounded.className} text-[0.9rem] font-[500] tracking-[-0.03em] text-white`}>
                          {item.title}
                        </p>
                        <p className="mt-1 text-[13px] leading-[1.75] text-white/60">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-[#004FEC]/30 via-white/8 to-transparent" />

                <Link
                  ref={(el) => (magneticRefs.current[0] = el)}
                  href="/contact"
                  className="mt-6 inline-flex h-[48px] w-full items-center justify-center rounded-[14px] bg-[#004FEC] text-[13px] font-semibold text-[#07111d] shadow-[0_10px_30px_rgba(34,211,238,0.24)] transition-all duration-200 hover:bg-[#43dff4]"
                >
                  Join the Mover Network →
                </Link>
              </div>
            </div>

            {/* For Clients */}
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
                className="pointer-events-none absolute left-0 top-0 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#818cf8]/16 opacity-0 blur-[60px]"
              />
              <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#818cf8]/10 blur-[80px]" />

              <div className="relative z-10">
                <div className="mb-7 inline-flex rounded-[12px] border border-[#818cf8]/30 bg-[#818cf8]/12 px-4 py-2">
                  <span className={`${unbounded.className} text-[0.85rem] font-[500] tracking-[-0.02em] text-[#a5b4fc]`}>
                    For Clients — Find a Mover
                  </span>
                </div>

                <div className="space-y-5">
                  {forClients.map((item) => (
                    <div key={item.title} className="flex items-start gap-3.5">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#818cf8] shadow-[0_0_10px_rgba(129,140,248,0.80)]" />
                      <div>
                        <p className={`${unbounded.className} text-[0.9rem] font-[500] tracking-[-0.03em] text-white`}>
                          {item.title}
                        </p>
                        <p className="mt-1 text-[13px] leading-[1.75] text-white/60">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-[#818cf8]/30 via-white/8 to-transparent" />

                <Link
                  ref={(el) => (magneticRefs.current[1] = el)}
                  href="/contact"
                  className="mt-6 inline-flex h-[48px] w-full items-center justify-center rounded-[14px] border border-[#818cf8]/30 bg-[#818cf8]/12 text-[13px] font-semibold text-[#a5b4fc] transition-all duration-200 hover:bg-[#818cf8]/22 hover:border-[#818cf8]/50"
                >
                  Find Verified Movers →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════ NETWORK SCALE STATS ══════ */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[#071420]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.06),transparent_30%)]" />

        <div className="site-container relative z-10 py-16 md:py-20">
          <p data-reveal className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
            Network Scale
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                ref={(el) => {
                  statCardRefs.current[index] = el;
                  cardGlowRefs.current[index + 2] = el;
                }}
                className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-[12px]"
              >
                <div
                  data-inner-glow
                  className="pointer-events-none absolute left-0 top-0 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[50px]"
                  style={{ backgroundColor: `${stat.color}28` }}
                />
                <div className="relative z-10">
                  <p
                    ref={(el) => (counterRefs.current[index] = el)}
                    className={`${unbounded.className} text-[1.6rem] font-[500] leading-none tracking-[-0.05em]`}
                    style={{ color: stat.color }}
                  >
                    0
                  </p>
                  <p className="mt-2 text-[11px] leading-[1.6] text-white/55">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section className="relative overflow-hidden bg-[#06111d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.06),transparent_28%)]" />

        <div className="site-container relative z-10 py-20 md:py-24">
          <div className="mb-12 text-center" data-reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/48">
              How It Works
            </p>
            <h2 className={`${unbounded.className} text-[clamp(2rem,4.5vw,3.6rem)] font-[500] leading-[0.95] tracking-[-0.055em] text-white`}>
              How the Marketplace Works
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => (stepRefs.current[index] = el)}
                className="group relative cursor-default overflow-hidden rounded-[20px] border p-5 text-center backdrop-blur-[12px]"
                style={{
                  borderColor: `${step.color}30`,
                  backgroundColor: `${step.color}0a`,
                }}
              >
                {/* inner glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${step.color}18, transparent 70%)` }}
                />

                <div className="relative z-10">
                  <div
                    data-step-circle
                    className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border text-[13px] font-bold"
                    style={{
                      borderColor: `${step.color}55`,
                      backgroundColor: `${step.color}18`,
                      color: step.color,
                      boxShadow: `0 0 16px ${step.color}40`,
                    }}
                  >
                    {step.number}
                  </div>
                  <p className={`${unbounded.className} text-[0.78rem] font-[500] leading-snug tracking-[-0.02em] text-white`}>
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-[1.5] text-white/55">
                    {step.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* connector arrows desktop */}
          <div className="mt-6 hidden items-center justify-between px-8 lg:flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 40 16" className="h-4 w-10 text-white/18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M0 8h32M26 3l6 5-6 5" />
              </svg>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#07131f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.11),transparent_30%)]" />

        <div className="site-container relative z-10 py-20 md:py-24">
          <div
            ref={(el) => (cardGlowRefs.current[10] = el)}
            data-card
            className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-6 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-[18px] md:px-10 md:py-12"
          >
            <div
              data-inner-glow
              className="pointer-events-none absolute left-0 top-0 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004FEC]/16 opacity-0 blur-[60px]"
            />
            <div className="absolute -left-12 top-0 h-36 w-36 rounded-full bg-[#004FEC]/12 blur-[80px]" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#818cf8]/10 blur-[90px]" />
            <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:52px_52px]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[700px]">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                  Ready to join?
                </p>
                <h2 className={`${unbounded.className} text-[clamp(2rem,4.4vw,3.6rem)] font-[500] leading-[0.96] tracking-[-0.05em] text-white`}>
                  Join the fastest growing mover network in North America.
                </h2>
                <p className="mt-5 max-w-[50ch] text-[15px] leading-[1.85] text-white/64">
                  Verified leads, transparent payments, and real growth — built
                  for professional moving companies and real clients alike.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  ref={(el) => (magneticRefs.current[2] = el)}
                  href="/contact"
                  className="inline-flex h-[48px] items-center justify-center rounded-[14px] bg-[#004FEC] px-6 text-[13px] font-semibold text-[#07111d] shadow-[0_12px_34px_rgba(34,211,238,0.24)] transition-[background,transform] duration-200 hover:bg-[#43dff4] hover:-translate-y-[1px]"
                >
                  Join the Network
                </Link>
                <Link
                  ref={(el) => (magneticRefs.current[3] = el)}
                  href="/contact"
                  className="inline-flex h-[48px] items-center justify-center rounded-[14px] border border-white/12 bg-white/5 px-6 text-[13px] font-medium text-white transition-[background,border-color,transform] duration-200 hover:border-white/22 hover:bg-white/10"
                >
                  Find a Mover
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}