export const metadata = {
  title: "Moving Services | Zentiq",
  description:
    "Explore Zentiq's moving services, including local and long-distance movers, packing, storage, moving supplies, and junk removal.",
  keywords: [
    "moving services",
    "local movers",
    "long-distance movers",
    "packing services",
    "storage services",
    "junk removal",
  ],
  openGraph: {
    title: "Moving Services | Zentiq",
    description:
      "Professional moving, packing, storage, supplies, and junk removal services for residential and commercial relocations.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesLayout({ children }) {
  return children;
}