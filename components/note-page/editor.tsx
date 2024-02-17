"use client";
import { TestNote } from "@/app/note/page";
import katex from "katex";
import "katex/dist/katex.min.css";
import { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomLatexBlot from "./custom-blot";
Quill.register("formats/customLatex", CustomLatexBlot, true);
window.katex = katex;

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, 3, false] }],

    ["link", "image", "formula"],

    [{ color: [] }, { background: [] }],
    [{ align: [] }],

    ["clean"],
  ],
  formula: true,
  clipboard: {
    matchVisual: false,
  },
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "align",
  "color",
  "code-block",
  "formula",
];

const latexString = "\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}";

// Render the LaTeX string with KaTeX to HTML
const renderedLatex = katex.renderToString(latexString, {
  throwOnError: false,
});

const Editor = ({ note }: TestNote) => {
  const [value, setValue] = useState("");
  const editorRef = useRef<ReactQuill>(null);
  useEffect(() => {
    const initialContent = note?.contents.map((c) => c.content).join(" ");
    if (!initialContent) return;
  }, [note]);

  // Debugging: Confirm the custom blot is registered
  useEffect(() => {
    const customLatexBlot = Quill.import("formats/customLatex");
    console.log("Custom Latex Blot:", customLatexBlot);
  }, []);

  useEffect(() => {
    // Paste the rendered LaTeX when the component mounts
    if (editorRef.current) {
      console.log("In editorRef.current");
      const quill = editorRef.current.getEditor();
      const range = quill.getSelection();
      if (range) {
        // This will insert the rendered LaTeX where the cursor is

        quill.clipboard.dangerouslyPasteHTML(range.index, renderedLatex);
      }
    }
  }, []);

  return (
    <>
      <ReactQuill
        ref={editorRef}
        className="w-full h-full md:w-[8.5in] md:h-[11in]"
        theme="snow"
        value={value}
        onChange={setValue}
        modules={quillModules}
        formats={quillFormats}
      />
    </>
  );
};

export default Editor;
