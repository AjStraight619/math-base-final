import { Editor, Element, Node, Transforms } from "slate";
import { CustomElement } from "./slate-editor";

function isCustomElement(node: Node): node is CustomElement {
  return (node as CustomElement).type !== undefined;
}

export const CustomEditor = {
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
