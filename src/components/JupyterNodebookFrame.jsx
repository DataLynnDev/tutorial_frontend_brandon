import React, { useEffect, useRef } from "react";

const JupyterNodebookFrame = ({ htmlContent }) => {
  const iframeRef = useRef();
  useEffect(() => {
    const iframe = iframeRef?.current;
    const handleLoad = () => {
      if (iframe) {
        const content =
          iframe.contentWindow.document.getElementsByClassName(
            "jp-Notebook"
          )[0];
        if (content) {
          content.style.margin = "0";
          content.style.padding = "24px";

          const jpCells = content.getElementsByClassName("jp-Cell");
          for (const element of jpCells) {
            element.style.paddingLeft = 0;
            element.style.paddingRight = 0;
          }

          const codeCells = content.getElementsByClassName("cm-s-jupyter");
          for (const element of codeCells) {
            element.style.overflowX = "auto";
          }
          content.getElementsByClassName("jp-OutputPrompt");

          const inputPrompts = content.getElementsByClassName("jp-InputPrompt");
          for (const element of inputPrompts) {
            element.style.paddingLeft = 0;
          }

          const outputPrompts =
            content.getElementsByClassName("jp-OutputPrompt");
          for (const element of outputPrompts) {
            element.style.paddingLeft = 0;
          }
        }
      }
    };
    iframe?.addEventListener("load", handleLoad);

    return () => {
      iframe?.removeEventListener("load", handleLoad);
    };
  }, [iframeRef.current]);
  return (
    <iframe
      className="border-0"
      ref={iframeRef}
      srcDoc={htmlContent}
      title="Jupyter Notebook"
      width="100%"
      height="100%"
    />
  );
};

export default JupyterNodebookFrame;
