import { Head, Link, usePage } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Post {
  id: number;
  title: string;
  slug: string;
  thumbnail_url: string | null;
  created_at: string;
}

interface Props extends Record<string, any> {
  posts: Post[];
}

export default function Home() {
  const { posts } = usePage<Props>().props;

  return (
    <>
      <Head title="Dearetna • Financial Insights & Blog" />

      <Navbar />

      <main className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white min-h-screen">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 lg:px-10 py-20 flex flex-col lg:flex-row items-center gap-14">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Wawasan Finansial Modern  
              <span className="text-[#C9A227]"> untuk Hidup yang Lebih Aman</span>
            </h2>

            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Dearetna membantu Anda memahami dunia finansial dengan bahasa yang
              ringan, strategis, dan praktis. Temukan tips investasi, budgeting,
              dan pengelolaan keuangan terbaik.
            </p>

            <Link
              href="/posts"
              className="inline-block mt-4 px-6 py-3 bg-[#0A1A2F] text-white rounded-xl hover:bg-black transition shadow-lg text-sm"
            >
              Jelajahi Artikel
            </Link>
          </div>

          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=900&q=60"
              alt="Finance Illustration"
              className="rounded-2xl shadow-xl object-cover w-full"
            />
          </div>
        </section>

        {/* RECENT POSTS */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <h3 className="text-3xl font-bold mb-10">Artikel Terbaru</h3>

            {posts.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                Belum ada postingan.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/posts/${post.slug}`}
                    className="group bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
                  >
                    <div className="h-48 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                      <img
                        src={
                          post.thumbnail_url ??
                          "https://via.placeholder.com/300x200?text=No+Image"
                        }
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>

                    <div className="p-5 space-y-3">
                      <h4 className="font-bold text-lg group-hover:text-[#C9A227] transition">
                        {post.title}
                      </h4>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.created_at).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
