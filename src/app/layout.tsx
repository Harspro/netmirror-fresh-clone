// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Import global styles

// Configure the Inter font
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the page (optional but good practice)
export const metadata: Metadata = {
  title: "NetMirror Clone",
  description: "A simple NetMirror clone built with Next.js",
};

// Root Layout Component
// This component wraps your page content and provides the basic HTML structure
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply the font class to the body */}
      <body className={inter.className}>
        {/* Render the page content (page.tsx) here */}
        {children}
      </body>
    </html>
  );
}
