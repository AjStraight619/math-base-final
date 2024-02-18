"use client";

import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
const TestCode = () => {
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {"(num) => num + 1"}
    </SyntaxHighlighter>
  );
};

export default TestCode;
