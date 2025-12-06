import { Head, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/layouts/AdminLayout";
import { useRef, useState } from "react";

/* ---------------------------------------------
   TYPES
----------------------------------------------*/
interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

export default function Create() {
    const page = usePage<any>().props;

    const categories: Category[] = page.categories ?? [];
    const tags: Tag[] = page.tags ?? [];

    const { data, setData, post, errors } = useForm({
        title: "",
        content: "",
        thumbnail: null as File | null,
        status: "published",
        category_id: "",
        tags: [] as number[],
    });

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [showTagDropdown, setShowTagDropdown] = useState(false);

    const [popup, setPopup] = useState<{
        type: "link" | "image" | null;
        visible: boolean;
    }>({ type: null, visible: false });

    const [popupInput, setPopupInput] = useState("");

    /* ----------------------------------------------------
        INSERT HTML INTO TEXT
    ---------------------------------------------------- */
    function insert(html: string) {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        textarea.value =
            textarea.value.substring(0, start) +
            html +
            textarea.value.substring(end);

        textarea.selectionStart = textarea.selectionEnd = start + html.length;

        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        setData("content", textarea.value);
    }

    function addBold() {
        insert("<b></b>");
    }
    function addItalic() {
        insert("<i></i>");
    }
    function addHeading(level: number) {
        insert(`<h${level}></h${level}>`);
    }
    function addList() {
        insert("<ul>\n  <li></li>\n</ul>\n");
    }
    function addOrderedList() {
        insert("<ol>\n  <li></li>\n</ol>\n");
    }

    function openPopup(type: "link" | "image") {
        setPopup({ type, visible: true });
        setPopupInput("");
    }

    function submitPopup() {
        if (popup.type === "link") {
            insert(`<a href="${popupInput}" target="_blank"></a>`);
        }
        if (popup.type === "image") {
            insert(`<img src="${popupInput}" alt="" />`);
        }

        setPopup({ type: null, visible: false });
        setPopupInput("");
    }

    function toggleTag(id: number) {
        if (data.tags.includes(id)) {
            setData(
                "tags",
                data.tags.filter((t) => t !== id)
            );
        } else {
            setData("tags", [...data.tags, id]);
        }
    }

    function handleThumbnail(e: any) {
        const file = e.target.files?.[0] ?? null;
        setData("thumbnail", file);
        if (file) setPreview(URL.createObjectURL(file));
    }

    function submit(e: any) {
        e.preventDefault();
        post("/admin/posts", { forceFormData: true });
    }

    /* ----------------------------------------------------
        UI START
    ---------------------------------------------------- */
    return (
        <AdminLayout title="Tambah Post">
            <Head title="Tambah Post" />

            {/* POPUP OVERLAY */}
            {popup.visible && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-96">
                        <h2 className="font-bold text-lg mb-4 text-[#0A1A2F]">
                            {popup.type === "link"
                                ? "Masukkan URL Link"
                                : "Masukkan URL Gambar"}
                        </h2>

                        <input
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                            placeholder={
                                popup.type === "link"
                                    ? "https://example.com"
                                    : "https://image-url.jpg"
                            }
                            value={popupInput}
                            onChange={(e) => setPopupInput(e.target.value)}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() =>
                                    setPopup({ type: null, visible: false })
                                }
                                className="px-4 py-2 rounded-lg border border-gray-300"
                            >
                                Batal
                            </button>
                            <button
                                onClick={submitPopup}
                                className="px-4 py-2 rounded-lg bg-[#0A1A2F] text-white"
                            >
                                Tambah
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <a
                    href="/admin/posts"
                    className="inline-block mb-6 text-[#0A1A2F] hover:underline text-sm"
                >
                    ← Kembali
                </a>

                <form
                    onSubmit={submit}
                    className="bg-white rounded-xl shadow p-8 space-y-8 border border-gray-200 text-black"
                >
                    <h1 className="text-3xl font-bold text-[#0A1A2F]">
                        Tambah Post Baru
                    </h1>

                    {/* TITLE */}
                    <div>
                        <label className="block mb-2 font-semibold">
                            Judul
                        </label>
                        <input
                            className="w-full bg-gray-100 border border-gray-300 p-3 rounded-xl"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                    </div>

                    {/* THUMBNAIL */}
                    <div>
                        <label className="block mb-2 font-semibold">
                            Thumbnail
                        </label>

                        <div className="flex flex-col items-start gap-3">
                            <div className="w-48 h-32 bg-gray-50 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                                {preview ? (
                                    <img
                                        src={preview}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400 text-sm">
                                        Belum ada gambar
                                    </span>
                                )}
                            </div>

                            <label
                                htmlFor="thumbnail"
                                className="cursor-pointer bg-[#0A1A2F] hover:bg-black text-white px-4 py-2 rounded-md text-sm shadow"
                            >
                                Pilih Gambar
                            </label>

                            <input
                                id="thumbnail"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleThumbnail}
                            />
                        </div>
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label className="block mb-2 font-semibold">
                            Kategori
                        </label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            className="w-full bg-gray-100 border border-gray-300 p-3 rounded-xl"
                        >
                            <option value="">-- Pilih Kategori --</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* TAGS */}
                    <div className="relative">
                        <label className="block mb-2 font-semibold">
                            Tags
                        </label>

                        <button
                            type="button"
                            onClick={() =>
                                setShowTagDropdown(!showTagDropdown)
                            }
                            className="w-full bg-gray-100 border border-gray-300 p-3 rounded-xl text-left"
                        >
                            {data.tags.length > 0
                                ? `${data.tags.length} tag dipilih`
                                : "Pilih Tag"}
                        </button>

                        {showTagDropdown && (
                            <div className="absolute z-20 mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-lg p-3 max-h-60 overflow-y-auto">
                                {tags.map((tag) => (
                                    <label
                                        key={tag.id}
                                        className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-md"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.tags.includes(
                                                tag.id
                                            )}
                                            onChange={() => toggleTag(tag.id)}
                                        />
                                        <span>{tag.name}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* EDITOR */}
                    <div>
                        <label className="block mb-2 font-semibold">
                            Konten (HTML)
                        </label>

                        {/* TOOLBAR */}
                        <div className="flex flex-wrap gap-2 p-3 bg-white border border-gray-300 rounded-t-xl">
                            <button
                                type="button"
                                onClick={addBold}
                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                            >
                                Bold
                            </button>
                            <button
                                type="button"
                                onClick={addItalic}
                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                            >
                                Italic
                            </button>
                            <button
                                type="button"
                                onClick={() => addHeading(1)}
                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                            >
                                H1
                            </button>
                            <button
                                type="button"
                                onClick={() => addHeading(2)}
                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                            >
                                H2
                            </button>
                            <button
                                type="button"
                                onClick={addList}
                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                            >
                                • List
                            </button>
                            <button
                                type="button"
                                onClick={addOrderedList}
                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                            >
                                1. List
                            </button>

                            {/* POPUP BUTTONS */}
                            <button
                                type="button"
                                onClick={() => openPopup("link")}
                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                            >
                                Link
                            </button>
                            <button
                                type="button"
                                onClick={() => openPopup("image")}
                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                            >
                                Image
                            </button>
                        </div>

                        {/* TEXTAREA */}
                        <textarea
                            ref={textareaRef}
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            className="w-full border border-gray-300 rounded-b-xl bg-white p-4 min-h-[300px] font-mono text-sm"
                        />
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="block mb-2 font-semibold">
                            Status
                        </label>
                        <select
                            value={data.status}
                            onChange={(e) =>
                                setData(
                                    "status",
                                    e.target.value as "published" | "draft"
                                )
                            }
                            className="w-48 bg-gray-100 border border-gray-300 p-2 rounded-md"
                        >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-4">
                        <button className="bg-[#0A1A2F] hover:bg-black text-white px-6 py-3 rounded-xl shadow">
                            Simpan Post
                        </button>

                        <a
                            href="/admin/posts"
                            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
                        >
                            Batal
                        </a>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
