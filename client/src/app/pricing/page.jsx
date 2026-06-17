"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "$99",
    unit: "/move",
    description:
      "Best for small local moves that need a clear plan, fast coordination, and no hidden surprises.",
    cta: "Get Started",
    href: "/contact",
    featured: false,
    features: [
      "Local move coordination",
      "Written quote",
      "Basic packing support",
      "Move scheduling assistance",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$249",
    unit: "/move",
    description:
      "A balanced plan for families and standard relocations with stronger support and smoother execution.",
    cta: "Choose Growth",
    href: "/contact",
    featured: true,
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "Priority scheduling",
      "Full packing coordination",
      "Dedicated move contact",
      "Real-time updates",
      "Phone & email support",
    ],
  },
  {
    name: "Premium",
    price: "$499",
    unit: "/move",
    description:
      "For large, high-value, or more complex moves that need white-glove care and higher attention.",
    cta: "Contact Us",
    href: "/contact",
    featured: false,
    features: [
      "Everything in Growth",
      "Special item handling",
      "White-glove coordination",
      "Flexible rescheduling",
      "Priority response",
      "Premium move planning",
    ],
  },
];

export default function PricingPage() {
  const pageRef = useRef(null);
  const heroGlowRef = useRef(null);
  const magneticRefs = useRef([]);
  const cardGlowRefs = useRef([]);

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
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.55 }
        )
        .fromTo(
          "[data-hero-title]",
          { opacity: 0, y: 40, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
          0.08
        )
        .fromTo(
          "[data-hero-text]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.22
        );

      if (heroGlowRef.current) {
        gsap.to(heroGlowRef.current, {
          yPercent: -18,
          xPercent: 6,
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
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 84%",
            once: true,
          },
        })
      );

      cards.forEach((el) =>
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        })
      );

      magneticRefs.current.forEach((btn) => {
        if (!btn) return;

        const onMove = (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.14,
            y: (e.clientY - r.top - r.height / 2) * 0.18,
            duration: 0.28,
            ease: "power3.out",
          });
        };

        const onLeave = () =>
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
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
          gsap.to(glow, {
            opacity: 1,
            duration: 0.22,
            ease: "power2.out",
          });
          gsap.to(card, {
            y: -6,
            borderColor: "rgba(255,255,255,0.18)",
            duration: 0.22,
            ease: "power2.out",
          });
        };

        const onLeave = () => {
          gsap.to(glow, {
            opacity: 0,
            duration: 0.28,
            ease: "power2.out",
          });
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
          ref={heroGlowRef}
          className="pointer-events-none absolute inset-0 will-change-transform bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_82%_24%,rgba(34,211,238,0.10),transparent_22%)]"
        />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="site-container relative z-10 py-28 md:py-32">
          <div className="mx-auto max-w-[820px] text-center">
            <p
              data-hero-tag
              className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55"
            >
              <span className="h-px w-10 bg-[#004FEC]/80" />
              Pricing
              <span className="h-px w-10 bg-[#004FEC]/80" />
            </p>

            <h1
              data-hero-title
              className={`${unbounded.className} mx-auto max-w-[10ch] text-[clamp(2.6rem,6vw,5.4rem)] font-[500] leading-[0.92] tracking-[-0.06em] text-white`}
            >
              Simple pricing for every kind of move
            </h1>

            <p
              data-hero-text
              className="mx-auto mt-6 max-w-[52ch] text-[15px] leading-[1.9] text-white/68 md:text-[16px]"
            >
              Clear plans, transparent pricing, and the same premium moving
              experience your brand already promises.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="relative overflow-hidden bg-[#06111d]">
        <div className="site-container py-20 md:py-24">
          <div className="max-w-[760px]" data-reveal>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              Choose your plan
            </p>
            <h2
              className={`${unbounded.className} text-[clamp(2.2rem,4.8vw,4rem)] font-[500] leading-[0.95] tracking-[-0.05em] text-white`}
            >
              Three plans. No confusion.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <article
                key={plan.name}
                ref={(el) => (cardGlowRefs.current[index] = el)}
                data-card
                className={`group relative overflow-hidden rounded-[26px] border p-6 backdrop-blur-[16px] md:p-7 ${
                  plan.featured
                    ? "border-[#004FEC]/30 bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(255,255,255,0.04))] shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
                    : "border-white/10 bg-white/[0.045]"
                }`}
              >
                <div
                  data-inner-glow
                  className="pointer-events-none absolute left-0 top-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#004FEC]/18 opacity-0 blur-[55px]"
                />

                {plan.featured && (
                  <>
                    <div className="pointer-events-none absolute -left-12 top-0 h-36 w-36 rounded-full bg-[#004FEC]/12 blur-[80px]" />
                    <div className="pointer-events-none absolute bottom-0 right-0 h-36 w-36 rounded-full bg-[#004FEC]/10 blur-[90px]" />
                  </>
                )}

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                        Plan
                      </p>
                      <h3
                        className={`${unbounded.className} mt-3 text-[1.35rem] font-[500] tracking-[-0.045em] text-white`}
                      >
                        {plan.name}
                      </h3>
                    </div>

                    {plan.badge && (
                      <span className="rounded-full border border-[#004FEC]/25 bg-[#004FEC]/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8ef4ff]">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-8 flex items-end gap-1">
                    <span
                      className={`${unbounded.className} text-[3rem] font-[500] leading-none tracking-[-0.06em] text-white`}
                    >
                      {plan.price}
                    </span>
                    <span className="mb-1.5 text-[13px] text-white/52">
                      {plan.unit}
                    </span>
                  </div>

                  <p className="mt-4 text-[14px] leading-[1.85] text-white/66">
                    {plan.description}
                  </p>

                  <div className="mt-6 h-px w-full bg-gradient-to-r from-[#004FEC]/25 via-white/10 to-transparent" />

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-[14px] leading-[1.75] text-white/72"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="mt-1 h-[14px] w-[14px] shrink-0 text-[#004FEC]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 8l3 3 7-7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    ref={(el) => (magneticRefs.current[index] = el)}
                    href={plan.href}
                    className={`mt-8 inline-flex h-[48px] items-center justify-center rounded-[14px] px-6 text-[13px] font-semibold transition-[background,transform,border-color] duration-200 ${
                      plan.featured
                        ? "bg-[#004FEC] text-[#07111d] shadow-[0_12px_34px_rgba(34,211,238,0.24)] hover:bg-[#43dff4]"
                        : "border border-white/12 bg-white/5 text-white hover:border-white/22 hover:bg-white/10"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SMALL CTA */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#07131f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.10),transparent_30%)]" />

        <div className="site-container relative z-10 py-20 md:py-24">
          <div
            data-card
            className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-6 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-[18px] md:px-10 md:py-12"
          >
            <div className="absolute -left-12 top-0 h-36 w-36 rounded-full bg-[#004FEC]/12 blur-[80px]" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#004FEC]/10 blur-[90px]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[680px]">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Need a custom quote?
                </p>
                <h2
                  className={`${unbounded.className} text-[clamp(2rem,4.4vw,3.6rem)] font-[500] leading-[0.96] tracking-[-0.05em] text-white`}
                >
                  Tell us about your move and we’ll recommend the right plan.
                </h2>
              </div>

              <Link
                ref={(el) => (magneticRefs.current[3] = el)}
                href="/contact"
                className="inline-flex h-[48px] items-center justify-center rounded-[14px] bg-[#004FEC] px-6 text-[13px] font-semibold text-[#07111d] shadow-[0_12px_34px_rgba(34,211,238,0.24)] transition-[background,transform] duration-200 hover:bg-[#43dff4]"
              >
                Get a free quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}