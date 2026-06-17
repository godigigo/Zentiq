"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─────────────────────────────────────────── */

const crmFeatures = [
  {
    title: "Lead Inbox",
    text: "All inbound leads in one place. Score, assign and follow up fast.",
    color: "#8b5cf6",
  },
  {
    title: "Pipeline View",
    text: "Kanban & list view of all deals. Drag-drop stage management.",
    color: "#2563eb",
  },
  {
    title: "Quote Builder",
    text: "Create & send branded quotes in minutes with e-signature.",
    color: "#004FEC",
  },
  {
    title: "Auto Follow-ups",
    text: "Automated SMS/email sequences to convert leads faster.",
    color: "#34d399",
  },
  {
    title: "Customer History",
    text: "Full timeline of every client — calls, moves, payments, notes.",
    color: "#fbbf24",
  },
];

const opsFeatures = [
  {
    title: "Smart Dispatch",
    text: "AI job-crew matching",
    color: "#004FEC",
    bg: "bg-[#004FEC]/10",
    border: "border-[#004FEC]/20",
  },
  {
    title: "Route Optimizer",
    text: "Fuel-efficient routing",
    color: "#2563eb",
    bg: "bg-[#2563eb]/10",
    border: "border-[#2563eb]/20",
  },
  {
    title: "Crew Scheduler",
    text: "Shift & availability mgmt",
    color: "#34d399",
    bg: "bg-[#34d399]/10",
    border: "border-[#34d399]/20",
  },
  {
    title: "Fleet Tracker",
    text: "Live GPS all vehicles",
    color: "#fbbf24",
    bg: "bg-[#fbbf24]/10",
    border: "border-[#fbbf24]/20",
  },
  {
    title: "Inventory Scan",
    text: "Barcode item tracking",
    color: "#8b5cf6",
    bg: "bg-[#8b5cf6]/10",
    border: "border-[#8b5cf6]/20",
  },
  {
    title: "Damage Claims",
    text: "Photo evidence log",
    color: "#f87171",
    bg: "bg-[#f87171]/10",
    border: "border-[#f87171]/20",
  },
];

const dashboardStats = [
  { value: 28, suffix: "", label: "Active Jobs", color: "#2563eb" },
  { value: 94, suffix: "%", label: "Completion", color: "#34d399" },
  { value: 48, suffix: "K", label: "This Month", color: "#fbbf24", prefix: "$" },
];

const chartBars = [
  { height: 28, color: "#2563eb" },
  { height: 44, color: "#3b82f6" },
  { height: 36, color: "#2563eb" },
  { height: 52, color: "#004FEC" },
  { height: 45, color: "#2563eb" },
  { height: 66, color: "#004FEC" },
  { height: 58, color: "#2563eb" },
];

const upcomingJobs = [
  {
    id: "JB-1042",
    route: "Toronto → Ottawa",
    when: "Today",
    status: "Confirmed",
    statusColor: "#34d399",
  },
  {
    id: "JB-1043",
    route: "Vancouver → Calgary",
    when: "Tomorrow",
    status: "In Prep",
    statusColor: "#fbbf24",
  },
  {
    id: "JB-1044",
    route: "Montreal → Toronto",
    when: "Jun 6",
    status: "Pending",
    statusColor: "#8b5cf6",
  },
  {
    id: "JB-1045",
    route: "Calgary → Edmonton",
    when: "Jun 7",
    status: "Confirmed",
    statusColor: "#34d399",
  },
];

/* ─── COMPONENT ─────────────────────────────────────── */

export default function MoversPage() {
  const pageRef = useRef(null);
  const glowRef = useRef(null);
  const heroGlowRef = useRef(null);

  const magneticRefs = useRef([]);
  const cardGlowRefs = useRef([]);
  const tiltCardRefs = useRef([]);
  const counterRefs = useRef([]);
  const barRefs = useRef([]);
  const listItemRefs = useRef([]);
  const opsItemRefs = useRef([]);
  const jobRowRefs = useRef([]);

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

      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat = dashboardStats[i];
        const obj = { val: 0 };

        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${stat.prefix ?? ""}${Math.round(obj.val)}${stat.suffix}`;
          },
        });
      });

      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        gsap.fromTo(
          bar,
          { height: 0, opacity: 0 },
          {
            height: `${chartBars[i].height}%`,
            opacity: 1,
            duration: 0.75,
            ease: "back.out(1.4)",
            delay: i * 0.06,
            scrollTrigger: { trigger: bar, start: "top 95%", once: true },
          }
        );
      });

      listItemRefs.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power2.out",
            delay: i * 0.06,
            scrollTrigger: { trigger: item, start: "top 92%", once: true },
          }
        );
      });

      opsItemRefs.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 16, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.25)",
            delay: i * 0.05,
            scrollTrigger: { trigger: item, start: "top 95%", once: true },
          }
        );
      });

      jobRowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { opacity: 0, x: 14 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power2.out",
            delay: i * 0.07,
            scrollTrigger: { trigger: row, start: "top 96%", once: true },
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

  return (
    <main ref={pageRef} className="overflow-hidden bg-[#06111d] text-white">
      {/* HERO */}
      <section
        data-hero
        className="relative isolate overflow-hidden border-b border-white/10 bg-[#07111d]"
      >
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
          <div className="max-w-[940px]">
            <p
              data-hero-tag
              className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55"
            >
              <span className="h-px w-10 bg-[#8b5cf6]/80" />
              For Moving Companies
            </p>

            <h1
              data-hero-title
              className={`${unbounded.className} max-w-[16ch] text-[clamp(2.4rem,5.5vw,5rem)] font-[500] leading-[0.93] tracking-[-0.06em] text-white`}
            >
              The All-in-One CRM & Operations Platform for Movers
            </h1>

            <p
              data-hero-text
              className="mt-6 max-w-[54ch] text-[15px] leading-[1.9] text-white/65 md:text-[16px]"
            >
              Manage leads, quotes, dispatch, fleet, jobs, crew, and live
              operations from one premium system built for modern movers.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="relative overflow-hidden bg-[#06111d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,rgba(34,211,238,0.07),transparent_22%),radial-gradient(circle_at_90%_55%,rgba(129,140,248,0.07),transparent_22%)]" />

        <div className="site-container relative z-10 py-20 md:py-24">
          <div className="grid gap-5 xl:grid-cols-[1.18fr_0.58fr_1fr]">
            {/* CRM CARD */}
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
                className="pointer-events-none absolute left-0 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6]/16 opacity-0 blur-[60px]"
              />
              <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-[#8b5cf6]/10 blur-[80px]" />

              <div className="relative z-10">
                <div className="mb-7 inline-flex rounded-[12px] border border-[#8b5cf6]/25 bg-[#8b5cf6]/12 px-4 py-2">
                  <span className={`${unbounded.className} text-[0.85rem] font-[500] tracking-[-0.02em] text-[#b794f6]`}>
                    CRM & Lead Management
                  </span>
                </div>

                <div className="space-y-5">
                  {crmFeatures.map((item, index) => (
                    <div
                      key={item.title}
                      ref={(el) => (listItemRefs.current[index] = el)}
                      className="flex items-start gap-3.5"
                    >
                      <span
                        className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor: item.color,
                          boxShadow: `0 0 12px ${item.color}`,
                        }}
                      />
                      <div>
                        <p
                          className={`${unbounded.className} text-[0.92rem] font-[500] tracking-[-0.03em] text-white`}
                        >
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

            {/* OPS CARD */}
            <div
              ref={(el) => {
                tiltCardRefs.current[1] = el;
                cardGlowRefs.current[1] = el;
              }}
              data-card
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-[16px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                data-inner-glow
                className="pointer-events-none absolute left-0 top-0 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004FEC]/16 opacity-0 blur-[60px]"
              />
              <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-[#004FEC]/10 blur-[80px]" />

              <div className="relative z-10">
                <div className="mb-6 inline-flex rounded-[12px] border border-[#004FEC]/25 bg-[#004FEC]/12 px-4 py-2">
                  <span className={`${unbounded.className} text-[0.85rem] font-[500] tracking-[-0.02em] text-[#004FEC]`}>
                    Dispatch & Ops
                  </span>
                </div>

                <div className="space-y-3">
                  {opsFeatures.map((item, index) => (
                    <div
                      key={item.title}
                      ref={(el) => (opsItemRefs.current[index] = el)}
                      className={`rounded-[16px] border px-4 py-3 ${item.bg} ${item.border}`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor: item.color,
                            boxShadow: `0 0 12px ${item.color}`,
                          }}
                        />
                        <div>
                          <p className="text-[13px] font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-[1.55] text-white/55">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DASHBOARD CARD */}
            <div
              ref={(el) => {
                tiltCardRefs.current[2] = el;
                cardGlowRefs.current[2] = el;
              }}
              data-card
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-[16px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                data-inner-glow
                className="pointer-events-none absolute left-0 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004FEC]/14 opacity-0 blur-[60px]"
              />
              <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-[#2563eb]/10 blur-[80px]" />

              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                    Live Dashboard Preview
                  </p>
                </div>

                {/* Top stat boxes */}
                <div className="grid grid-cols-3 gap-3">
                  {dashboardStats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="rounded-[16px] border border-white/10 bg-black/15 px-3 py-4 text-center"
                    >
                      <div
                        ref={(el) => (counterRefs.current[index] = el)}
                        className={`${unbounded.className} text-[1.45rem] font-[500] leading-none tracking-[-0.05em]`}
                        style={{ color: stat.color }}
                      >
                        0
                      </div>
                      <p className="mt-1 text-[11px] leading-[1.5] text-white/55">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Revenue chart */}
                <div className="mt-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/42">
                    Weekly Revenue ($K)
                  </p>

                  <div className="mt-5 flex h-[110px] items-end gap-3">
                    {chartBars.map((bar, index) => (
                      <div
                        key={index}
                        className="flex h-full flex-1 items-end"
                      >
                        <div
                          ref={(el) => (barRefs.current[index] = el)}
                          className="w-full rounded-t-[6px] opacity-0"
                          style={{
                            height: "0%",
                            backgroundColor: bar.color,
                            boxShadow: `0 0 16px ${bar.color}40`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-white/10 via-white/7 to-transparent" />

                {/* Upcoming jobs */}
                <div className="mt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/42">
                    Upcoming Jobs
                  </p>

                  <div className="mt-4 space-y-3">
                    {upcomingJobs.map((job, index) => (
                      <div
                        key={job.id}
                        ref={(el) => (jobRowRefs.current[index] = el)}
                        className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 text-[11px] text-white/62"
                      >
                        <span className="font-semibold text-white/80">{job.id}</span>
                        <span>{job.route}</span>
                        <span>{job.when}</span>
                        <span
                          className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                          style={{
                            color: job.statusColor,
                            backgroundColor: `${job.statusColor}18`,
                            border: `1px solid ${job.statusColor}30`,
                          }}
                        >
                          {job.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-4" data-reveal>
            <Link
              ref={(el) => (magneticRefs.current[0] = el)}
              href="/contact"
              className="inline-flex h-[48px] items-center justify-center rounded-[14px] bg-[#004FEC] px-6 text-[13px] font-semibold text-[#07111d] shadow-[0_12px_34px_rgba(34,211,238,0.24)] transition-[background,transform] duration-200 hover:bg-[#43dff4] hover:-translate-y-[1px]"
            >
              Book a Demo
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
      </section>
    </main>
  );
}