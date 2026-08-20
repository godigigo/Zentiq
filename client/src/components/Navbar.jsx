"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

const services = [
  { label: "Local Movers", href: "/services/local-movers" },
  { label: "Long Distance Movers", href: "/services/long-distance-movers" },
  { label: "Packing Services", href: "/services/packing-services" },
  { label: "Moving Supplies", href: "/services/moving-supplies" },
  { label: "Junk Removal", href: "/services/junk-removal" },
  { label: "Storage Services", href: "/services/storage-services" },
];

export default function Navbar() {
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const dropdownRef = useRef(null);
  const mobilePanelRef = useRef(null);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { y: -18, opacity: 0 });
      gsap.set(logoRef.current, { y: 8, opacity: 0 });
      gsap.set(linksRef.current, { y: 8, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(navRef.current, { y: 0, opacity: 1, duration: 0.55 })
        .to(logoRef.current, { y: 0, opacity: 1, duration: 0.42 }, 0.08)
        .to(
          linksRef.current,
          { y: 0, opacity: 1, duration: 0.38, stagger: 0.045 },
          0.12
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!dropdownRef.current) return;

    if (servicesOpen) {
      gsap.killTweensOf(dropdownRef.current);
      gsap.set(dropdownRef.current, { display: "block", pointerEvents: "auto" });
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: 10, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: "power2.out" }
      );
    } else {
      gsap.killTweensOf(dropdownRef.current);
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: 8,
        scale: 0.985,
        duration: 0.18,
        ease: "power2.out",
        onComplete: () => {
          if (dropdownRef.current) {
            gsap.set(dropdownRef.current, { display: "none", pointerEvents: "none" });
          }
        },
      });
    }
  }, [servicesOpen]);

  useEffect(() => {
    if (!mobilePanelRef.current) return;

    if (mobileOpen) {
      gsap.killTweensOf(mobilePanelRef.current);
      gsap.set(mobilePanelRef.current, { display: "block", pointerEvents: "auto" });
      gsap.fromTo(
        mobilePanelRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" }
      );
    } else {
      gsap.killTweensOf(mobilePanelRef.current);
      gsap.to(mobilePanelRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.18,
        ease: "power2.out",
        onComplete: () => {
          if (mobilePanelRef.current) {
            gsap.set(mobilePanelRef.current, { display: "none", pointerEvents: "none" });
          }
        },
      });
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(event.target)) {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 top-0 z-[999] w-full px-4 pt-4 md:px-6 md:pt-5"
    >
      <nav
        ref={navRef}
        className="site-container flex h-[62px] items-center justify-between rounded-[18px] border border-white/12 bg-[#07111d]/88 px-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl md:h-[66px] md:px-5"
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          ref={logoRef}
          className="flex shrink-0 items-center"
          aria-label="Zentiq Home"
        >
          <div className="relative h-[52px] w-[190px] md:h-[95px] md:w-[120px]">
            <Image
              src="/logo.png"
              alt="Zentiq Logo"
              fill
              sizes="220px"
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden items-center lg:flex">
          <div className="flex items-center gap-0.5">
            <Link
              href="/"
              ref={(el) => (linksRef.current[0] = el)}
              className="inline-flex h-[38px] items-center rounded-[10px] px-3.5 text-[13px] font-medium text-white/90 transition-all duration-200 hover:bg-white/8 hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/about"
              ref={(el) => (linksRef.current[1] = el)}
              className="inline-flex h-[38px] items-center rounded-[10px] px-3.5 text-[13px] font-medium text-white/90 transition-all duration-200 hover:bg-white/8 hover:text-white"
            >
              About Us
            </Link>

            <Link
              href="/blog"
              ref={(el) => (linksRef.current[3] = el)}
              className="inline-flex h-[38px] items-center rounded-[10px] px-3.5 text-[13px] font-medium text-white/90 transition-all duration-200 hover:bg-white/8 hover:text-white"
            >
              Blog
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                ref={(el) => (linksRef.current[2] = el)}
                type="button"
                onClick={() => setServicesOpen((prev) => !prev)}
                className="inline-flex h-[38px] items-center gap-2 rounded-[10px] px-3.5 text-[13px] font-medium text-white/90 transition-all duration-200 hover:bg-white/8 hover:text-white"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <svg
                  viewBox="0 0 16 16"
                  className={`h-[10px] w-[10px] transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3.5 6 4.5 4 4.5-4" />
                </svg>
              </button>

              <div
                ref={dropdownRef}
                className="absolute right-0 top-[calc(100%+10px)] hidden min-w-[250px] rounded-[16px] border border-white/12 bg-[#0b1725]/98 p-2 text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl"
              >
                {services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="flex items-center justify-between rounded-[12px] px-4 py-3 text-[13px] font-medium text-white/88 transition-all duration-200 hover:bg-white/8 hover:text-white"
                    onClick={() => setServicesOpen(false)}
                  >
                    <span>{service.label}</span>
                    <svg
                      viewBox="0 0 16 16"
                      className="h-[11px] w-[11px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="ml-5 flex items-center gap-2.5">
            <Link
              href="/contact"
              ref={(el) => (linksRef.current[7] = el)}
              className="inline-flex h-[40px] items-center justify-center rounded-[12px] bg-[#004FEC] px-5 text-[13px] font-semibold text-[#07111d] shadow-[0_0_0_1px_rgba(34,211,238,0.18),0_10px_24px_rgba(34,211,238,0.18)] transition-all duration-200 hover:translate-y-[-1px] hover:bg-[#0047D4]"
            >
              Contact Us
            </Link>

            <div
              ref={(el) => (linksRef.current[8] = el)}
              className="flex items-center gap-1"
            >
              <Link
                href="https://www.instagram.com/zentiq.ca"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-[10px] text-white/68 transition-all duration-200 hover:bg-white/6 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[15px] w-[15px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                  <path d="M16.5 7.5h.01" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </Link>

              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-[10px] text-white/68 transition-all duration-200 hover:bg-white/6 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[15px] w-[15px]"
                  fill="currentColor"
                >
                  <path d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.6c0-.8.2-1.3 1.4-1.3H16V5.9c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.2v2.3H9v2.7h2.3v7h2.2Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Mobile Social + Hamburger ── */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex items-center gap-1">
            <Link
              href="https://www.instagram.com/zentiq.ca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-[10px] text-white/68 transition-all duration-200 hover:bg-white/6 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[15px] w-[15px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                <path d="M16.5 7.5h.01" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </Link>

            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-[10px] text-white/68 transition-all duration-200 hover:bg-white/6 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[15px] w-[15px]"
                fill="currentColor"
              >
                <path d="M13.5 21v-7h2.3l.4-2.7h-2.7V9.6c0-.8.2-1.3 1.4-1.3H16V5.9c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.2v2.3H9v2.7h2.3v7h2.2Z" />
              </svg>
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[12px] border border-white/12 bg-white/5 text-white transition-all duration-200 hover:bg-white/10"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile Panel ── */}
      <div
        ref={mobilePanelRef}
        className="site-container mt-3 hidden rounded-[18px] border border-white/12 bg-[#07111d]/94 p-3 text-white shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:hidden"
      >
        <div className="flex flex-col">
          <Link
            href="/"
            className="rounded-[12px] px-4 py-3 text-[14px] font-medium text-white/90 transition-colors duration-200 hover:bg-white/8 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/about"
            className="rounded-[12px] px-4 py-3 text-[14px] font-medium text-white/90 transition-colors duration-200 hover:bg-white/8 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </Link>

          <Link
            href="/blog"
            className="rounded-[12px] px-4 py-3 text-[14px] font-medium text-white/90 transition-colors duration-200 hover:bg-white/8 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            Blog
          </Link>

          <div className="rounded-[12px] px-4 py-3 text-[14px] font-medium text-white">
            <div className="mb-3 text-white/92">Services</div>
            <div className="space-y-1">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="block rounded-[10px] px-3 py-2 text-[13px] text-white/85 transition-colors duration-200 hover:bg-white/8 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-2 inline-flex h-[44px] items-center justify-center rounded-[12px] bg-[#004FEC] px-5 text-[13px] font-semibold text-[#07111d] transition-all duration-200 hover:bg-[#0047D4]"
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}