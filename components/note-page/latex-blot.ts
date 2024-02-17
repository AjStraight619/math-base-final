import katex from "katex";
import "katex/dist/katex.min.css";
import Quill from "quill";

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
