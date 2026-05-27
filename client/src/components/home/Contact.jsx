"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { unbounded } from "@/lib/fonts";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ITEMS = {
  email: {
    title: "Email",
    text: "Send us a message anytime",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 6.5h16A1.5 1.5 0 0 1 21.5 8v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Z" />
        <path d="m4 8 8 6 8-6" />
      </svg>
    ),
  },
  phone: {
    title: "Phone",
    text: "Speak with a moving specialist",
    value: "+123465987",
    href: "tel:+123465987",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.7 4.8h2.3c.36 0 .67.25.75.6l.62 2.72a.8.8 0 0 1-.23.76l-1.36 1.33a13.6 13.6 0 0 0 5.73 5.73l1.33-1.36a.8.8 0 0 1 .76-.23l2.72.62c.35.08.6.39.6.75v2.3a1.2 1.2 0 0 1-1.2 1.2h-.9C10.3 20.3 3.7 13.7 3.7 5.98v-.9a1.2 1.2 0 0 1 1.2-1.2Z" />
      </svg>
    ),
  },
  office: {
    title: "Office",
    text: "1247 XYZ Road West, ABC FL 34207",
    value: "Get directions",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[19px] w-[19px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20.3s6.2-4.08 6.2-10a6.2 6.2 0 1 0-12.4 0c0 5.92 6.2 10 6.2 10Z" />
        <circle cx="12" cy="10.3" r="2.2" />
      </svg>
    ),
  },
};

function ContactBlock({ item, itemRef, iconRef, office = false }) {
  return (
    <div ref={itemRef} className="group">
      <div
        ref={iconRef}
        className="mb-2.5 text-[#07111d] transition-transform duration-300"
      >
        {item.icon}
      </div>

      <h3
        className={`${unbounded.className} text-[clamp(1.08rem,1.1vw,1.34rem)] font-[400] leading-[0.98] tracking-[-0.04em] text-[#07111d]`}
      >
        {item.title}
      </h3>

      <p className="mt-1.5 text-[13px] leading-[1.5] text-[#07111d]/68">
        {item.text}
      </p>

      {office ? (
        <a
          href={item.href}
          className="mt-2.5 inline-flex items-center gap-2 text-[13px] font-medium text-[#07111d] transition-all duration-200 hover:gap-3"
        >
          {item.value}
          <svg
            viewBox="0 0 16 16"
            className="h-[10px] w-[10px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </a>
      ) : (
        <a
          href={item.href}
          className="mt-2 inline-block text-[13px] leading-[1.45] text-[#07111d]/82 underline decoration-[#07111d]/24 underline-offset-[3px] transition-colors duration-200 hover:text-[#07111d]"
        >
          {item.value}
        </a>
      )}
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const copyRef = useRef(null);
  const formRef = useRef(null);
  const itemRefs = useRef([]);
  const iconRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(labelRef.current, { y: 12, opacity: 0 });
      gsap.set(headingRef.current, { y: 20, opacity: 0 });
      gsap.set(copyRef.current, { y: 12, opacity: 0 });
      gsap.set(itemRefs.current, { y: 16, opacity: 0 });
      gsap.set(formRef.current, { x: 24, opacity: 0, scale: 0.985 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(labelRef.current, { y: 0, opacity: 1, duration: 0.35 })
        .to(headingRef.current, { y: 0, opacity: 1, duration: 0.58 }, 0.05)
        .to(copyRef.current, { y: 0, opacity: 1, duration: 0.42 }, 0.1)
        .to(
          itemRefs.current,
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.05 },
          0.14
        )
        .to(
          formRef.current,
          { x: 0, opacity: 1, scale: 1, duration: 0.62 },
          0.12
        );

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const icon = iconRefs.current[index];

        const enter = () => {
          gsap.to(item, { y: -1, duration: 0.18, ease: "power2.out" });
          if (icon) {
            gsap.to(icon, {
              rotate: index % 2 === 0 ? -3 : 3,
              y: -1.5,
              duration: 0.18,
              ease: "power2.out",
            });
          }
        };

        const leave = () => {
          gsap.to(item, { y: 0, duration: 0.18, ease: "power2.out" });
          if (icon) {
            gsap.to(icon, {
              rotate: 0,
              y: 0,
              duration: 0.18,
              ease: "power2.out",
            });
          }
        };

        item.addEventListener("mouseenter", enter);
        item.addEventListener("mouseleave", leave);

        item._enter = enter;
        item._leave = leave;
      });
    }, sectionRef);

    return () => {
      itemRefs.current.forEach((item) => {
        if (!item) return;
        if (item._enter) item.removeEventListener("mouseenter", item._enter);
        if (item._leave) item.removeEventListener("mouseleave", item._leave);
      });

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#d9eef2] text-[#07111d]"
    >
      <div className="site-container relative z-10 py-[40px] md:py-[46px] lg:py-[52px]">
        <div className="grid min-h-[50vh] grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_560px]">
          {/* Left content */}
          <div className="max-w-[520px]">
            <p
              ref={labelRef}
              className="mb-3 text-[11px] font-semibold tracking-[-0.01em] text-[#07111d]/78"
            >
              Connect
            </p>

            <h2
              ref={headingRef}
              className={`${unbounded.className} max-w-[340px] text-[clamp(2.1rem,3vw,3.5rem)] font-[400] leading-[0.92] tracking-[-0.05em] text-[#07111d]`}
            >
              Reach our team
            </h2>

            <p
              ref={copyRef}
              className="mt-3 max-w-[330px] text-[14px] leading-[1.52] text-[#07111d]/68"
            >
              We&apos;re here to answer your questions and start your move
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              <ContactBlock
                item={CONTACT_ITEMS.email}
                itemRef={(el) => (itemRefs.current[0] = el)}
                iconRef={(el) => (iconRefs.current[0] = el)}
              />
              <ContactBlock
                item={CONTACT_ITEMS.phone}
                itemRef={(el) => (itemRefs.current[1] = el)}
                iconRef={(el) => (iconRefs.current[1] = el)}
              />
            </div>

            <div className="mt-7 max-w-[260px]">
              <ContactBlock
                item={CONTACT_ITEMS.office}
                office
                itemRef={(el) => (itemRefs.current[2] = el)}
                iconRef={(el) => (iconRefs.current[2] = el)}
              />
            </div>
          </div>

          {/* Right form */}
          <div className="relative flex justify-center lg:justify-end">
            <div
              ref={formRef}
              className="w-full max-w-[560px] rounded-[26px] border border-[#07111d]/8 bg-white/55 p-5 shadow-[0_16px_38px_rgba(7,17,29,0.08)] backdrop-blur-[6px] sm:p-6"
            >
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[12px] font-medium text-[#07111d]/72">
                      Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className="h-[46px] w-full rounded-[14px] border border-[#07111d]/10 bg-white/80 px-4 text-[14px] text-[#07111d] outline-none transition-all duration-200 placeholder:text-[#07111d]/36 focus:border-[#07111d]/22 focus:bg-white focus:shadow-[0_0_0_4px_rgba(7,17,29,0.04)]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[12px] font-medium text-[#07111d]/72">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="hello@example.com"
                      className="h-[46px] w-full rounded-[14px] border border-[#07111d]/10 bg-white/80 px-4 text-[14px] text-[#07111d] outline-none transition-all duration-200 placeholder:text-[#07111d]/36 focus:border-[#07111d]/22 focus:bg-white focus:shadow-[0_0_0_4px_rgba(7,17,29,0.04)]"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-[12px] font-medium text-[#07111d]/72">
                    Mobile number
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 234 567 890"
                    className="h-[46px] w-full rounded-[14px] border border-[#07111d]/10 bg-white/80 px-4 text-[14px] text-[#07111d] outline-none transition-all duration-200 placeholder:text-[#07111d]/36 focus:border-[#07111d]/22 focus:bg-white focus:shadow-[0_0_0_4px_rgba(7,17,29,0.04)]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[12px] font-medium text-[#07111d]/72">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your move..."
                    className="w-full resize-none rounded-[14px] border border-[#07111d]/10 bg-white/80 px-4 py-3 text-[14px] leading-[1.55] text-[#07111d] outline-none transition-all duration-200 placeholder:text-[#07111d]/36 focus:border-[#07111d]/22 focus:bg-white focus:shadow-[0_0_0_4px_rgba(7,17,29,0.04)]"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex h-[46px] items-center justify-center rounded-[14px] bg-[#07111d] px-6 text-[13px] font-semibold text-white transition-all duration-200 hover:translate-y-[-1px] hover:bg-[#102031]"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}