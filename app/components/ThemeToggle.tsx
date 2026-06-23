"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeToggleProps = {
  initialTheme: Theme;
};

export default function ThemeToggle({ initialTheme }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
    document.cookie = `theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }, [theme]);

  function toggleTheme() {
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-surface transition-colors"
      aria-label={nextTheme === "dark" ? "Dark-Mode aktivieren" : "Light-Mode aktivieren"}
    >
      {theme === "dark" ? (
        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.752 15.002A9.72 9.72 0 0118 15.75 9.75 9.75 0 018.25 6.248a9.75 9.75 0 0113.502-3.996zM21.752 15.002A9.75 9.75 0 0112.75 20.25a9.75 9.75 0 01-9.75-9.75 9.75 9.75 0 019.75-9.75c2.472 0 4.72.96 6.402 2.522z" />
        </svg>
      )}
    </button>
  );
}
