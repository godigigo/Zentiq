"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─────────────────────────────────────────── */

const principles = [
  {
    title: "Structured communication",
    text: "Every update, quote, and schedule is communicated in writing so nothing gets lost or misunderstood.",
  },
  {
    title: "Protected in transit",
    text: "Items are assessed, wrapped, and secured before loading — handled as if they were our own.",
  },
  {
    title: "On-time, every time",
    text: "We treat punctuality as a baseline standard, not an optional extra on moving day.",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell us about your move",
    text: "Share your origin, destination, date, and any special items. We prepare around your specifics, not a generic template.",
  },
  {
    number: "02",
    title: "Review your tailored plan",
    text: "We send a clear scope, timeline, and pricing — no hidden fees, no vague estimates. You approve before anything moves.",
  },
  {
    number: "03",
    title: "We handle the rest",
    text: "Our crew arrives prepared. You track progress and stay informed. We deliver, unload, and confirm completion with you.",
  },
];

const values = [
  {
    title: "Honest from day one",
    text: "We tell you what we can do, what it will cost, and how long it takes — before you commit.",
  },
  {
    title: "Improving with every job",
    text: "Every completed move feeds back into how we prepare, pack, and communicate on the next one.",
  },
  {
    title: "Accountable to outcomes",
    text: "We don't disappear after delivery. If something isn't right, we address it directly and quickly.",
  },
];

const stats = [
  { value: 100, suffix: "%", label: "Transparent pricing" },
  { value: 24, suffix: "h", label: "Quote turnaround" },
  { value: 0, suffix: " hidden fees", label: "Guaranteed" },
];

/* ─── COMPONENT ─────────────────────────────────────── */

export default function AboutPage() {
  const pageRef       = useRef(null);
  const heroBgRef     = useRef(null);
  const heroGlowRef   = useRef(null);
  const progressRef   = useRef(null);
  const counterRefs   = useRef([]);
  const magneticRefs  = useRef([]);
  const cardGlowRefs  = useRef([]);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      /* ── baseline set ── */
      const reveals = gsap.utils.toArray("[data-reveal]");
      const cards   = gsap.utils.toArray("[data-card]");

      if (reduced) {
        gsap.set(
          "[data-hero-tag],[data-hero-title],[data-hero-text],[data-hero-actions],[data-hero-panel],[data-reveal],[data-card]",
          { opacity: 1, clearProps: "all" }
        );
        return;
      }

      gsap.set(reveals, { opacity: 0, y: 36 });
      gsap.set(cards,   { opacity: 0, y: 28, scale: 0.982 });

      /* ── hero entrance ── */
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo("[data-hero-tag]",     { opacity: 0, x: -22 },           { opacity: 1, x: 0, duration: 0.55 })
        .fromTo("[data-hero-title]",   { opacity: 0, y: 44, skewY: 1.5 },{ opacity: 1, y: 0, skewY: 0, duration: 0.95 }, 0.08)
        .fromTo("[data-hero-text]",    { opacity: 0, y: 28 },            { opacity: 1, y: 0, duration: 0.72 }, 0.22)
        .fromTo("[data-hero-actions]", { opacity: 0, y: 22 },            { opacity: 1, y: 0, duration: 0.65 }, 0.36)
        .fromTo("[data-hero-panel]",   { opacity: 0, y: 32, scale: 0.984 },{ opacity: 1, y: 0, scale: 1, duration: 0.82 }, 0.20);

      /* ── hero parallax ── */
      gsap.to(heroBgRef.current, {
        yPercent: -10, ease: "none",
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(heroGlowRef.current, {
        yPercent: -20, xPercent: 8, ease: "none",
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
      });

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

      /* ── process progress line ── */
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1, ease: "none",
            scrollTrigger: {
              trigger: progressRef.current.parentElement,
              start: "top 75%", end: "bottom 65%", scrub: true,
            },
          }
        );
      }

      /* ── animated counters ── */
      counterRefs.current.forEach((el) => {
        if (!el) return;
        const target  = Number(el.dataset.value  ?? 0);
        const suffix  = el.dataset.suffix ?? "";
        const obj     = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
        });
      });

      /* ── step cards stagger ── */
      gsap.utils.toArray("[data-step-card]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: -28 },
          {
            opacity: 1, x: 0, duration: 0.72, ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: card, start: "top 86%", once: true },
          }
        );
      });

      /* ── magnetic buttons ── */
      magneticRefs.current.forEach((btn) => {
        if (!btn) return;
        const onMove = (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width  / 2) * 0.14,
            y: (e.clientY - r.top  - r.height / 2) * 0.18,
            duration: 0.28, ease: "power3.out",
          });
        };
        const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.35, ease: "power3.out" });
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
          gsap.to(card, { y: 0,  borderColor: "rgba(255,255,255,0.10)", duration: 0.22, ease: "power2.out" });
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
      cardGlowRefs.current.forEach((card) => {
        if (!card) return;
        card.removeEventListener("mousemove",  card._onMove);
        card.removeEventListener("mouseenter", card._onEnter);
        card.removeEventListener("mouseleave", card._onLeave);
      });
      ctx.revert();
    };
  }, []);

  /* ─── JSX ─────────────────────────────────────────── */
  return (
    <main ref={pageRef} className="overflow-hidden bg-[#06111d] text-white">

      {/* ══════════════ HERO ══════════════ */}
      {/* Purpose: Who Zentiq is */}
      <section
        data-hero
        className="relative isolate min-h-[100svh] overflow-hidden border-b border-white/10 bg-[#07111d]"
      >
        {/* bg image */}
        <div
          ref={heroBgRef}
          className="absolute inset-[-8%] bg-cover bg-center bg-no-repeat opacity-55 will-change-transform"
          style={{ backgroundImage: "url('/about-bg.jpg')" }}
        />
        {/* directional overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(4,11,20,0.95)_0%,rgba(4,11,20,0.85)_30%,rgba(4,11,20,0.40)_62%,rgba(4,11,20,0.78)_100%)]" />
        {/* glow layer (parallax) */}
        <div
          ref={heroGlowRef}
          className="pointer-events-none absolute inset-0 will-change-transform bg-[radial-gradient(circle_at_16%_18%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(34,211,238,0.10),transparent_22%)]"
        />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="site-container relative z-10 grid min-h-[100svh] items-end py-24 md:py-28 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-32">

          {/* left */}
          <div className="max-w-[760px]">
            <p
              data-hero-tag
              className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55"
            >
              <span className="h-px w-10 bg-[#22D3EE]/80" />
              About Zentiq
            </p>

            <h1
              data-hero-title
              className={`${unbounded.className} max-w-[8ch] text-[clamp(3rem,7vw,6.8rem)] font-[500] leading-[0.9] tracking-[-0.065em] text-white`}
            >
              Designed for the next era of moving
            </h1>

            <p
              data-hero-text
              className="mt-7 max-w-[55ch] text-[15px] leading-[1.9] text-white/70 md:text-[16px]"
            >
              Zentiq is a new moving and logistics company built around one
              conviction: relocation should feel like a managed service, not a
              stressful gamble. We handle the complexity so you can focus on
              what comes next.
            </p>

            <div data-hero-actions className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                ref={(el) => (magneticRefs.current[0] = el)}
                href="/contact"
                className="inline-flex h-[48px] items-center justify-center rounded-[14px] bg-[#22D3EE] px-6 text-[13px] font-semibold text-[#07111d] shadow-[0_12px_34px_rgba(34,211,238,0.26)] transition-[background,transform] duration-200 hover:bg-[#43dff4]"
              >
                Start your move
              </Link>
              <Link
                ref={(el) => (magneticRefs.current[1] = el)}
                href="/services"
                className="inline-flex h-[48px] items-center justify-center rounded-[14px] border border-white/12 bg-white/5 px-6 text-[13px] font-medium text-white backdrop-blur-md transition-[background,border-color,transform] duration-200 hover:border-white/22 hover:bg-white/10"
              >
                Explore services
              </Link>
            </div>
          </div>

          {/* right panel */}
          <div className="mt-14 lg:mt-0 lg:justify-self-end">
            <div
              data-hero-panel
              className="relative overflow-hidden rounded-[30px] border border-white/12 bg-white/[0.055] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-[20px] md:p-7"
            >
              <div className="pointer-events-none absolute -left-12 top-0 h-36 w-36 rounded-full bg-[#22D3EE]/14 blur-[80px]" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#22D3EE]/10 blur-[90px]" />

              <div className="relative z-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Our commitment
                </p>
                <p className="mt-4 text-[15px] leading-[1.85] text-white/76">
                  Every Zentiq move comes with a written plan, confirmed pricing,
                  and a dedicated point of contact — no chasing, no surprises,
                  no loose ends.
                </p>

                {/* animated stat counters */}
                <div className="mt-7 grid grid-cols-3 gap-3">
                  {stats.map((s, i) => (
                    <div key={s.label} className="rounded-[16px] border border-white/10 bg-black/15 px-3 py-4 text-center">
                      <div
                        ref={(el) => (counterRefs.current[i] = el)}
                        data-value={s.value}
                        data-suffix={s.suffix}
                        className={`${unbounded.className} text-[1.15rem] font-[500] tracking-[-0.04em] text-white`}
                      >
                        0{s.suffix}
                      </div>
                      <p className="mt-1 text-[11px] leading-[1.5] text-white/55">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-[#22D3EE]/45 via-white/12 to-transparent" />

                <p className="mt-5 text-[13px] leading-[1.8] text-white/55">
                  Operating across Canada — residential, commercial, and
                  long-distance relocation services.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ══════════════ WHY WE STARTED ══════════════ */}
      {/* Purpose: The problem Zentiq was created to solve */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#071420]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_30%,rgba(34,211,238,0.09),transparent_22%),radial-gradient(circle_at_86%_72%,rgba(34,211,238,0.06),transparent_24%)]" />

        <div className="site-container relative z-10 grid gap-12 py-20 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div data-reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              Why we started
            </p>
            <h2 className={`${unbounded.className} max-w-[9ch] text-[clamp(2.2rem,5vw,4.3rem)] font-[500] leading-[0.93] tracking-[-0.055em] text-white`}>
              Moving was overdue for a rethink
            </h2>
          </div>

          <div data-reveal className="grid gap-5">
            <p className="max-w-[62ch] text-[15px] leading-[1.9] text-white/72 md:text-[16px]">
              Most people dread moving — not because of the physical work, but
              because of the uncertainty. Unclear quotes, unreturned calls, and
              last-minute surprises are the industry norm. We built Zentiq to
              change that expectation from the ground up.
            </p>
            <p className="max-w-[62ch] text-[15px] leading-[1.9] text-white/72 md:text-[16px]">
              As a new company, we have the advantage of building our systems
              correctly from the start — no legacy habits, no shortcuts, just
              a clean and accountable service model designed around the
              customer's actual experience.
            </p>
          </div>
        </div>
      </section>


      {/* ══════════════ OPERATING STANDARDS ══════════════ */}
      {/* Purpose: How Zentiq operates day-to-day */}
      <section className="relative overflow-hidden bg-[#06111d]">
        <div className="site-container py-20 md:py-24">
          <div className="max-w-[760px]" data-reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              Operating standards
            </p>
            <h2 className={`${unbounded.className} text-[clamp(2.2rem,4.8vw,4rem)] font-[500] leading-[0.95] tracking-[-0.05em] text-white`}>
              The standards every job is held to
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((item, index) => (
              <article
                key={item.title}
                ref={(el) => (cardGlowRefs.current[index] = el)}
                data-card
                className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-[16px]"
              >
                <div
                  data-inner-glow
                  className="pointer-events-none absolute left-0 top-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22D3EE]/18 opacity-0 blur-[55px]"
                />
                <div className="relative z-10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#22D3EE]/22 bg-[#22D3EE]/10 text-[#86f2ff]">
                    <span className="text-[14px] font-semibold">0{index + 1}</span>
                  </div>
                  <h3 className={`${unbounded.className} text-[1.12rem] font-[500] tracking-[-0.04em] text-white`}>
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.85] text-white/66">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════ HOW IT WORKS ══════════════ */}
      {/* Purpose: Concrete steps a customer goes through */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[#081523]">
        <div className="site-container relative py-20 md:py-24">
          <div className="max-w-[760px]" data-reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              How it works
            </p>
            <h2 className={`${unbounded.className} text-[clamp(2.2rem,4.8vw,4rem)] font-[500] leading-[0.95] tracking-[-0.05em] text-white`}>
              Three steps. No surprises.
            </h2>
          </div>

          <div className="relative mt-12 grid gap-8 lg:grid-cols-[80px_1fr]">
            {/* animated vertical line */}
            <div className="relative hidden lg:block">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
              <div
                ref={progressRef}
                className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#22D3EE] via-[#62efff] to-transparent will-change-transform"
              />
            </div>

            <div className="grid gap-5">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  data-step-card
                  className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/15 p-6 backdrop-blur-[12px] md:p-7"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(34,211,238,0.07),transparent_28%,transparent_72%,rgba(34,211,238,0.04))]" />
                  <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[#22D3EE]/22 bg-[#22D3EE]/10 text-[#8ef4ff]">
                        <span className="text-[13px] font-semibold">{step.number}</span>
                      </div>
                      <div className="max-w-[620px]">
                        <h3 className={`${unbounded.className} text-[1.12rem] font-[500] tracking-[-0.04em] text-white`}>
                          {step.title}
                        </h3>
                        <p className="mt-3 text-[14px] leading-[1.85] text-white/66">
                          {step.text}
                        </p>
                      </div>
                    </div>
                    <div className="hidden h-2.5 w-2.5 shrink-0 rounded-full bg-[#22D3EE] shadow-[0_0_18px_rgba(34,211,238,0.90)] md:block" />
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="mt-6 h-px w-full bg-gradient-to-r from-white/8 via-white/5 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════ TEAM MINDSET ══════════════ */}
      {/* Purpose: Company culture & character — different from principles */}
      <section className="relative overflow-hidden bg-[#06111d]">
        <div className="site-container py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div data-reveal>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Team mindset
              </p>
              <h2 className={`${unbounded.className} max-w-[10ch] text-[clamp(2.2rem,4.8vw,4rem)] font-[500] leading-[0.95] tracking-[-0.05em] text-white`}>
                Small team. High standards.
              </h2>
              <p className="mt-5 max-w-[38ch] text-[15px] leading-[1.9] text-white/64">
                We are a lean team — which means every job gets real attention,
                not a call centre script. The people booking your move are the
                same people responsible for its outcome.
              </p>
            </div>

            <div className="grid gap-5">
              {values.map((item, index) => (
                <div
                  key={item.title}
                  ref={(el) => (cardGlowRefs.current[index + 3] = el)}
                  data-card
                  className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-[16px]"
                >
                  <div
                    data-inner-glow
                    className="pointer-events-none absolute left-0 top-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22D3EE]/16 opacity-0 blur-[55px]"
                  />
                  <div className="relative z-10">
                    <h3 className={`${unbounded.className} text-[1.08rem] font-[500] tracking-[-0.04em] text-white`}>
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-[60ch] text-[14px] leading-[1.9] text-white/66">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════ CTA ══════════════ */}
      {/* Purpose: Single clear action — no repeated keywords */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#07131f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.11),transparent_30%)]" />

        <div className="site-container relative z-10 py-20 md:py-24">
          <div
            data-card
            className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-6 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-[18px] md:px-10 md:py-12"
          >
            <div className="absolute -left-12 top-0 h-36 w-36 rounded-full bg-[#22D3EE]/12 blur-[80px]" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#22D3EE]/10 blur-[90px]" />
            <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:52px_52px]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[720px]">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Ready to move?
                </p>
                <h2 className={`${unbounded.className} text-[clamp(2rem,4.4vw,3.8rem)] font-[500] leading-[0.96] tracking-[-0.05em] text-white`}>
                  Tell us where you're going. We'll take it from there.
                </h2>
                <p className="mt-5 max-w-[55ch] text-[15px] leading-[1.85] text-white/68">
                  Get a written quote within 24 hours. No pressure, no vague
                  numbers — just a plan that actually fits your move.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  ref={(el) => (magneticRefs.current[2] = el)}
                  href="/contact"
                  className="inline-flex h-[48px] items-center justify-center rounded-[14px] bg-[#22D3EE] px-6 text-[13px] font-semibold text-[#07111d] shadow-[0_12px_34px_rgba(34,211,238,0.24)] transition-[background,transform] duration-200 hover:bg-[#43dff4]"
                >
                  Get a free quote
                </Link>
                <Link
                  ref={(el) => (magneticRefs.current[3] = el)}
                  href="/services"
                  className="inline-flex h-[48px] items-center justify-center rounded-[14px] border border-white/12 bg-white/5 px-6 text-[13px] font-medium text-white transition-[background,border-color,transform] duration-200 hover:border-white/22 hover:bg-white/10"
                >
                  View services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}