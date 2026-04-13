"use client";

import { useTheme } from "../context/ThemeContext";
import { ReactNode } from "react";

export function ThemeWrapper({ children, className }: { children: ReactNode; className: string }) {
  const { dark } = useTheme();
  return <div className={`${dark ? "dark " : ""}${className}`}>{children}</div>;
}
