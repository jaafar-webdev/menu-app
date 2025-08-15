"use client";

import { useState } from "react";
import { FileUpload } from "@/features/dashboard/components/FileUpload";
import useFileUpload from "@/features/dashboard/hooks/useFileUpload";

export const CategoryForm = () => {
  const [title, setTitle] = useState("");

  const { file, preview, fileInputRef, handleFileChange, handleButtonClick } =
    useFileUpload();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const response = await fetch("http://localhost:3001/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <div className="bg-indigo-300 w-fit p-4 mt-2 rounded-2xl">
      <form onSubmit={handleSubmit}>
        <label className="text-white w-20">
          عنوان الفئة
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-1 outline-0 bg-white text-indigo-800 mx-2 rounded-md"
          />
        </label>

        <FileUpload
          preview={preview}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          handleButtonClick={handleButtonClick}
          file={file}
        />

        <button className="bg-white px-3 py-1 rounded-xl text-indigo-800 cursor-pointer mt-6">
          إرسال
        </button>
      </form>
    </div>
  );
};
