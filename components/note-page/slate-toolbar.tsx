import { Bold, Code, Italic, Underline } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSlate } from "slate-react";
import { Button } from "../ui/button";
import { CustomEditor } from "./custom-editor";

type ToolbarButton = {
  icon: any;
  format: string;
  action: () => void;
};

type ActiveStates = {
  bold: boolean;
  italic: boolean;
  code: boolean;
  [key: string]: boolean;
};

const SlateToolbar = () => {
  const editor = useSlate();

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
      className={`${
        activeStates[button.format] ? "text-blue-500" : ""
      } w-8 h-8`}
    >
      {button.icon}
    </Button>
  );

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
  return (
    <>
      {toolbarButtons.map((button, index) =>
        renderToolbarButton(button, index)
      )}
    </>
  );
};

export default SlateToolbar;
