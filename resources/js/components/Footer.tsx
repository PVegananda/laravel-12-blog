export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black py-8">
      <div className="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-400">
        <p className="text-lg font-semibold mb-3">Dearetna — Blog Keuangan</p>

        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Dearetna. All rights reserved.
        </p>

        <div className="flex justify-center gap-4 mt-4 opacity-80">
          <a href="https://instagram.com" target="_blank" className="hover:text-black dark:hover:text-white">Instagram</a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-black dark:hover:text-white">LinkedIn</a>
          <a href="mailto:dearetna@example.com" className="hover:text-black dark:hover:text-white">Email</a>
        </div>
      </div>
    </footer>
  );
}
