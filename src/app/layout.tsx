import type { Metadata } from "next";
import { Inter } from "next/font/google";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dipendra Joshi — Creative Developer & Engineer",
  description: "Full Stack Developer portfolio — MERN stack, type-safe React/TypeScript, Node.js APIs, and production-grade web applications.",
  keywords: ["Full Stack Developer", "MERN Stack", "React", "TypeScript", "Node.js", "Dipendra Joshi"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#121212] text-white`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

