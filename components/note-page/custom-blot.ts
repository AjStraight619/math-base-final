// import katex from "katex";
// import "katex/dist/katex.min.css";
// import Quill from "quill";
// const Parchment = Quill.import("parchment");

// let Inline = Quill.import("blots/inline");

// class LatexBlot extends Inline {
//   static create(value: string): Node {
//     let node = super.create();
//     node.setAttribute("data-latex", value);
//     katex.render(value, node, { throwOnError: false, output: "html" });
//     console.log("LatexBlot create called with value:", value); // Debugging
//     return node;
//   }

//   static formats(node: HTMLElement): string {
//     console.log("LatexBlot formats called"); // Debugging
//     return node.getAttribute("data-latex") || "";
//   }

//   format(name: string, value: string) {
//     console.log("LatexBlot format called with name:", name, "value:", value); // Debugging
//     if (name === LatexBlot.blotName && value) {
//       this.domNode.setAttribute("data-latex", value);
//       katex.render(value, this.domNode, {
//         throwOnError: false,
//         output: "html",
//       });
//     } else {
//       super.format(name, value);
//     }
//   }

//   formats(): { [key: string]: any } {
//     let formats = super.formats();
//     formats[LatexBlot.blotName] = LatexBlot.value(this.domNode);
//     console.log("LatexBlot formats method called, formats:", formats); // Debugging
//     return formats;
//   }

//   static value(node: HTMLElement): string {
//     console.log("LatexBlot value called"); // Debugging
//     return node.getAttribute("data-latex") || "";
//   }
// }

// LatexBlot.blotName = "customLatex";
// LatexBlot.tagName = "span";

// export default LatexBlot;

import Quill from "quill";
let Inline = Quill.import("blots/inline");

class LatexBlot extends Inline {
  static create(value: string): Node {
    let node = super.create();
    node.setAttribute("data-latex", value);
    console.log("Creating LatexBlot with value:", value);
    return node;
  }

  static value(node: HTMLElement): string {
    console.log("Getting value of LatexBlot");
    return node.getAttribute("data-latex") || "";
  }
}

LatexBlot.blotName = "latex";
LatexBlot.tagName = "span";
Quill.register("formats/latex", LatexBlot);

export default LatexBlot;
