import { Link } from "@inertiajs/react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <header className="w-full py-6 px-6 lg:px-10 flex justify-between items-center bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">

      {/* LOGO */}
      <Link href="/" className="text-2xl font-extrabold tracking-wide">
        <span className="text-[#0A1A2F] dark:text-white">Dearetna</span>
      </Link>

      {/* NAVIGATION */}
      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link
          href="/"
          className="hover:text-[#C9A227] dark:hover:text-[#C9A227] transition"
        >
          Home
        </Link>

        <Link
          href="/posts"
          className="hover:text-[#C9A227] dark:hover:text-[#C9A227] transition"
        >
          All Posts
        </Link>

        {/* ⭐ NEW: ABOUT LINK */}
        <Link
          href="/about"
          className="hover:text-[#C9A227] dark:hover:text-[#C9A227] transition"
        >
          About
        </Link>

        <ThemeToggle />
      </nav>
    </header>
  );
}
