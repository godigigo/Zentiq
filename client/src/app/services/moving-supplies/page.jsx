"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  "Quality moving boxes",
  "Protective packing tools",
  "Reliable material options",
  "Expert supply guidance",
  "Move-ready essentials",
  "Carefully selected supplies",
];

const services = [
  {
    id: "boxes",
    title: "Moving boxes",
    short: "Essential box sizes for organized packing",
    category: "Boxes",
    body:
      "We offer moving boxes suitable for a wide range of household items, helping you pack more efficiently and keep belongings organized throughout the relocation process.",
    detail: [
      "Different sizes for varied items",
      "Simple and organized packing",
      "Designed for move preparation",
    ],
  },
  {
    id: "tape",
    title: "Packing tape & dispensers",
    short: "Secure closure for packed boxes",
    category: "Packing",
    body:
      "Strong packing tape and easy-to-use dispensers help seal boxes properly and support a more secure packing setup for local or long-distance moves.",
    detail: [
      "Reliable sealing support",
      "Easy handling during packing",
      "Helps reduce box opening in transit",
    ],
  },
  {
    id: "bubble",
    title: "Bubble wrap & protection",
    short: "Extra cushioning for delicate belongings",
    category: "Protection",
    body:
      "Bubble wrap helps protect fragile household items by adding a cushioning layer that reduces direct impact during packing, handling, and transport.",
    detail: [
      "Cushioning for breakables",
      "Flexible protective use",
      "Helpful for fragile item prep",
    ],
  },
  {
    id: "paper",
    title: "Packing paper for breakables",
    short: "Wrap support for dishes and décor",
    category: "Fragile",
    body:
      "Packing paper is ideal for wrapping dishes, glassware, and decorative items that need lighter layered protection inside boxes before moving.",
    detail: [
      "Useful for dishes and glassware",
      "Layered item protection",
      "Helps reduce surface friction",
    ],
  },
  {
    id: "mattress",
    title: "Mattress covers",
    short: "Protection from dust and dirt",
    category: "Covers",
    body:
      "Mattress covers help protect bedding from dust, dirt, and surface exposure while moving, making transport cleaner and more organized.",
    detail: [
      "Clean transport preparation",
      "Surface protection during moving",
      "Helpful for storage and relocation",
    ],
  },
  {
    id: "pads",
    title: "Furniture pads & blankets",
    short: "Soft protection for larger items",
    category: "Furniture",
    body:
      "Furniture pads and moving blankets provide an added layer of protection for sofas, tables, dressers, and other large items that need surface care during a move.",
    detail: [
      "Added protection for furniture",
      "Helps reduce scratches and scuffs",
      "Useful during loading and transport",
    ],
  },
];

function ServiceRow({ service, index, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const innerRef = useRef(null);
  const detailRef = useRef(null);
  const rowId = useId();
  const panelId = `service-panel-${rowId}`;
  const buttonId = `service-trigger-${rowId}`;

  useEffect(() => {
    const body = bodyRef.current;
    const inner = innerRef.current;
    if (!body || !inner) return;

    gsap.killTweensOf(body);
    gsap.killTweensOf(inner.querySelectorAll("[data-dot]"));

    if (isOpen) {
      gsap.set(body, { display: "block" });

      gsap.fromTo(
        body,
        { height: 0, opacity: 0 },
        {
          height: inner.offsetHeight,
          opacity: 1,
          duration: 0.52,
          ease: "power3.out",
          onComplete: () => {
            gsap.set(body, { height: "auto" });
          },
        }
      );

      if (detailRef.current) {
        const dots = detailRef.current.querySelectorAll("[data-dot]");
        gsap.fromTo(
          dots,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.06,
            duration: 0.38,
            ease: "power3.out",
            delay: 0.14,
          }
        );
      }
    } else {
      gsap.fromTo(
        body,
        { height: body.offsetHeight, opacity: 1 },
        {
          height: 0,
          opacity: 0,
          duration: 0.34,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(body, { display: "none" });
          },
        }
      );
    }
  }, [isOpen]);

  return (
    <div
      className={`group relative border-b transition-colors duration-300 ${
        isOpen ? "border-white/20" : "border-white/10"
      }`}
    >
      <button
        id={buttonId}
        onClick={() => onToggle(service.id)}
        className="flex w-full items-center gap-5 py-6 text-left md:py-7"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span
          className={`${unbounded.className} w-10 shrink-0 text-[13px] font-[500] tracking-[-0.03em] transition-colors duration-300 ${
            isOpen ? "text-[#004FEC]" : "text-white/30"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-center md:gap-6">
          <span
            className={`${unbounded.className} text-[1.12rem] font-[500] tracking-[-0.04em] transition-colors duration-300 md:text-[1.22rem] ${
              isOpen ? "text-white" : "text-white/82"
            }`}
          >
            {service.title}
          </span>

          <span
            className={`text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
              isOpen ? "text-[#004FEC]/80" : "text-white/34"
            }`}
          >
            {service.short}
          </span>
        </div>

        <div
          className={`ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "border-[#004FEC]/40 bg-[#004FEC]/12 text-[#004FEC]"
              : "border-white/12 bg-white/[0.04] text-white/40 group-hover:border-white/22 group-hover:text-white/70"
          }`}
          aria-hidden
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
          >
            <path
              d="M7 2v10M2 7h10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>

      <div
        ref={bodyRef}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="overflow-hidden"
        style={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          display: isOpen ? "block" : "none",
        }}
      >
        <div ref={innerRef} className="pb-7 pl-[3.75rem]">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
            <p className="max-w-[54ch] text-[15px] leading-[1.88] text-white/68">
              {service.body}
            </p>

            <div ref={detailRef} className="flex flex-col gap-3 lg:min-w-[220px]">
              {service.detail.map((d) => (
                <div
                  key={d}
                  data-dot
                  className="flex items-center gap-3 text-[13px] text-white/64"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#004FEC] shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MovingSuppliesPage() {
  const pageRef = useRef(null);
  const cursorRef = useRef(null);
  const spotlightRef = useRef(null);
  const magneticRefs = useRef([]);
  const [openId, setOpenId] = useState("boxes");
  const [benefitIndex, setBenefitIndex] = useState(0);

  const currentService =
    services.find((service) => service.id === openId) || services[0];

  const handleToggle = (id) => {
    setOpenId(id);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setBenefitIndex((i) => (i + 1) % benefits.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          "[data-h-tag],[data-h-title],[data-h-sub],[data-h-cta],[data-reveal],[data-strip],[data-acc-row]",
          { opacity: 1, clearProps: "all" }
        );
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-h-tag]",
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.48 }
        )
        .fromTo(
          "[data-h-title]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.78 },
          0.06
        )
        .fromTo(
          "[data-h-sub]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.64 },
          0.16
        )
        .fromTo(
          "[data-h-cta]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.56 },
          0.26
        );

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray("[data-acc-row]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -14 },
          {
            opacity: 1,
            x: 0,
            duration: 0.52,
            delay: i * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        "[data-strip]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-strip]",
            start: "top 88%",
            once: true,
          },
        }
      );

      magneticRefs.current.forEach((btn) => {
        if (!btn || reduced) return;

        const onMove = (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.12,
            y: (e.clientY - r.top - r.height / 2) * 0.16,
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

      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: page,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, page);

    const cursor = cursorRef.current;
    let raf;
    let mouse = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animateCursor = () => {
      pos.x = lerp(pos.x, mouse.x, 0.1);
      pos.y = lerp(pos.y, mouse.y, 0.1);
      if (cursor) {
        cursor.style.transform = `translate(${pos.x - 200}px, ${pos.y - 200}px)`;
      }
      raf = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);

      magneticRefs.current.forEach((btn) => {
        if (!btn) return;
        if (btn._onMove) btn.removeEventListener("mousemove", btn._onMove);
        if (btn._onLeave) btn.removeEventListener("mouseleave", btn._onLeave);
      });

      ctx.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className="relative overflow-hidden bg-[#06111d] text-white py-8">
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full bg-[#004FEC]/[0.06] blur-[100px] will-change-transform"
      />

      <header className="relative z-10 overflow-hidden border-b border-white/10 bg-[#07111d]/90 backdrop-blur-[12px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,211,238,0.12),transparent_22%),radial-gradient(circle_at_88%_80%,rgba(34,211,238,0.07),transparent_20%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="site-container relative z-10 py-16 md:py-22">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <nav
                data-h-tag
                className="mb-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/44"
              >
                <Link href="/services" className="transition-colors hover:text-white/70">
                  Services
                </Link>
                <span>/</span>
                <span className="text-white/70">Moving Supplies</span>
              </nav>

              <h1
                data-h-title
                className={`${unbounded.className} max-w-[9ch] text-[clamp(3.2rem,7vw,6.8rem)] font-[500] leading-[0.88] tracking-[-0.07em] text-white`}
              >
                Moving Supplies
              </h1>

              <p
                data-h-sub
                className="mt-6 max-w-[48ch] text-[15px] leading-[1.88] text-white/68 md:text-[16px]"
              >
                Quality moving supplies to help you pack, protect, and prepare
                your belongings for a smoother relocation.
              </p>
            </div>

            <div data-h-cta className="flex flex-col items-start gap-6 lg:items-end">
              <div className="relative h-10 w-[252px] overflow-hidden">
                {benefits.map((b, i) => (
                  <div
                    key={b}
                    className="absolute inset-0 flex items-center justify-center rounded-full border border-[#004FEC]/24 bg-[#004FEC]/8 px-5 text-[12px] font-semibold tracking-[0.12em] text-[#8ef4ff] transition-all duration-500"
                    style={{
                      opacity: i === benefitIndex ? 1 : 0,
                      transform: i === benefitIndex ? "translateY(0)" : "translateY(8px)",
                    }}
                  >
                    {b}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  ref={(el) => (magneticRefs.current[0] = el)}
                  href="/contact"
                  className="inline-flex h-[48px] items-center justify-center rounded-[14px] bg-[#004FEC] px-6 text-[13px] font-semibold text-[#07111d] shadow-[0_12px_34px_rgba(34,211,238,0.24)] transition-[background,transform] duration-200 hover:bg-[#43dff4]"
                >
                  Get in touch
                </Link>

                <Link
                  ref={(el) => (magneticRefs.current[1] = el)}
                  href="/contact"
                  className="inline-flex h-[48px] items-center justify-center rounded-[14px] border border-white/12 bg-white/5 px-6 text-[13px] font-medium text-white transition-[background,border-color,transform] duration-200 hover:border-white/22 hover:bg-white/10"
                >
                  Talk to our team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 bg-[#07111d]">
        <div className="site-container py-18 md:py-24">
          <div className="grid gap-14 lg:grid-cols-[280px_1fr] lg:gap-16 xl:grid-cols-[320px_1fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div data-reveal>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                  What's included
                </p>
                <h2
                  className={`${unbounded.className} text-[clamp(1.9rem,3.5vw,2.8rem)] font-[500] leading-[0.97] tracking-[-0.05em] text-white`}
                >
                  Supplies that help every move stay organized
                </h2>
                <p className="mt-5 text-[14px] leading-[1.88] text-white/62">
                  Open each section to see the moving supplies we offer and how
                  they help support safer packing and smoother relocation prep.
                </p>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-[#004FEC]/45 via-white/12 to-transparent" />

                <div className="mt-7 text-[12px] uppercase tracking-[0.16em] text-white/38">
                  Viewing: {currentService.title}
                </div>
              </div>
            </div>

            <div>
              <div className="border-t border-white/10">
                {services.map((service, index) => (
                  <div key={service.id} data-acc-row>
                    <ServiceRow
                      service={service}
                      index={index}
                      isOpen={openId === service.id}
                      onToggle={handleToggle}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden border-y border-white/10 bg-[#081623] py-6">
        <div data-strip className="flex items-center gap-0">
          {[...benefits, ...benefits, ...benefits].map((b, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-6 px-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/52"
            >
              {b}
              <span className="h-1.5 w-1.5 rounded-full bg-[#004FEC] shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </div>
          ))}
        </div>

        <style jsx>{`
          [data-strip] {
            animation: marquee 28s linear infinite;
            width: max-content;
          }
          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-33.333%);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            [data-strip] {
              animation: none;
            }
          }
        `}</style>
      </section>

      <section className="relative z-10 bg-[#06111d]">
        <div className="site-container py-18 md:py-24">
          <div
            ref={spotlightRef}
            data-reveal
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.065),rgba(255,255,255,0.028))] px-6 py-10 md:px-12 md:py-14"
          >
            <div className="absolute -left-16 -top-12 h-48 w-48 rounded-full bg-[#004FEC]/10 blur-[90px]" />
            <div className="absolute -bottom-12 right-0 h-48 w-48 rounded-full bg-[#004FEC]/8 blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                  Need moving supplies?
                </p>
                <h2
                  className={`${unbounded.className} max-w-[11ch] text-[clamp(2rem,4.2vw,3.6rem)] font-[500] leading-[0.95] tracking-[-0.055em] text-white`}
                >
                  Let's get your move prepared
                </h2>
                <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.85] text-white/64">
                  Tell us what supplies you need and we’ll help you choose the
                  right essentials for a more organized and better-protected move.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  ref={(el) => (magneticRefs.current[2] = el)}
                  href="/contact"
                  className="inline-flex h-[50px] items-center justify-center rounded-[14px] bg-[#004FEC] px-7 text-[13px] font-semibold text-[#07111d] shadow-[0_12px_34px_rgba(34,211,238,0.26)] transition-[background,transform] duration-200 hover:bg-[#43dff4]"
                >
                  Get in touch
                </Link>

                <Link
                  ref={(el) => (magneticRefs.current[3] = el)}
                  href="/services"
                  className="inline-flex h-[50px] items-center justify-center rounded-[14px] border border-white/14 bg-white/6 px-7 text-[13px] font-medium text-white transition-[background,border-color,transform] duration-200 hover:border-white/24 hover:bg-white/12"
                >
                  View all services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}