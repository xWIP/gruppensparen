// Aufgabe 7.4 - Layout und Navigation
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";
import ThemeToggle from "./components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaveSmart",
  description: "Verwalte deine Sparziele und behalte deinen Fortschritt im Blick.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialTheme = cookieStore.get("theme")?.value === "light" ? "light" : "dark";

  return (
    <html
      lang="de"
      data-theme={initialTheme}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <nav className="bg-surface/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">
            <Link href="/" className="text-lg font-bold text-accent tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              SaveSmart
            </Link>
            <div className="flex gap-8 items-center">
              <Link href="/" className="text-sm text-foreground hover:text-accent transition-colors font-medium">
                Start
              </Link>
              <Link href="/goals" className="text-sm text-muted hover:text-accent transition-colors">
                Sparziele
              </Link>
              <Link href="/about" className="text-sm text-muted hover:text-accent transition-colors">
                Über die App
              </Link>
              <ThemeToggle initialTheme={initialTheme} />
            </div>
          </div>
        </nav>
        <main className="flex-1 max-w-6xl mx-auto p-6 w-full">
          {children}
        </main>
        <footer className="border-t border-border mt-auto">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <p className="text-xs text-muted">SaveSmart</p>
            <p className="text-xs text-muted">Dein Sparbegleiter</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
