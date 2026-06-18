"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  {
    label: "Phone",
    value: "+1 (234) 659-9870",
    href: "tel:+12346599870",
  },
  {
    label: "Email",
    value: "info@zentiq.ca",
    href: "mailto:hello@zentiq.com",
  },
  {
    label: "Address",
    value: "Toronto, Ontario, Canada",
    href: "/contact",
  },
];

export default function ContactPage() {
  const pageRef = useRef(null);
  const cursorRef = useRef(null);
  const magneticRefs = useRef([]);
  const cardsRef = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-reveal],[data-card]", { opacity: 1, clearProps: "all" });
        return;
      }

      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
        }
      );

      gsap.utils.toArray("[data-card]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { boxShadow: "0 0 0 rgba(34,211,238,0)" },
          {
            boxShadow: "0 0 40px rgba(34,211,238,0.08)",
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      }

      magneticRefs.current.forEach((btn) => {
        if (!btn || reduced) return;

        const onMove = (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.12,
            y: (e.clientY - r.top - r.height / 2) * 0.14,
            duration: 0.25,
            ease: "power3.out",
          });
        };

        const onLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
        btn._onMove = onMove;
        btn._onLeave = onLeave;
      });
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

    const animate = () => {
      pos.x = lerp(pos.x, mouse.x, 0.08);
      pos.y = lerp(pos.y, mouse.y, 0.08);
      if (cursor) {
        cursor.style.transform = `translate(${pos.x - 170}px, ${pos.y - 170}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animate);

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
    <main ref={pageRef} className="relative min-h-screen overflow-hidden bg-[#040b16] text-white">
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-0 h-[340px] w-[340px] rounded-full bg-[#004FEC]/[0.08] blur-[95px] will-change-transform"
      />

      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:54px_54px]"
      />

      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.06),transparent_20%),radial-gradient(circle_at_60%_80%,rgba(34,211,238,0.05),transparent_22%)]"
      />

      <section className="relative z-10">
        <div className="site-container py-20 md:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div data-reveal className="mb-10">
              <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white/42">
                Contact
              </p>
              <h1
                className={`${unbounded.className} text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-[-0.06em] text-white`}
              >
                Get in touch
              </h1>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="grid gap-4 self-start">
                {contactItems.map((item, i) => {
                  const isAddress = item.label === "Address";

                  const content = (
                    <div
                      key={item.label}
                      data-card
                      ref={(el) => (cardsRef.current[i] = el)}
                      className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-6 transition duration-300 hover:border-[#004FEC]/24 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]"
                    >
                      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#004FEC]/10 blur-[70px]" />
                      <div className="relative z-10">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#8ef4ff]">
                          {item.label}
                        </p>
                        <div
                          className={`${unbounded.className} mt-4 text-[1.02rem] leading-[1.4] tracking-[-0.04em] text-white`}
                        >
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );

                  if (isAddress) {
                    return (
                      <div key={item.label}>
                        {content}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      ref={(el) => (magneticRefs.current[i] = el)}
                      className="block"
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>

              <div data-reveal>
                <div
                  ref={formRef}
                  className="relative overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.03))] p-6 md:p-8"
                >
                  <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#004FEC]/10 blur-[80px]" />

                  <form className="relative z-10 grid gap-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/52">
                          Full name
                        </span>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          className="h-[54px] rounded-[16px] border border-white/10 bg-white/[0.04] px-4 text-[14px] text-white placeholder:text-white/28 outline-none transition duration-200 focus:border-[#004FEC]/42 focus:bg-white/[0.06]"
                        />
                      </label>

                      <label className="grid gap-2">
                        <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/52">
                          Email address
                        </span>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="h-[54px] rounded-[16px] border border-white/10 bg-white/[0.04] px-4 text-[14px] text-white placeholder:text-white/28 outline-none transition duration-200 focus:border-[#004FEC]/42 focus:bg-white/[0.06]"
                        />
                      </label>
                    </div>

                    <label className="grid gap-2">
                      <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/52">
                        Phone number
                      </span>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        className="h-[54px] rounded-[16px] border border-white/10 bg-white/[0.04] px-4 text-[14px] text-white placeholder:text-white/28 outline-none transition duration-200 focus:border-[#004FEC]/42 focus:bg-white/[0.06]"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/52">
                        Message
                      </span>
                      <textarea
                        rows={7}
                        placeholder="Write your message"
                        className="min-h-[180px] rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-4 text-[14px] text-white placeholder:text-white/28 outline-none transition duration-200 focus:border-[#004FEC]/42 focus:bg-white/[0.06]"
                      />
                    </label>

                    <div className="pt-2">
                      <button
                        ref={(el) => (magneticRefs.current[3] = el)}
                        type="submit"
                        className="inline-flex h-[52px] items-center justify-center rounded-[16px] bg-[#004FEC] px-7 text-[13px] font-semibold text-[#07111d] shadow-[0_14px_34px_rgba(34,211,238,0.26)] transition duration-200 hover:bg-[#43dff4]"
                      >
                        Send message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}