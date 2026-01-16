"use client";

import React from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Link = Quill.import("formats/link") as {
  sanitize: (url: string) => string;
};
Link.sanitize = (url: string) =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;
Quill.register(Link, true);

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
];

export default function QuillEditor(
  props: React.ComponentProps<typeof ReactQuill>
) {
  return (
    <ReactQuill theme="snow" modules={modules} formats={formats} {...props} />
  );
}
