import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Head } from "@inertiajs/react";

export default function About() {
  return (
    <>
      <Head title="Tentang Dearetna" />

      <Navbar />

      <main className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">

          <h1 className="text-4xl font-bold">Tentang Dearetna</h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Dearetna adalah blog finansial yang dibuat untuk membantu masyarakat 
            memahami dunia keuangan dengan cara yang sederhana, elegan, dan mudah dipahami.
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Kami membahas topik seperti investasi, pengelolaan uang, perencanaan masa depan,
            dan strategi finansial modern yang dapat diterapkan oleh semua kalangan.
          </p>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Sosial Media</h2>
            <div className="flex justify-center gap-6 text-lg">
              <a href="#" className="hover:text-[#C9A227] transition">Instagram</a>
              <a href="#" className="hover:text-[#C9A227] transition">LinkedIn</a>
              <a href="#" className="hover:text-[#C9A227] transition">YouTube</a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
