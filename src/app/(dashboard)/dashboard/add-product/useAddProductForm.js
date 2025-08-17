"use client";

import { useState, useEffect, useRef } from "react";
import { getGroups, addProduct } from "@/app/actions/dashboardActions";

export function useAddProductForm() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [response, setResponse] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const result = await getGroups();
        if (result.success) {
          setCategories(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to fetch categories.");
      }
      setIsLoading(false);
    }

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    // Note: This doesn't remove the file from the FileList in the input.
    // A more robust solution would be to manage files in state.
    // For this implementation, we clear the input if all previews are removed.
    if (imagePreviews.length === 1) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setResponse(null);

    const result = await addProduct(formData);
    setResponse(result);

    if (result.success) {
      e.target.reset();
      setImagePreviews([]);
    }
  };

  return {
    categories,
    isLoading,
    error,
    imagePreviews,
    response,
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
  };
}
