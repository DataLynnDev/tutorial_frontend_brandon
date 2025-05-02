import React from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  Highlighter,
  List,
  Ruler,
  ListOrdered,
  CodeSquare,
  Quote,
} from "lucide-react";

const Menu_bar = ({ editor }) => {
  if (!editor) return null;
  const buttons = [
    {
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: Heading3,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: AlignLeft,
      action: () => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      icon: AlignRight,
      action: () => editor.chain().focus().setTextAlign("right").run(),
    },
    {
      icon: AlignCenter,
      action: () => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: Ruler,
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: CodeSquare,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: Highlighter,
      action: () => editor.chain().focus().toggleHighlight().run(),
    },
  ];
  return (
    <div className="border flex-wrap gap-y-1 flex rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50">
      {buttons.map(({ icon: Icon, action }, index) => (
        <div
          key={index}
          onClick={action}
          className="border p-1 rounded-md bg-slate-100 hover:bg-slate-200 cursor-pointer"
        >
          <Icon />
        </div>
      ))}
    </div>
  );
};

export default Menu_bar;
