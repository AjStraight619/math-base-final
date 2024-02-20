import "katex/dist/katex.min.css";
import { useCallback, useEffect, useState } from "react";

import { BaseEditor, createEditor } from "slate";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

import { withHistory } from "slate-history";
import { CodeElement } from "./code-element";
import { CustomEditor } from "./custom-editor";
import { DefaultElement } from "./default-element";
import SlateToolbar from "./slate-toolbar";

import "katex/dist/katex.min.css";
import { LatexElement } from "./latex-element";

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  [key: string]: boolean | string | undefined;
};

export type CustomElement = {
  type: "paragraph" | "code" | "latex";
  children: CustomText[];
  latex?: string;
  editMode?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: CustomElement[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
  {
    type: "latex",
    children: [{ text: "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}" }],
  },
];

const SlateEditor = () => {
  const [editor] = useState(() => withReact(withHistory(createEditor())));
  const [value, setValue] = useState<CustomElement[]>(initialValue);

  const transformLatex = (text: string) => {
    // Assuming all LaTeX is block math for simplicity; adjust as needed.
    return text.replace(/\\\\/g, "\\"); // Replace double backslashes with single
  };

  useEffect(() => {
    // Transform initial content, focusing on LaTeX transformation
    const transformedContent = value.map((block) => {
      if (block.type === "latex") {
        return {
          ...block,
          children: [{ text: transformLatex(block.children[0].text) }],
        };
      }
      return block;
    });
    setValue(transformedContent);
  }, []);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "latex":
        return <LatexElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const Leaf = (props: RenderLeafProps) => {
    const { attributes, children, leaf } = props;

    const style: React.CSSProperties = {
      fontWeight: leaf.bold ? "bold" : undefined,
      fontStyle: leaf.italic ? "italic" : undefined,
      textDecoration: leaf.underline ? "underline" : undefined,
      fontFamily: leaf.code ? "monospace" : undefined,
      backgroundColor: leaf.code ? "#f7f7f7" : undefined,
      padding: leaf.code ? "4px" : undefined,
      borderRadius: leaf.code ? "4px" : undefined,
    };

    if (!leaf.code) {
      return (
        <span {...attributes} style={style}>
          {children}
        </span>
      );
    }

    return (
      <code {...attributes} style={style}>
        {children}
      </code>
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!event.ctrlKey) {
      return;
    }

    switch (event.key) {
      case "b": {
        event.preventDefault();
        CustomEditor.toggleBoldMark(editor);
        break;
      }
      case "i": {
        event.preventDefault();
        CustomEditor.toggleItalicMark(editor);
        break;
      }
      case "u": {
        event.preventDefault();
        // CustomEditor.toggleUnderlineMark(editor);
        break;
      }
      case "`": {
        event.preventDefault();
        CustomEditor.toggleCodeBlock(editor);
        break;
      }
    }
  };

  return (
    <Slate
      editor={editor}
      initialValue={value}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
        }
      }}
    >
      <div className="p-6 w-full h-full md:w-[8in] md:h-[8in] flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-start gap-1 w-full pb-2">
          <SlateToolbar />
        </div>
        <Editable
          className="border rounded-md p-2 shadow-lg dark:shadow-gray-700 shadow-black focus:outline-none w-full h-full"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
        />
      </div>
    </Slate>
  );
};

export default SlateEditor;
