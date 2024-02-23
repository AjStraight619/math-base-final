import "katex/dist/katex.min.css"; // Don't forget to import the CSS
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { RenderElementProps } from "slate-react";

import { useFocused, useSelected } from "slate-react";

export const LatexElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const selected = useSelected();
  const focused = useFocused();
  const latexContent = element.children.map((child) => child.text).join("");

  // Add `contentEditable={false}` to prevent editing
  return (
    <span
      {...attributes}
      contentEditable={false}
      style={{ userSelect: "none" }}
    >
      <ReactMarkdown rehypePlugins={[rehypeKatex]} remarkPlugins={[remarkMath]}>
        {latexContent}
      </ReactMarkdown>
      {selected && focused && (
        <span
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
          }}
        />
      )}
    </span>
  );
};
