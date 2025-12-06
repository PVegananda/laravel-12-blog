import { Head, Link, usePage } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Show() {
  const { post } = usePage<{
    post: {
      id: number;
      title: string;
      slug: string;
      content: string;
      thumbnail_url: string | null;
      created_at: string;
      category?: { id: number; name: string } | null;
      tags: { id: number; name: string }[];
    };
  }>().props;

  return (
    <>
      <Head title={post.title} />

      <Navbar />

      <main className="min-h-screen bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
        {/* HERO IMAGE */}
        {post.thumbnail_url && (
          <div className="w-full max-h-[420px] overflow-hidden rounded-b-3xl shadow">
            <img
              src={post.thumbnail_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* CATEGORY */}
          {post.category && (
            <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full dark:bg-blue-900 dark:text-blue-300">
              {post.category.name}
            </span>
          )}

          {/* TITLE */}
          <h1 className="text-4xl font-bold mt-4 mb-3">{post.title}</h1>

          {/* META */}
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            {new Date(post.created_at).toLocaleDateString("id-ID")}
          </p>

          {/* TAGS */}
          {post.tags.length > 0 && (
            <div className="flex gap-2 mb-8 flex-wrap">
              {post.tags.map((t) => (
                <span
                  key={t.id}
                  className="px-3 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-800 border dark:border-gray-700"
                >
                  #{t.name}
                </span>
              ))}
            </div>
          )}

          {/* CONTENT */}
          <article
            className="article-content text-lg leading-relaxed dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* AUTHOR BOX */}
          <div className="mt-12 p-6 border rounded-2xl bg-white shadow dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-3">Tentang Penulis</h3>

            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100?img=12"
                className="w-20 h-20 rounded-full border"
                alt="Dearetna"
              />

              <div>
                <h4 className="font-semibold text-lg">Dearetna</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Penulis artikel finansial, berbagi insight tentang keuangan,
                  investasi, dan perencanaan masa depan.
                </p>

                {/* SOCIAL MEDIA */}
                <div className="flex gap-3 mt-3">
                  <a href="#" className="text-blue-600 dark:text-blue-300">
                    Instagram
                  </a>
                  <a href="#" className="text-blue-600 dark:text-blue-300">
                    LinkedIn
                  </a>
                  <a href="#" className="text-blue-600 dark:text-blue-300">
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* BACK TO POSTS */}
          <div className="mt-10">
            <Link
              href="/"
              className="text-blue-600 hover:underline dark:text-blue-300"
            >
              ← Kembali ke daftar artikel
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
