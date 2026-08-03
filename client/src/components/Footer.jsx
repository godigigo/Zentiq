"use client";

import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { label: "Residential Moving", href: "/services/residential-moving" },
  { label: "Commercial Moving", href: "/services/commercial-moving" },
  { label: "Long Distance Moving", href: "/services/long-distance-moving" },
  { label: "Packing & Storage", href: "/services/packing-storage" },
];

const contactLinks = [
  { label: "move@zentiq.ca", href: "mailto:move@zentiq.ca" },
  { label: "+18883920013", href: "tel:+18883920013" },
  { label: "Toronto, Ontario, Canada", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#07111d] text-white">
      {/* top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#004FEC]/60 to-transparent" />

      {/* soft background accents */}
      <div className="pointer-events-none absolute left-[-120px] top-[-80px] h-[220px] w-[220px] rounded-full bg-[#004FEC]/10 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-[-120px] right-[-80px] h-[240px] w-[240px] rounded-full bg-[#004FEC]/8 blur-[110px]" />

      <div className="site-container relative z-10 py-14 md:py-16 lg:py-20">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.15fr_0.85fr_0.95fr_1fr] lg:gap-14 lg:pb-12">
          {/* Brand */}
          <div className="max-w-[320px]">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Zentiq Home"
            >
              <div className="relative h-[52px] w-[190px]">
                <Image
                  src="/logo.jpeg"
                  alt="Zentiq Logo"
                  fill
                  sizes="190px"
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="mt-5 text-[14px] leading-[1.75] text-white/68">
              Modern moving and logistics solutions built for smooth local,
              long-distance, and commercial relocations with care, speed, and
              reliability.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 bg-white/5 text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[16px] w-[16px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="3.5" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 bg-white/5 text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[16px] w-[16px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v5h3v-5h2.2l.8-3H14v-1.6c0-.58.2-.9.9-.9H17V8h-2Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 bg-white/5 text-white transition-all duration-200 hover:border-white/20 hover:bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[16px] w-[16px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 11v8" />
                  <path d="M8 8.01 8.01 8" />
                  <path d="M12 19v-5a3 3 0 0 1 6 0v5" />
                  <path d="M12 11v8" />
                  <path d="M4 11v8" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[1rem] font-[500] leading-none tracking-[-0.04em] text-white">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-[14px] text-white/68 transition-all duration-200 hover:translate-x-[2px] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[1rem] font-[500] leading-none tracking-[-0.04em] text-white">
              Services
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-[14px] text-white/68 transition-all duration-200 hover:translate-x-[2px] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[1rem] font-[500] leading-none tracking-[-0.04em] text-white">
              Contact
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {contactLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-[14px] leading-[1.7] text-white/68 transition-all duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-[18px] border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/52">
                Open Hours
              </p>
              <p className="mt-2 text-[14px] text-white/72">
                Mon - Sat: 8:00 AM - 8:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="flex flex-col gap-4 pt-6 text-[13px] text-white/52 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Zentiq. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/privacy-policy"
              className="transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="transition-colors duration-200 hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
