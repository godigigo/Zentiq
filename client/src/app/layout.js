import "./globals.css";
import { karla } from "@/lib/fonts";

export const metadata = {
  title: "Zentiq",
  description: "Modern moving and logistics website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={karla.className}>{children}</body>
    </html>
  );
}