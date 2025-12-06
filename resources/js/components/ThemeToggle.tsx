// resources/js/components/ThemeToggle.tsx
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-3 py-1 rounded-lg border border-gray-400 dark:border-gray-600
                 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
