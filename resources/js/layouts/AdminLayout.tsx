import { ReactNode, useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Toast from "@/components/Toast";

interface Props {
  children: ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: Props) {
  const { flash } = usePage().props as {
    flash?: { success?: string | null; error?: string | null };
  };

  const [toast, setToast] = useState<{
    message: string | null;
    type: "success" | "error" | null;
  }>({
    message: null,
    type: null,
  });

  // AUTO SHOW FLASH MESSAGE
  useEffect(() => {
    if (flash?.success) {
      setToast({ message: flash.success, type: "success" });
    }

    if (flash?.error) {
      setToast({ message: flash.error, type: "error" });
    }
  }, [flash]);

  return (
    <div className="min-h-screen flex bg-gray-100 text-black">

      {/* TOAST GLOBAL */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: null, type: null })}
      />

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0A1A2F] text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-white/10">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin/dashboard"
            className="block px-4 py-2 hover:bg-white/10 rounded"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/posts"
            className="block px-4 py-2 hover:bg-white/10 rounded"
          >
            Kelola Post
          </Link>

          <Link
            href="/admin/categories"
            className="block px-4 py-2 hover:bg-white/10 rounded"
          >
            Kategori
          </Link>

          <Link
            href="/admin/tags"
            className="block px-4 py-2 hover:bg-white/10 rounded"
          >
            Tag
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <form method="post" action="/logout">
            <button className="w-full text-left px-4 py-2 hover:bg-red-600 rounded">
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">

        {/* PAGE HEADER */}
        <header className="bg-white shadow px-8 py-4">
          <h1 className="font-semibold text-lg text-[#0A1A2F]">
            {title ?? "Admin Dashboard"}
          </h1>
        </header>

        {/* PAGE BODY */}
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}
