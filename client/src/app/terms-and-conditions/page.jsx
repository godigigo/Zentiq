"use client";

import Link from "next/link";

const sections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content:
      "By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this website or our services.",
  },
  {
    number: "02",
    title: "License to Use",
    content:
      "Zentiq grants you a limited, non-exclusive, non-transferable license to use this website subject to these Terms and Conditions. You may not modify or copy the materials, use them for any commercial purpose or public display, attempt to decompile or reverse engineer any software contained on the website, transfer the materials to another person, mirror the materials on another server, or violate any applicable laws or regulations.",
  },
  {
    number: "03",
    title: "Disclaimer of Warranties",
    content:
      'The materials on the Zentiq website are provided on an "as is" basis. Zentiq makes no warranties, expressed or implied, and disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
  },
  {
    number: "04",
    title: "Limitations of Liability",
    content:
      "In no event shall Zentiq or its suppliers be liable for any damages, including without limitation damages for loss of data, loss of profit, or business interruption, arising out of the use or inability to use the materials on the website, even if Zentiq or an authorized representative has been notified of the possibility of such damage.",
  },
  {
    number: "05",
    title: "Accuracy of Materials",
    content:
      "The materials appearing on the Zentiq website may include technical, typographical, or photographic errors. Zentiq does not warrant that any of the materials on its website are accurate, complete, or current. Zentiq may make changes to the materials contained on its website at any time without notice.",
  },
  {
    number: "06",
    title: "Links",
    content:
      "Zentiq has not reviewed all of the sites linked to its website and is not responsible for the contents of any linked site. The inclusion of any link does not imply endorsement by Zentiq. Use of any linked website is at the user's own risk.",
  },
  {
    number: "07",
    title: "Modifications",
    content:
      "Zentiq may revise these Terms and Conditions at any time without notice. By continuing to use this website, you agree to be bound by the then-current version of these terms.",
  },
  {
    number: "08",
    title: "Governing Law",
    content:
      "These Terms and Conditions are governed by and construed in accordance with the laws of Canada, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",
  },
  {
    number: "09",
    title: "Privacy Policy",
    content:
      "Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy, which explains how we collect, use, store, and protect information provided through our website.",
  },
  {
    number: "10",
    title: "User Responsibilities",
    content:
      "As a user of the website, you are responsible for maintaining the confidentiality of your account information and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password and must notify us immediately of any unauthorized use.",
  },
  {
    number: "11",
    title: "Service Quality",
    content:
      "Zentiq is committed to providing professional moving services. All quotes provided are estimates and may be subject to change based on additional services requested. Pricing is subject to the terms outlined in your applicable service agreement.",
  },
  {
    number: "12",
    title: "Prohibited Conduct",
    content:
      "You agree not to post or transmit through the website any unlawful, threatening, abusive, defamatory, obscene, or otherwise objectionable material. You also agree not to post commercial solicitations or chain letters. Violations of these terms may result in termination of access to our services.",
  },
];

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#07111d] text-white">
      {/* Top line */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px bg-gradient-to-r from-transparent via-[#004FEC] to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none fixed -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#004FEC]/10 blur-[130px]" />

      <div className="pointer-events-none fixed -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-[#004FEC]/10 blur-[140px]" />

      {/* Grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="site-container relative z-10 py-16 md:py-20 lg:py-24">
        {/* Header */}
        <header className="mx-auto mt-10 mb-14 max-w-4xl text-center md:mt-16 md:mb-20">
          {/* Legal badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#004FEC]/25 bg-[#004FEC]/10 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#004FEC] shadow-[0_0_10px_#004FEC]" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4d83ff]">
              Legal
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl">
            Terms & Conditions
          </h1>

          {/* Accent line */}
          <div className="mx-auto mb-7 h-px w-20 bg-gradient-to-r from-transparent via-[#004FEC] to-transparent" />

          {/* Intro paragraph */}
          <p className="mx-auto max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
            Please read these terms carefully before using our website and
            services. These terms outline the rules and conditions governing
            your use of Zentiq.
          </p>

          {/* Updated info */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/45">
            <span>Last updated</span>
            <span className="text-white/70">August 18, 2026</span>
          </div>
        </header>

        {/* Main content */}
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.number}>
                <h2 className="mb-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {section.number}. {section.title}
                </h2>

                <p className="text-[15px] leading-7 text-white/60 sm:text-base sm:leading-8">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          {/* Legal notice */}
          <div className="mt-14 border-t border-white/[0.08] pt-8">
            <h3 className="mb-3 text-sm font-semibold text-white">
              Important Notice
            </h3>

            <p className="text-sm leading-7 text-white/50">
              By continuing to access or use this website, you acknowledge
              that you have read, understood, and agreed to these Terms and
              Conditions. If you have any questions regarding these terms,
              please contact our team before using our services.
            </p>
          </div>

          {/* Bottom navigation */}
          <div className="mt-12 flex justify-start border-t border-white/[0.08] pt-8">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors duration-200 hover:text-[#4d83ff]"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">
                ←
              </span>

              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}