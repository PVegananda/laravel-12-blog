import { Head, useForm, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import { useRef, useState } from "react";

interface Category { id: number; name: string; }
interface Tag { id: number; name: string; }

export default function Edit() {
  const { post, categories = [], tags = [] }: any = usePage().props;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // IMPORTANT → must use POST + _method: PUT
  const { data, setData, post: postRequest, errors, processing } = useForm({
    _method: "PUT",

    title: post.title ?? "",
    content: post.content ?? "",
    thumbnail: null as File | null,
    status: post.status ?? "published",
    category_id: post.category?.id ? String(post.category.id) : "",
    tags: post.tags ? post.tags.map((t: any) => t.id) : ([] as number[]),
  });

  const [preview, setPreview] = useState<string | null>(post.thumbnail_url ?? null);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  // Popup (Link / Image)
  const [popup, setPopup] = useState<{ type: "link" | "image" | null; visible: boolean }>({
    type: null,
    visible: false,
  });
  const [popupInput, setPopupInput] = useState("");

  /* -------------------------------------------
     Textarea Insert Helper
  ------------------------------------------- */
  function insert(html: string) {
    const ta = textareaRef.current;
    if (!ta) return;

    const start = ta.selectionStart;
    const end = ta.selectionEnd;

    ta.value = ta.value.slice(0, start) + html + ta.value.slice(end);
    ta.selectionStart = ta.selectionEnd = start + html.length;

    ta.dispatchEvent(new Event("input", { bubbles: true }));
    setData("content", ta.value);
  }

  const addBold = () => insert("<b></b>");
  const addItalic = () => insert("<i></i>");
  const addHeading = (n: number) => insert(`<h${n}></h${n}>`);
  const addList = () => insert("<ul>\n  <li></li>\n</ul>\n");
  const addOrderedList = () => insert("<ol>\n  <li></li>\n</ol>\n");

  const openPopup = (type: "link" | "image") =>
    setPopup({ type, visible: true });

  const submitPopup = () => {
    if (!popupInput.trim()) return;

    if (popup.type === "link") insert(`<a href="${popupInput}" target="_blank">${popupInput}</a>`);
    if (popup.type === "image") insert(`<img src="${popupInput}" alt="" />`);

    setPopup({ type: null, visible: false });
    setPopupInput("");
  };

  /* -------------------------------------------
     Thumbnail Preview
  ------------------------------------------- */
  function handleThumbnail(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setData("thumbnail", file);

    if (file) setPreview(URL.createObjectURL(file));
  }

  /* -------------------------------------------
     Tags
  ------------------------------------------- */
  function toggleTag(id: number) {
    if (data.tags.includes(id)) {
      setData("tags", data.tags.filter((t: number) => t !== id));
    } else {
      setData("tags", [...data.tags, id]);
    }
  }

  /* -------------------------------------------
     Toast Helper
  ------------------------------------------- */
  function showToast(msg: string) {
    const t = document.createElement("div");
    t.innerText = msg;
    t.className =
      "fixed right-4 top-4 bg-[#0A1A2F] text-white px-4 py-2 rounded-xl shadow-lg z-50 animate-fadeIn";
    document.body.appendChild(t);

    setTimeout(() => {
      t.style.opacity = "0";
      t.style.transform = "translateY(-10px)";
    }, 2000);

    setTimeout(() => t.remove(), 2600);
  }

  /* -------------------------------------------
     Submit (POST + _method=PUT)
  ------------------------------------------- */
  function submit(e: React.FormEvent) {
    e.preventDefault();

    postRequest(`/admin/posts/${post.id}`, {
      forceFormData: true,

      onSuccess: () => {
        showToast("Post berhasil diperbarui!");
        router.get("/admin/posts");
      },

      onError: () => {
        showToast("Periksa kembali input Anda.");
      },
    });
  }

  /* -------------------------------------------
     UI
  ------------------------------------------- */
  return (
    <AdminLayout title="Edit Post">
      <Head title="Edit Post" />

      {/* POPUP */}
      {popup.visible && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="font-bold text-lg mb-3 text-[#0A1A2F]">
              {popup.type === "link" ? "Masukkan URL Link" : "Masukkan URL Gambar"}
            </h2>

            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
              placeholder={popup.type === "link" ? "https://example.com" : "https://gambar.jpg"}
              value={popupInput}
              onChange={(e) => setPopupInput(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPopup({ type: null, visible: false })}
                className="px-4 py-2 rounded-lg border"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={submitPopup}
                className="px-4 py-2 rounded-lg bg-[#0A1A2F] text-white"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAGE */}
      <div className="max-w-6xl mx-auto">
        <a href="/admin/posts" className="inline-block mb-6 text-[#0A1A2F] hover:underline">
          ← Kembali
        </a>

        <form
          onSubmit={submit}
          className="bg-white rounded-xl shadow p-8 space-y-8 border border-gray-200 text-black"
        >
          <h1 className="text-3xl font-bold text-[#0A1A2F]">Edit Post</h1>

          {/* TITLE */}
          <div>
            <label className="block mb-2 font-semibold">Judul</label>
            <input
              name="title"
              className="w-full bg-gray-100 border border-gray-300 p-3 rounded-xl"
              value={data.title}
              onChange={(e) => setData("title", e.target.value)}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* THUMBNAIL */}
          <div>
            <label className="block mb-2 font-semibold">Thumbnail</label>

            <div className="flex gap-4 items-start">
              <div className="w-48 h-32 bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 text-sm p-4">Belum ada gambar</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="thumbnail"
                  className="cursor-pointer bg-[#0A1A2F] hover:bg-black text-white px-4 py-2 rounded-lg text-sm"
                >
                  Ubah Gambar
                </label>

                <input
                  id="thumbnail"
                  name="thumbnail"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnail}
                />

                {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail}</p>}
              </div>
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-2 font-semibold">Kategori</label>

            <select
              name="category_id"
              className="w-full bg-gray-100 border border-gray-300 p-3 rounded-xl"
              value={data.category_id}
              onChange={(e) => setData("category_id", e.target.value)}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat: Category) => (
                <option key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
          </div>

          {/* TAGS */}
          <div className="relative">
            <label className="block mb-2 font-semibold">Tags</label>

            <button
              type="button"
              onClick={() => setShowTagDropdown(!showTagDropdown)}
              className="w-full bg-gray-100 border border-gray-300 p-3 rounded-xl text-left"
            >
              {data.tags.length ? `${data.tags.length} Tag dipilih` : "Pilih Tag"}
            </button>

            {showTagDropdown && (
              <div className="absolute z-20 mt-2 bg-white w-full border border-gray-300 rounded-xl shadow-lg p-3 max-h-60 overflow-y-auto">
                {tags.map((tag: Tag) => (
                  <label
                    key={tag.id}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    <input
                      type="checkbox"
                      checked={data.tags.includes(tag.id)}
                      onChange={() => toggleTag(tag.id)}
                    />
                    <span>{tag.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div>
            <label className="block mb-2 font-semibold">Konten (HTML)</label>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 p-3 bg-white border border-gray-300 rounded-t-xl">
              <button type="button" onClick={addBold} className="btn-tool">Bold</button>
              <button type="button" onClick={addItalic} className="btn-tool">Italic</button>
              <button type="button" onClick={() => addHeading(1)} className="btn-tool">H1</button>
              <button type="button" onClick={() => addHeading(2)} className="btn-tool">H2</button>
              <button type="button" onClick={() => addList()} className="btn-tool">• List</button>
              <button type="button" onClick={() => addOrderedList()} className="btn-tool">1. List</button>
              <button type="button" onClick={() => openPopup("link")} className="btn-tool">Link</button>
              <button type="button" onClick={() => openPopup("image")} className="btn-tool">Img</button>
            </div>

            <textarea
              ref={textareaRef}
              name="content"
              value={data.content}
              onChange={(e) => setData("content", e.target.value)}
              className="w-full border border-gray-300 rounded-b-xl bg-white p-4 min-h-[300px] font-mono text-sm"
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
          </div>

          {/* STATUS */}
          <div>
            <label className="block mb-2 font-semibold">Status</label>
            <select
              name="status"
              value={data.status}
              onChange={(e) => setData("status", e.target.value)}
              className="w-48 bg-gray-100 border border-gray-300 p-2 rounded-md"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-[#0A1A2F] hover:bg-black text-white px-6 py-3 rounded-xl shadow"
              disabled={processing}
            >
              {processing ? "Menyimpan..." : "Update Post"}
            </button>

            <a href="/admin/posts" className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100">
              Batal
            </a>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

/* -------------------------------------------
   Extra Styles (Tool Buttons)
------------------------------------------- */
export const btnTool = `
  px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm
`;
