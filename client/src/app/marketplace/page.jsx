"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { unbounded } from "@/lib/fonts";

export default function MarketplacePage() {
  const pageRef = useRef(null);
  const glowRef = useRef(null);
  const cardRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          "[data-tag],[data-title],[data-text],[data-card],[data-actions]",
          { opacity: 1, clearProps: "all" }
        );
        return;
      }

      gsap.set("[data-tag]", { opacity: 0, x: -20 });
      gsap.set("[data-title]", { opacity: 0, y: 36, skewY: 1.5 });
      gsap.set("[data-text]", { opacity: 0, y: 22 });
      gsap.set("[data-card]", { opacity: 0, y: 30, scale: 0.985 });
      gsap.set("[data-actions]", { opacity: 0, y: 18 });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to("[data-tag]", { opacity: 1, x: 0, duration: 0.55 })
        .to(
          "[data-title]",
          { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
          0.08
        )
        .to("[data-text]", { opacity: 1, y: 0, duration: 0.7 }, 0.2)
        .to(
          "[data-card]",
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          0.18
        )
        .to("[data-actions]", { opacity: 1, y: 0, duration: 0.55 }, 0.32);

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          yPercent: -12,
          xPercent: 6,
          repeat: -1,
          yoyo: true,
          duration: 5,
          ease: "sine.inOut",
        });
      }

      if (cardRef.current) {
        const glow = cardRef.current.querySelector("[data-inner-glow]");

        const onMove = (e) => {
          const r = cardRef.current.getBoundingClientRect();

          if (glow) {
            gsap.to(glow, {
              x: e.clientX - r.left,
              y: e.clientY - r.top,
              duration: 0.22,
              ease: "power2.out",
            });
          }

          gsap.to(cardRef.current, {
            rotateX: -((e.clientY - r.top - r.height / 2) / 28),
            rotateY: (e.clientX - r.left - r.width / 2) / 28,
            transformPerspective: 1000,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const onEnter = () => {
          if (glow) {
            gsap.to(glow, { opacity: 1, duration: 0.22, ease: "power2.out" });
          }
          gsap.to(cardRef.current, {
            y: -6,
            borderColor: "rgba(255,255,255,0.18)",
            duration: 0.22,
            ease: "power2.out",
          });
        };

        const onLeave = () => {
          if (glow) {
            gsap.to(glow, { opacity: 0, duration: 0.28, ease: "power2.out" });
          }
          gsap.to(cardRef.current, {
            y: 0,
            rotateX: 0,
            rotateY: 0,
            borderColor: "rgba(255,255,255,0.10)",
            duration: 0.3,
            ease: "power3.out",
          });
        };

        cardRef.current.addEventListener("mousemove", onMove);
        cardRef.current.addEventListener("mouseenter", onEnter);
        cardRef.current.addEventListener("mouseleave", onLeave);

        cardRef.current._onMove = onMove;
        cardRef.current._onEnter = onEnter;
        cardRef.current._onLeave = onLeave;
      }

      if (buttonRef.current) {
        const onMove = (e) => {
          const r = buttonRef.current.getBoundingClientRect();
          gsap.to(buttonRef.current, {
            x: (e.clientX - r.left - r.width / 2) * 0.14,
            y: (e.clientY - r.top - r.height / 2) * 0.18,
            duration: 0.28,
            ease: "power3.out",
          });
        };

        const onLeave = () => {
          gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        buttonRef.current.addEventListener("mousemove", onMove);
        buttonRef.current.addEventListener("mouseleave", onLeave);

        buttonRef.current._onMove = onMove;
        buttonRef.current._onLeave = onLeave;
      }
    }, page);

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener("mousemove", cardRef.current._onMove);
        cardRef.current.removeEventListener("mouseenter", cardRef.current._onEnter);
        cardRef.current.removeEventListener("mouseleave", cardRef.current._onLeave);
      }

      if (buttonRef.current) {
        buttonRef.current.removeEventListener("mousemove", buttonRef.current._onMove);
        buttonRef.current.removeEventListener("mouseleave", buttonRef.current._onLeave);
      }

      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-[#06111d] text-white"
    >
      <div className="absolute inset-0 bg-[#07111d]" />

      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_80%_28%,rgba(34,211,238,0.10),transparent_20%),radial-gradient(circle_at_50%_80%,rgba(34,211,238,0.08),transparent_24%)]"
      />

      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <section className="site-container relative z-10 flex min-h-screen items-center justify-center py-28">
        <div className="w-full max-w-[820px] text-center">
          <p
            data-tag
            className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55"
          >
            <span className="h-px w-10 bg-[#22D3EE]/80" />
            Marketplace
            <span className="h-px w-10 bg-[#22D3EE]/80" />
          </p>

          <h1
            data-title
            className={`${unbounded.className} mx-auto max-w-[10ch] text-[clamp(2.8rem,6vw,5.8rem)] font-[500] leading-[0.92] tracking-[-0.065em] text-white`}
          >
            Marketplace is under construction
          </h1>

          <p
            data-text
            className="mx-auto mt-6 max-w-[44ch] text-[15px] leading-[1.9] text-white/68 md:text-[16px]"
          >
            We're currently building this section to make it cleaner, faster,
            and more useful. It will be available soon.
          </p>

          <div
            ref={cardRef}
            data-card
            className="group relative mx-auto mt-12 max-w-[560px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-8 text-left shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-[18px] md:p-10"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              data-inner-glow
              className="pointer-events-none absolute left-0 top-0 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22D3EE]/18 opacity-0 blur-[60px]"
            />

            <div className="pointer-events-none absolute -left-10 top-0 h-36 w-36 rounded-full bg-[#22D3EE]/12 blur-[80px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#22D3EE]/10 blur-[90px]" />

            <div className="relative z-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                Status
              </p>

              <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-[#22D3EE]/20 bg-[#22D3EE]/10 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#22D3EE] shadow-[0_0_18px_rgba(34,211,238,0.95)]" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8ef4ff]">
                  Under Development
                </span>
              </div>

              <div className="mt-7 h-px w-full bg-gradient-to-r from-[#22D3EE]/35 via-white/10 to-transparent" />

              <p className="mt-6 text-[14px] leading-[1.9] text-white/66">
                This page is currently being prepared and will be launched soon
                with the same Zentiq experience, smooth interactions, and a
                cleaner browsing flow.
              </p>
            </div>
          </div>

          <div data-actions className="mt-8 flex items-center justify-center">
            <Link
              ref={buttonRef}
              href="/"
              className="inline-flex h-[48px] items-center justify-center rounded-[14px] bg-[#22D3EE] px-6 text-[13px] font-semibold text-[#07111d] shadow-[0_12px_34px_rgba(34,211,238,0.24)] transition-[background,transform] duration-200 hover:bg-[#43dff4]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}