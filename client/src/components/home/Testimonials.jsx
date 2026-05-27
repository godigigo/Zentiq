"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS_LEFT = [
  {
    id: 1,
    quote:
      "They treated our belongings like their own. Professional, on time, and genuinely caring about getting it right.",
    name: "Sarah Mitchell",
    meta: "Toronto, Ontario",
  },
  {
    id: 2,
    quote:
      "Moving across the country seemed overwhelming until we called. The team made it simple and affordable.",
    name: "James Chen",
    meta: "Calgary, Alberta",
  },
  {
    id: 3,
    quote:
      "From packing to delivery, everything was handled with precision. We'd use them again without hesitation.",
    name: "Emma Rodriguez",
    meta: "Vancouver, British Columbia",
  },
];

const TESTIMONIALS_RIGHT = [
  {
    id: 4,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    name: "Name Surname",
    meta: "Position, Company name",
  },
  {
    id: 5,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare.",
    name: "Name Surname",
    meta: "Position, Company name",
  },
];

function Stars() {
  return (
    <div className="mb-4 flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          className="h-[14px] w-[14px] fill-white/80"
          aria-hidden="true"
        >
          <path d="M8 1.3l1.8 3.64 4.02.58-2.91 2.84.69 4.01L8 10.48 4.4 12.37l.69-4.01L2.18 5.52l4.02-.58L8 1.3Z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ quote, name, meta, cardRef }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

  return (
    <article
      ref={cardRef}
      className="group relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0d545f] px-6 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:border-white/[0.12] hover:shadow-[0_14px_36px_rgba(0,0,0,0.20)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <Stars />

      <p className="relative z-[1] text-[15px] leading-[1.68] text-white/86">
        "{quote}"
      </p>

      <div className="relative z-[1] mt-6 flex items-center gap-3">
        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#1a8596]/60 text-[12px] font-semibold tracking-wide text-white ring-1 ring-white/14 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          {initials}
        </div>

        <div className="min-w-0">
          <p className="text-[14px] font-semibold leading-snug text-white">
            {name}
          </p>
          <p className="mt-[3px] text-[13px] leading-snug text-white/60">
            {meta}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const copyRef = useRef(null);
  const cardsRef = useRef([]);
  const glowLeftRef = useRef(null);
  const glowRightRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      gsap.set(headingRef.current, { y: 24, opacity: 0, filter: "blur(6px)" });
      gsap.set(copyRef.current, { y: 14, opacity: 0, filter: "blur(4px)" });
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 18,
        scale: 0.985,
        transformPerspective: 1200,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      tl.to(headingRef.current, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
      })
        .to(
          copyRef.current,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.55,
          },
          0.12
        )
        .to(
          cardsRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            clearProps: "transform",
          },
          0.2
        );

      gsap.to(glowLeftRef.current, {
        yPercent: -10,
        xPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(glowRightRef.current, {
        yPercent: 10,
        xPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      mm.add("(min-width: 1024px)", () => {
        gsap.to(gridRef.current?.querySelector(".testimonial-right-col"), {
          y: 10,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const handleMove = (e) => {
          const bounds = card.getBoundingClientRect();
          const relX = e.clientX - bounds.left;
          const relY = e.clientY - bounds.top;

          const rotateY = gsap.utils.mapRange(
            0,
            bounds.width,
            -4,
            4,
            relX
          );
          const rotateX = gsap.utils.mapRange(
            0,
            bounds.height,
            4,
            -4,
            relY
          );

          gsap.to(card, {
            rotateX,
            rotateY,
            y: -4,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
            transformPerspective: 1200,
            transformOrigin: "center center",
          });
        };

        const handleLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: true,
          });
        };

        const handleEnter = () => {
          gsap.to(card, {
            scale: 1.01,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);
        card.addEventListener("mouseenter", handleEnter);

        card._handleMove = handleMove;
        card._handleLeave = handleLeave;
        card._handleEnter = handleEnter;

        const stars = card.querySelectorAll("svg");
        const avatar = card.querySelector("div.rounded-full");

        gsap.fromTo(
          stars,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.03,
            ease: "power2.out",
            delay: 0.22 + index * 0.05,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );

        if (avatar) {
          gsap.fromTo(
            avatar,
            { scale: 0.88, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.42,
              ease: "back.out(1.6)",
              delay: 0.28 + index * 0.05,
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        if (card._handleMove) {
          card.removeEventListener("mousemove", card._handleMove);
        }
        if (card._handleLeave) {
          card.removeEventListener("mouseleave", card._handleLeave);
        }
        if (card._handleEnter) {
          card.removeEventListener("mouseenter", card._handleEnter);
        }
      });

      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a3f47] text-white"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={glowLeftRef}
          className="absolute left-[-8%] top-[4%] h-[380px] w-[380px] rounded-full bg-[#18c4d8]/8 blur-[120px]"
        />
        <div
          ref={glowRightRef}
          className="absolute bottom-[-10%] right-[-4%] h-[340px] w-[340px] rounded-full bg-[#14b8ca]/10 blur-[100px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_24%,rgba(255,255,255,0.018)_100%)]" />
      </div>

      <div className="site-container relative z-10 py-[72px] md:py-[88px]">
        {/* Section heading */}
        <div className="mb-14 text-center">
          <h2
            ref={headingRef}
            className={`${unbounded.className} mx-auto text-[clamp(2.4rem,4.5vw,4.2rem)] font-[400] leading-[0.96] tracking-[-0.04em] text-white`}
          >
            What our
            <br />
            customers say
          </h2>

          <p
            ref={copyRef}
            className="mx-auto mt-5 text-[14px] font-medium leading-[1.6] text-white/60"
          >
            Real stories from people we've moved
          </p>
        </div>

        {/* Two-column testimonial grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5"
        >
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {TESTIMONIALS_LEFT.map((item, index) => (
              <TestimonialCard
                key={item.id}
                quote={item.quote}
                name={item.name}
                meta={item.meta}
                cardRef={(el) => (cardsRef.current[index] = el)}
              />
            ))}
          </div>

          {/* Right column */}
          <div className="testimonial-right-col flex flex-col gap-4 lg:pt-[20px]">
            {TESTIMONIALS_RIGHT.map((item, index) => (
              <TestimonialCard
                key={item.id}
                quote={item.quote}
                name={item.name}
                meta={item.meta}
                cardRef={(el) =>
                  (cardsRef.current[TESTIMONIALS_LEFT.length + index] = el)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}