"use client";

import { useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";

// The production integration is unchanged. Local review keeps files in-browser.
export default function ReviewUploadWidget({ children, ...props }) {
  const input = useRef(null);
  if (process.env.NODE_ENV === "production") {
    return <CldUploadWidget {...props}>{children}</CldUploadWidget>;
  }
  const formats = props.options?.clientAllowedFormats || [];
  return <>
    <input ref={input} type="file" hidden accept={formats.map(f => `.${f}`).join(",")}
      onChange={event => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (props.options?.maxFileSize && file.size > props.options.maxFileSize) {
          alert("This file is too large. Please choose a smaller file.");
          return;
        }
        const reader = new FileReader();
        reader.onload = () => props.onSuccess?.({ info: { secure_url: reader.result, original_filename: file.name } });
        reader.readAsDataURL(file);
      }} />
    {children({ open: () => input.current?.click() })}
    <p className="mt-2 text-xs text-slate-500">Local review: this file stays in your browser and is not uploaded.</p>
  </>;
}
