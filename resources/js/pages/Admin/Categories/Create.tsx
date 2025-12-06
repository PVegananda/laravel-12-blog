import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";

export default function Create() {
  const { data, setData, post, errors } = useForm({
    name: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post("/admin/categories");
  }

  return (
    <AdminLayout title="Tambah Kategori">
      <Head title="Tambah Kategori" />

      <a href="/admin/categories" className="text-[#0A1A2F] hover:underline">
        ← Kembali
      </a>

      <div className="bg-white p-8 mt-4 rounded-xl shadow border border-gray-200 max-w-xl">
        <h1 className="text-2xl font-bold text-[#0A1A2F] mb-4">
          Tambah Kategori
        </h1>

        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">Nama Kategori</label>
            <input
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50"
              placeholder="Contoh: Teknologi, Lifestyle, Bisnis..."
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <button className="bg-[#0A1A2F] hover:bg-black text-white px-6 py-3 rounded-lg">
            Simpan
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
