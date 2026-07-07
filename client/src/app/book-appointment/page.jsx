"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

const locationSuggestions = [
  "Toronto, ON",
  "Markham, ON",
  "Mississauga, ON",
  "Brampton, ON",
  "Scarborough, ON",
  "North York, ON",
  "Etobicoke, ON",
  "Vaughan, ON",
  "Richmond Hill, ON",
  "Pickering, ON",
  "Ajax, ON",
  "Oshawa, ON",
  "Hamilton, ON",
  "London, ON",
  "Windsor, ON",
  "Ottawa, ON",
  "Montreal, QC",
  "Laval, QC",
  "Quebec City, QC",
  "Calgary, AB",
  "Edmonton, AB",
  "Vancouver, BC",
  "Burnaby, BC",
  "Surrey, BC",
  "Victoria, BC",
  "Winnipeg, MB",
  "Halifax, NS",
];

const contactInfo = [
  {
    label: "Email",
    value: "info@zentiq.ca",
    href: "mailto:info@zentiq.ca",
  },
  {
    label: "Phone",
    value: "+1 (234) 659-9870",
    href: "tel:+12346599870",
  },
  {
    label: "Location",
    value: "Toronto, Ontario, Canada",
    href: "/contact",
  },
];

function FieldLabel({ children }) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/48">
      {children}
    </span>
  );
}

function CyberInput({ children }) {
  return (
    <div className="relative rounded-[15px] border border-white/10 bg-white/[0.04] transition-all duration-200 focus-within:border-[#004FEC]/40 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_0_1px_rgba(34,211,238,0.12)]">
      {children}
    </div>
  );
}

export default function GetQuotePage() {
  const pageRef = useRef(null);
  const cursorRef = useRef(null);
  const panelRef = useRef(null);
  const magneticRefs = useRef([]);
  const cardsRef = useRef([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    movingFrom: "",
    movingTo: "",
  });

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const filter = useCallback((val) => {
    if (!val || val.trim().length < 2) return [];
    return locationSuggestions
      .filter((s) => s.toLowerCase().includes(val.toLowerCase()))
      .slice(0, 6);
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((p) => ({ ...p, [name]: value }));
      setError("");
      setSubmitted(false);

      if (name === "movingFrom") {
        const r = filter(value);
        setFromSuggestions(r);
        setFromOpen(r.length > 0);
      }

      if (name === "movingTo") {
        const r = filter(value);
        setToSuggestions(r);
        setToOpen(r.length > 0);
      }
    },
    [filter]
  );

  const pickFrom = useCallback((val) => {
    setFormData((p) => ({ ...p, movingFrom: val }));
    setFromOpen(false);
    setFromSuggestions([]);
  }, []);

  const pickTo = useCallback((val) => {
    setFormData((p) => ({ ...p, movingTo: val }));
    setToOpen(false);
    setToSuggestions([]);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      setSubmitted(false);

      const checks = [
        [!formData.fullName.trim(), "Full Name is required."],
        [!formData.email.trim(), "Email is required."],
        [!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email), "Enter a valid email address."],
        [!formData.phone.trim(), "Phone Number is required."],
        [!formData.date, "Moving Date is required."],
        [new Date(formData.date) < new Date(minDate), "Please select a date from tomorrow onward."],
        [!formData.movingFrom.trim(), "Moving From is required."],
        [!formData.movingTo.trim(), "Moving To is required."],
      ];

      for (const [cond, msg] of checks) {
        if (cond) {
          setError(msg);
          return;
        }
      }

      setSubmitted(true);
      console.log("Quote lead:", formData);
    },
    [formData, minDate]
  );

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-reveal],[data-card],[data-top-action]", {
          opacity: 1,
          clearProps: "all",
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo("[data-reveal='eyebrow']", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 })
        .fromTo("[data-reveal='head']", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.72 }, 0.04)
        .fromTo("[data-reveal='sub']", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
        .fromTo("[data-top-action]", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, 0.18)
        .fromTo("[data-reveal='rail']", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, 0.18)
        .fromTo("[data-reveal='form']", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.75 }, 0.22);

      gsap.utils.toArray("[data-card]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
            },
          }
        );
      });

      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { boxShadow: "0 0 0 rgba(34,211,238,0)" },
          {
            boxShadow: "0 0 44px rgba(34,211,238,0.08)",
            duration: 2.3,
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
        btn._mm = onMove;
        btn._ml = onLeave;
      });

      cardsRef.current.forEach((card) => {
        if (!card || reduced) return;

        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          gsap.to(card, {
            rotateX: -((e.clientY - r.top) / r.height - 0.5) * 3.5,
            rotateY: ((e.clientX - r.left) / r.width - 0.5) * 5,
            transformPerspective: 900,
            transformOrigin: "center",
            duration: 0.28,
            ease: "power3.out",
          });
        };

        const onLeave = () =>
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.38,
            ease: "power3.out",
          });

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        card._mm = onMove;
        card._ml = onLeave;
      });
    }, page);

    const cursor = cursorRef.current;
    let raf;
    let mouse = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    const lerp = (a, b, t) => a + (b - a) * t;

    const onMM = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const tick = () => {
      pos.x = lerp(pos.x, mouse.x, 0.08);
      pos.y = lerp(pos.y, mouse.y, 0.08);
      if (cursor) {
        cursor.style.transform = `translate(${pos.x - 180}px, ${pos.y - 180}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMM);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMM);
      cancelAnimationFrame(raf);

      [...magneticRefs.current, ...cardsRef.current].forEach((el) => {
        if (!el) return;
        if (el._mm) el.removeEventListener("mousemove", el._mm);
        if (el._ml) el.removeEventListener("mouseleave", el._ml);
      });

      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-x-hidden bg-[#040b16] py-6 text-white md:py-8"
    >
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-0 h-[360px] w-[360px] rounded-full bg-[#004FEC]/[0.08] blur-[95px] will-change-transform"
      />

      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:54px_54px]"
      />

      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_82%_28%,rgba(34,211,238,0.06),transparent_20%),radial-gradient(circle_at_58%_82%,rgba(34,211,238,0.05),transparent_22%)]"
      />

      <section className="relative z-10">
        <div className="mx-auto w-full max-w-[1220px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mb-8 max-w-[680px] md:mb-10">
            <p
              data-reveal="eyebrow"
              className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/42"
            >
              Quote Request
            </p>

            <h1
              data-reveal="head"
              className={`${unbounded.className} max-w-[10ch] text-[clamp(2rem,5vw,3.7rem)] leading-[0.94] tracking-[-0.06em] text-white`}
            >
              Get your free moving quote
            </h1>

            <p
              data-reveal="sub"
              className="mt-4 max-w-[56ch] text-[14px] leading-[1.85] text-white/60 md:text-[15px]"
            >
              Fill in your move details below and our team will get back to you fast
              with a tailored quote.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                data-top-action
                ref={(el) => (magneticRefs.current[0] = el)}
                href="/services"
                className="inline-flex h-[42px] items-center justify-center rounded-[12px] bg-[#004FEC] px-5 text-[13px] font-semibold text-[#07111d] shadow-[0_0_0_1px_rgba(34,211,238,0.18),0_10px_24px_rgba(34,211,238,0.18)] transition-all duration-200 hover:translate-y-[-1px] hover:bg-[#0047D4]"
              >
                Browse services
              </Link>
            </div>
          </div>

          <div className="grid items-start gap-5 lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-6">
            <div data-reveal="rail" className="grid gap-3 self-start">
              {contactInfo.map((item, i) => {
                const card = (
                  <div
                    data-card
                    ref={(el) => (cardsRef.current[i] = el)}
                    className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.065),rgba(255,255,255,0.022))] px-4 py-4 transition duration-300 hover:border-[#004FEC]/24"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute right-0 top-0 h-16 w-16 rounded-full bg-[#004FEC]/10 blur-[50px]" />
                    <div className="relative z-10">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#8ef4ff]">
                        {item.label}
                      </p>
                      <p
                        className={`${unbounded.className} mt-2 text-[0.84rem] leading-[1.45] tracking-[-0.03em] text-white`}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <Link key={item.label} href={item.href} className="block">
                    {card}
                  </Link>
                );
              })}
            </div>

            <div data-reveal="form" className="min-w-0">
              <div
                ref={panelRef}
                className="relative overflow-hidden rounded-[26px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.03))] p-5 sm:p-6 md:p-7"
              >
                <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#004FEC]/10 blur-[80px]" />

                <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-4">
                  {error ? (
                    <div className="rounded-[14px] border border-red-400/25 bg-red-400/10 px-4 py-3 text-[13px] leading-snug text-red-200">
                      {error}
                    </div>
                  ) : null}

                  {submitted ? (
                    <div className="rounded-[14px] border border-[#004FEC]/28 bg-[#004FEC]/10 px-4 py-3 text-[13px] leading-snug text-[#baf8ff]">
                      Quote request received — our team will be in touch shortly.
                    </div>
                  ) : null}

                  <label className="flex flex-col gap-2">
                    <FieldLabel>Name</FieldLabel>
                    <CyberInput>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Name"
                        className="h-[52px] w-full bg-transparent px-4 text-[14px] text-white placeholder:text-white/30 outline-none"
                      />
                    </CyberInput>
                  </label>

                  <label className="flex flex-col gap-2">
                    <FieldLabel>Email Address</FieldLabel>
                    <CyberInput>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="h-[52px] w-full bg-transparent px-4 text-[14px] text-white placeholder:text-white/30 outline-none"
                      />
                    </CyberInput>
                  </label>

                  <label className="flex flex-col gap-2">
                    <FieldLabel>Phone</FieldLabel>
                    <CyberInput>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="h-[52px] w-full bg-transparent px-4 text-[14px] text-white placeholder:text-white/30 outline-none"
                      />
                    </CyberInput>
                  </label>

                  <label className="flex flex-col gap-2">
                    <FieldLabel>Choose Date</FieldLabel>
                    <CyberInput>
                      <input
                        type="date"
                        name="date"
                        min={minDate}
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="Choose Date"
                        className="h-[52px] w-full bg-transparent px-4 text-[14px] text-white outline-none [color-scheme:dark]"
                      />
                    </CyberInput>
                  </label>

                  <label className="flex flex-col gap-2">
                    <FieldLabel>Moving Form</FieldLabel>
                    <div className="relative">
                      <CyberInput>
                        <input
                          type="text"
                          name="movingFrom"
                          value={formData.movingFrom}
                          onChange={handleChange}
                          onFocus={() => setFromOpen(fromSuggestions.length > 0)}
                          onBlur={() => setTimeout(() => setFromOpen(false), 160)}
                          autoComplete="off"
                          placeholder="City or address"
                          className="h-[52px] w-full bg-transparent px-4 text-[14px] text-white placeholder:text-white/30 outline-none"
                        />
                      </CyberInput>

                      {fromOpen && fromSuggestions.length > 0 ? (
                        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-[14px] border border-white/10 bg-[#0b1522] shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
                          {fromSuggestions.map((s, idx) => (
                            <button
                              key={s}
                              type="button"
                              onMouseDown={() => pickFrom(s)}
                              className={`block w-full px-4 py-3 text-left text-[13px] text-white/78 transition hover:bg-white/[0.05] hover:text-[#8ef4ff] ${
                                idx !== fromSuggestions.length - 1 ? "border-b border-white/8" : ""
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </label>

                  <label className="flex flex-col gap-2">
                    <FieldLabel>Moving To</FieldLabel>
                    <div className="relative">
                      <CyberInput>
                        <input
                          type="text"
                          name="movingTo"
                          value={formData.movingTo}
                          onChange={handleChange}
                          onFocus={() => setToOpen(toSuggestions.length > 0)}
                          onBlur={() => setTimeout(() => setToOpen(false), 160)}
                          autoComplete="off"
                          placeholder="City or address"
                          className="h-[52px] w-full bg-transparent px-4 text-[14px] text-white placeholder:text-white/30 outline-none"
                        />
                      </CyberInput>

                      {toOpen && toSuggestions.length > 0 ? (
                        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-[14px] border border-white/10 bg-[#0b1522] shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
                          {toSuggestions.map((s, idx) => (
                            <button
                              key={s}
                              type="button"
                              onMouseDown={() => pickTo(s)}
                              className={`block w-full px-4 py-3 text-left text-[13px] text-white/78 transition hover:bg-white/[0.05] hover:text-[#8ef4ff] ${
                                idx !== toSuggestions.length - 1 ? "border-b border-white/8" : ""
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </label>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] leading-relaxed text-white/36">
                      Yourr Data is Safe with us.
                    </p>

                    <button
                      ref={(el) => (magneticRefs.current[2] = el)}
                      type="submit"
                      className="inline-flex h-[50px] shrink-0 items-center justify-center rounded-[15px] bg-[#004FEC] px-7 text-[13px] font-semibold text-[#07111d] shadow-[0_14px_34px_rgba(34,211,238,0.26)] transition duration-200 hover:bg-[#43dff4] hover:shadow-[0_18px_40px_rgba(34,211,238,0.34)]"
                    >
                      Submit Quote Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}