"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/60 text-slate-600 transition hover:bg-white hover:text-slate-900"
      aria-label={theme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
    >
      <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all" />
    </button>
  );
}
