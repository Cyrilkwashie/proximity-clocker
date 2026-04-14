"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const THEME_KEY = "prox_theme";

interface ThemeContextType {
  dark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ dark: false, toggle: () => {} });

export function ThemeLayout({ children, className }: { children: ReactNode; className: string }) {
  const [dark, setDark] = useState(false);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark") setDark(true);
  }, []);

  function toggle() {
    setDark((d) => {
      const next = !d;
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <div className={`${dark ? "dark " : ""}${className}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
