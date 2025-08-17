"use client";

import { useState, useRef } from "react";
import { addGroup } from "@/app/actions/dashboardActions";

export function useAddGroupForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const [response, setResponse] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setResponse(null);

    const result = await addGroup(formData);
    setResponse(result);

    if (result.success) {
      e.target.reset();
      handleRemoveImage();
    }
  };

  return {
    imagePreview,
    response,
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
  };
}
