import "katex/dist/katex.min.css"; // Don't forget to import the CSS
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { Transforms } from "slate";
import { ReactEditor, RenderElementProps, useSlateStatic } from "slate-react";

export const LatexElement = (props: RenderElementProps) => {
  const { element, attributes } = props;
  const editor = useSlateStatic();
  const [editMode, setEditMode] = useState(false);
  const latexContent = element.children.map((child) => child.text).join("");

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // When leaving edit mode, update the Slate document with the new LaTeX content
  const handleBlur = (e: any) => {
    const newText = e.target.value;
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(
      editor,
      { type: "latex", children: [{ text: newText }] },
      { at: path }
    );
    setEditMode(false);
  };

  return (
    <ReactMarkdown rehypePlugins={[rehypeKatex]} remarkPlugins={[remarkMath]}>
      {latexContent}
    </ReactMarkdown>
  );
};
