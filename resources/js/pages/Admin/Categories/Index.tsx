// resources/js/pages/Admin/Categories/Index.tsx
import { Head, Link, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import { useState } from "react";
import DeleteModal from "@/components/DeleteModal";

interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

interface Props extends Record<string, any> {
  categories: {
    data: Category[];
    links: { url: string | null; label: string; active: boolean }[];
  };
}

export default function Index() {
  const { categories } = usePage<Props>().props;
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function confirmDelete() {
    if (deleteId === null) return;
    router.delete(`/admin/categories/${deleteId}`, {
      onSuccess: () => setDeleteId(null),
    });
  }

  return (
    <AdminLayout title="Kategori">
      <Head title="Kategori" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0A1A2F]">Kategori</h1>

        <Link
          href="/admin/categories/create"
          className="bg-[#0A1A2F] hover:bg-black text-white px-4 py-2 rounded-lg"
        >
          + Tambah Kategori
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Nama</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {categories?.data?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  Belum ada kategori.
                </td>
              </tr>
            )}

            {categories?.data?.map((cat: Category) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="p-4">{cat.name}</td>
                <td className="p-4 text-gray-600">{cat.slug}</td>
                <td className="p-4 text-gray-600">
                  {new Date(cat.created_at).toLocaleDateString()}
                </td>

                <td className="p-4 text-right flex justify-end gap-4">
                  <Link
                    href={`/admin/categories/${cat.id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => setDeleteId(cat.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-4">
        {categories?.links?.map((link: any, i: number) => (
          <Link
            key={i}
            href={link.url ?? ""}
            className={`px-3 py-1 rounded border text-sm ${
              link.active
                ? "bg-[#0A1A2F] text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>

      <DeleteModal
        show={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </AdminLayout>
  );
}
