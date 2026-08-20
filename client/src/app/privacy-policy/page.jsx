"use client";

import Link from "next/link";

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    content:
      "Zentiq collects information you provide directly, such as your name, email address, phone number, moving details, service preferences, and payment information. We may also collect information about your location and property details necessary to provide accurate moving quotes and services.",
  },
  {
    number: "02",
    title: "How We Use Your Information",
    content:
      "We use your information to provide moving services, generate quotes, schedule appointments, process payments, communicate service updates, improve our services, and comply with legal obligations. Your information helps us deliver personalized moving solutions and maintain service quality.",
  },
  {
    number: "03",
    title: "Sharing of Information",
    content:
      "We may share your information with third-party service providers including payment processors, logistics partners, and insurance providers necessary to fulfill your moving services. We will not sell or rent your personal information. Information is shared only as necessary and under confidentiality agreements.",
  },
  {
    number: "04",
    title: "Data Security",
    content:
      "We implement industry-standard security measures including encryption, secure servers, and access controls to protect your information from unauthorized access, alteration, disclosure, or destruction. All payment information is processed securely through PCI-compliant payment systems.",
  },
  {
    number: "05",
    title: "Your Rights",
    content:
      "You have the right to access, correct, update, or delete your personal information at any time. You may also opt-out of marketing communications. To exercise these rights, please contact us at move@zentiq.ca or call +18883920013.",
  },
  {
    number: "06",
    title: "Legal Requirements",
    content:
      "We may disclose your information when required by law, court order, or governmental authority. We may also disclose information if necessary to protect our legal rights, prevent fraud, enforce our agreements, or protect the safety of our users and services.",
  },
  {
    number: "07",
    title: "Cookies and Tracking",
    content:
      "Our website uses cookies to enhance user experience, track website performance, and analyze usage patterns. You can control cookie settings through your browser. We do not use cookies to collect sensitive personal information without your consent.",
  },
  {
    number: "08",
    title: "Third-Party Links",
    content:
      "Our website may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party sites before providing your information.",
  },
  {
    number: "09",
    title: "Children's Privacy",
    content:
      "Zentiq does not knowingly collect personal information from children under 18 years old. If we become aware that a child has provided us with personal information, we will delete such information immediately and terminate the child's account.",
  },
  {
    number: "10",
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. The latest version will always be posted on our website with the effective date. Your continued use of our services constitutes acceptance of these changes.",
  },
];

export default function PrivacyPolicy() {
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
         

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl">
            Privacy Policy
          </h1>

          {/* Accent line */}
          <div className="mx-auto mb-7 h-px w-20 bg-gradient-to-r from-transparent via-[#004FEC] to-transparent" />

          {/* Intro paragraph */}
          <p className="mx-auto max-w-2xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
            We are committed to protecting your privacy. Please read this
            policy carefully to understand how we collect, use, and protect
            your information.
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
              By continuing to access or use the Zentiq website and services,
              you acknowledge that you have read, understood, and agreed to
              this Privacy Policy. If you have any questions regarding how we
              collect, use, or protect your information, please contact our
              team.
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