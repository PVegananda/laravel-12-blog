import { Head, Link, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import { useState } from "react";
import DeleteModal from "@/components/DeleteModal";

interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

interface Props extends Record<string, any> {
  tags: {
    data: Tag[];
    links: { url: string | null; label: string; active: boolean }[];
  };
}

export default function Index() {
  const { tags } = usePage<Props>().props;
  const [deleteId, setDeleteId] = useState<number | null>(null);

  function confirmDelete() {
    if (deleteId === null) return;
    router.delete(`/admin/tags/${deleteId}`, {
      onSuccess: () => setDeleteId(null),
    });
  }

  return (
    <AdminLayout title="Tag">
      <Head title="Tag" />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0A1A2F]">Tag</h1>

        <Link
          href="/admin/tags/create"
          className="bg-[#0A1A2F] hover:bg-black text-white px-4 py-2 rounded-lg"
        >
          + Tambah Tag
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
            {tags?.data?.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-6 text-gray-500 text-sm"
                >
                  Belum ada tag.
                </td>
              </tr>
            )}

            {tags?.data?.map((tag: Tag) => (
              <tr key={tag.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{tag.name}</td>
                <td className="p-4 text-gray-600">{tag.slug}</td>

                <td className="p-4 text-gray-600">
                  {new Date(tag.created_at).toLocaleDateString()}
                </td>

                <td className="p-4 text-right flex justify-end gap-4">
                  <Link
                    href={`/admin/tags/${tag.id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => setDeleteId(tag.id)}
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
        {tags?.links?.map((link: any, i: number) => (
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

      {/* DELETE MODAL */}
      <DeleteModal
        show={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </AdminLayout>
  );
}
