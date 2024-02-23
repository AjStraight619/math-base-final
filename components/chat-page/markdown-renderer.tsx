import "highlight.js/styles/monokai.css";
import "katex/dist/katex.min.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, className, children, ...props }) {
          const languageClass = className
            ? className.split(" ").find((c) => c.startsWith("language-"))
            : "unknown";
          const language = languageClass
            ? languageClass.split("-")[1]
            : "unknown";
          return (
            <div className="relative">
              <div className="w-full absolute top-8 border-b "></div>
              <pre
                className={`${
                  languageClass ? languageClass : "unknown"
                } my-4 bg-gray-200 dark:bg-zinc-800/70 rounded-md flex flex-col p-2`}
              >
                <span className="font semibold capitalize mb-4">
                  {language}
                </span>

                <code
                  className={`break-words whitespace-pre-wrap ${languageClass}`}
                  {...props}
                >
                  {children}
                </code>
              </pre>
            </div>
          );
        },
      }}
      className="break-words max-w-full whitespace-pre-line"
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
