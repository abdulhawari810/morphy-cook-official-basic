import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";
const THEMES = ["light", "dark", "yellow", "system"];

/** Terapkan class theme ke elemen <html>. */
export const applyTheme = (theme) => {
  const root = document.documentElement;

  root.classList.remove("dark", "light", "yellow");

  if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    root.classList.toggle("dark", prefersDark);

    return;
  }

  root.classList.add(theme);
};

/**
 * Hook theme.
 *
 * Hanya komponen yang benar-benar mengubah theme (ThemeSection)
 * yang memakai `setTheme`; layout cukup membaca class dari <html>.
 * Ini menghindari duplikasi state theme di setiap layout.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "light",
  );

  useEffect(() => {
    if (!THEMES.includes(theme)) return;

    applyTheme(theme);

    localStorage.setItem(STORAGE_KEY, theme);

    //_ mode "system" harus ikut berubah saat OS theme berubah
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("system");

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = (next) => {
    setThemeState(THEMES.includes(next) ? next : "light");
  };

  return { theme, setTheme };
}