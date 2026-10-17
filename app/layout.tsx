import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drive the difference — ITZFIZZ",
  description:
    "A scroll-driven journey through the customer impact of ITZFIZZ pick-up points.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
