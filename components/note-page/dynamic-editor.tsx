"use client";
import { TestNote } from "@/app/note/page";
import dynamic from "next/dynamic";

const DynamicEditor = dynamic(() => import("./editor"), {
  ssr: false,
});

const TextEditorNoSSR = ({ note }: TestNote) => {
  return <DynamicEditor note={note} />;
};

export default TextEditorNoSSR;
