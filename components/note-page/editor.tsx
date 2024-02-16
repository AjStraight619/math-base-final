"use client";
import { TestNote } from "@/app/note/page";
import katex from "katex";
import "katex/dist/katex.min.css";
import { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
window.katex = katex;

const BlockEmbed = Quill.import("blots/block/embed");

class LatexBlot extends BlockEmbed {
  static create(value: string) {
    let node = super.create();
    // Render LaTeX using KaTeX
    katex.render(value, node, {
      throwOnError: false,
      errorColor: "#ff0000",
    });
    return node;
  }

  static value(domNode: HTMLElement) {
    return domNode.innerText;
  }
}

LatexBlot.blotName = "latex";
LatexBlot.tagName = "div";
LatexBlot.className = "ql-latex";

Quill.register("formats/latex", LatexBlot);

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
    // Insert a test LaTeX blot to see if it is working
    const quillEditor = editorRef.current?.getEditor();
    setTimeout(() => {
      quillEditor?.insertText(0, "LaTeX: "); // Insert some text
      quillEditor?.insertEmbed(7, "customLatex", "x^2"); // Insert LaTeX
    }, 1000);
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
