import { useCallback, useEffect, useState } from "react";

import {
  BaseEditor,
  Editor,
  Element,
  Node,
  Transforms,
  createEditor,
} from "slate";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

import { Bold, Code, Italic, Underline } from "lucide-react";
import { withHistory } from "slate-history";
import { Button } from "../ui/button";

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  [key: string]: boolean | string | undefined;
};
export type CustomElement = {
  type: "paragraph" | "code";
  children: CustomText[];
};

type ToolbarButton = {
  icon: any;
  format: string;
  action: () => void;
};

type ActiveStates = {
  bold: boolean;
  italic: boolean;
  code: boolean;
  [key: string]: boolean; // Add this line
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
];

function isCustomElement(node: Node): node is CustomElement {
  return (node as CustomElement).type !== undefined;
}

const CustomEditor = {
  isBoldActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isItalicActive(editor: Editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },

  isCodeBlockActive(editor: Editor) {
    // Use the Editor.nodes function with a matching function that checks if a node is a CustomElement and if its type is 'code'
    const [match] = Editor.nodes(editor, {
      match: (n) => isCustomElement(n) && n.type === "code",
    });

    // If a match is found, return true; otherwise, return false
    return !!match;
  },

  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleItalicMark(editor: Editor) {
    const isActive = CustomEditor.isItalicActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },

  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? undefined : "code" },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },
};

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const SlateEditor = () => {
  const [editor] = useState(() => withReact(withHistory(createEditor())));

  const checkActiveState = useCallback(
    () => ({
      bold: CustomEditor.isBoldActive(editor),
      italic: CustomEditor.isItalicActive(editor),
      code: CustomEditor.isCodeBlockActive(editor),
    }),
    [editor]
  );

  const [activeStates, setActiveStates] = useState<ActiveStates>(
    checkActiveState()
  );

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
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

    const classes = `
    ${leaf.bold ? "font-bold" : ""}
    ${leaf.italic ? "italic" : ""}
    ${leaf.underline ? "underline" : ""}
    ${leaf.code ? "font-mono bg-gray-100 p-1 rounded" : ""}
  `;

    // For non-code text, apply the classes directly to a span
    if (!leaf.code) {
      return (
        <span {...attributes} className={classes}>
          {children}
        </span>
      );
    }

    // For code, wrap the text in a `code` element with additional styles
    return (
      <code {...attributes} className={classes}>
        {children}
      </code>
    );
  };

  const toolbarButtons: ToolbarButton[] = [
    {
      icon: <Bold />,
      format: "bold",
      action: () => CustomEditor.toggleBoldMark(editor),
    },
    {
      icon: <Italic />,
      format: "italic",
      action: () => CustomEditor.toggleItalicMark(editor),
    },
    {
      icon: <Underline />,
      format: "underline",
      action: () => console.log("Underline"),
    },
    {
      icon: <Code />,
      format: "code",
      action: () => CustomEditor.toggleCodeBlock(editor),
    },
  ];

  useEffect(() => {
    const updateActiveStates = () => {
      const newActiveStates = checkActiveState();
      setActiveStates(newActiveStates);
    };

    // Call update function whenever the editor changes
    const { onChange } = editor;
    editor.onChange = () => {
      onChange();
      updateActiveStates();
    };
  }, [editor, activeStates, checkActiveState]);

  const renderToolbarButton = (button: ToolbarButton, index: number) => (
    <Button
      size="icon"
      key={index}
      onMouseDown={(event) => {
        event.preventDefault();
        button.action();
      }}
      className={`${activeStates[button.format] ? "text-blue-500" : ""}`}
    >
      {button.icon}
    </Button>
  );

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
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
      <div className="w-full flex items-center justify-start gap-2 mb-2">
        {toolbarButtons.map(renderToolbarButton)}
      </div>

      <Editable
        className="w-[8in] h-[8in] border rounded-md p-2 shadow-lg dark:shadow-gray-700 shadow-black focus:outline-none"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
};

export default SlateEditor;
