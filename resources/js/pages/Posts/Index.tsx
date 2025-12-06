import { Head, Link, usePage, router } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  slug: string;
  thumbnail_url: string | null;
  created_at: string;
}

interface Props extends Record<string, any> {
  posts: {
    data: Post[];
    links: { url: string | null; label: string; active: boolean }[];
  };
  filters: {
    search: string | null;
  };
}

export default function PostsIndex() {
  const { posts, filters } = usePage<Props>().props;

  const [search, setSearch] = useState(filters.search ?? "");

  // 🔍 Debounced Search
  useEffect(() => {
    const id = setTimeout(() => {
      router.get("/posts", { search }, { preserveState: true, replace: true });
    }, 500);

    return () => clearTimeout(id);
  }, [search]);

  return (
    <>
      <Head title="Semua Artikel • Dearetna" />

      <Navbar />

      {/* MAIN CONTENT */}
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">

        {/* HEADER */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-6">
          <h1 className="text-4xl font-extrabold mb-6">Semua Artikel</h1>

          {/* SEARCH BAR */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Cari artikel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full px-4 py-3 rounded-xl border border-gray-300 
                bg-white dark:bg-gray-800 dark:border-gray-700
                focus:ring-2 focus:ring-[#C9A227] outline-none
              "
            />
          </div>
        </section>

        {/* POSTS GRID */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          {posts.data.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 mt-10">
              Tidak ada artikel ditemukan.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
              {posts.data.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="
                    group bg-white dark:bg-gray-800 rounded-2xl shadow 
                    hover:shadow-xl transition overflow-hidden
                  "
                >
                  <div className="h-44 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={
                        post.thumbnail_url ??
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <h2 className="font-bold text-lg group-hover:text-[#C9A227] transition">
                      {post.title}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.created_at).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex gap-2 mt-10">
            {posts.links.map((link, i) => (
              <Link
                key={i}
                href={link.url ?? ""}
                className={`
                  px-4 py-2 rounded-lg text-sm border 
                  ${
                    link.active
                      ? "bg-[#0A1A2F] text-white border-[#0A1A2F]"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
