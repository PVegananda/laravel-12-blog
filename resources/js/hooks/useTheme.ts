// resources/js/hooks/useTheme.ts
import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") ?? "light"
      : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
