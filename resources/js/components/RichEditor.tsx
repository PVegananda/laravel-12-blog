import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import EditorToolbar from "./EditorToolbar";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function RichEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Image],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-xl overflow-hidden">
      <EditorToolbar editor={editor} />
      <div className="bg-white p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
