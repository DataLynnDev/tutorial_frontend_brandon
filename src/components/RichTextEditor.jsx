import React, { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import "./styles.scss";
import Menu_bar from "./Menu_bar";

const RichTextEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
    ],
    content: content,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange(html); // <-- This updates `post` in App.jsx
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 prose-headings:font-semibold list-disc list-decimal",
      },
    },
  });

  useEffect(() => {
    if (editor && content) {
      onChange(editor.getHTML());
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div>
      <Menu_bar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
