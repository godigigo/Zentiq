import { unbounded } from "@/lib/fonts";

export const metadata = {
  title: "Blog | Zentiq",
  description: "Zentiq blog availability.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#06111d] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#07111d]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(129,140,248,0.12),transparent_26%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="site-container relative z-10 flex min-h-[620px] items-end py-28 md:py-32">
          <div className="max-w-[760px]">
            <p className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
              <span className="h-px w-10 bg-[#004FEC]/80" />
              Zentiq Journal
            </p>
            <h1
              className={`${unbounded.className} max-w-[12ch] text-[clamp(2.6rem,6vw,5.8rem)] font-[500] leading-[0.93] tracking-[-0.06em] text-white`}
            >
              Blog not available
            </h1>
            <p className="mt-7 max-w-[54ch] text-[15px] leading-[1.9] text-white/65 md:text-[16px]">
              I am not adding any blogs at this time. Please check back later
              for updates from Zentiq.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
