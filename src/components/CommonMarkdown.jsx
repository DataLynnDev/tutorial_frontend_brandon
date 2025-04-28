import React from "react";
import MDEditor from "@uiw/react-md-editor";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";

const CommonMarkdown = ({ content }) => {
  return (
    <div className="pb-6">
      <MDEditor.Markdown
        wrapperElement={{ "data-color-mode": "light" }}
        source={content}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
      />
    </div>
  );
};

export default CommonMarkdown;
