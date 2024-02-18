import { useState } from "react";

import { BaseEditor, createEditor } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import SlateToolbar from "./slate-toolbar";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

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

const SlateEditor = () => {
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Slate editor={editor} initialValue={initialValue}>
        <SlateToolbar />
        <Editable className="w-[8in] h-[10in] border rounded-md" />
      </Slate>
    </div>
  );
};

export default SlateEditor;
