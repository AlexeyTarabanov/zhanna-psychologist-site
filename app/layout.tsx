import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Жанна Тарабанова — психолог",
  description: "Психологические консультации для взрослых и подростков: онлайн и очно в Санкт-Петербурге.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
