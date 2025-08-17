"use client";

import { useAddProductForm } from "./useAddProductForm";
import Input from "@/components/ui/Input";
import Button from "@/components/Button";
import Select from "@/components/ui/Select";
import MultiImagePreview from "./MultiImagePreview";
import FormResponse from "../components/FormResponse";

export default function AddProductPage() {
  const {
    categories,
    isLoading,
    error,
    imagePreviews,
    response,
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
  } = useAddProductForm();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <fieldset disabled={isLoading}>
          <FormResponse response={response} />

          <Select
            label="Category"
            name="category"
            options={categories}
            disabled={isLoading}
            required
          />

          <Input label="Product Name" name="productName" required />

          <Input label="Description" name="description" required />

          <Input label="Price" name="price" type="number" required />

          <div className="flex items-center">
            <input
              id="inStock"
              name="inStock"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="inStock"
              className="ml-2 block text-sm text-gray-900"
            >
              In Stock
            </label>
          </div>

          <Input label="Discount Price" name="discount" type="number" />

          <Input
            label="Product Images"
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />

          {imagePreviews.length > 0 && (
            <MultiImagePreview
              images={imagePreviews}
              onRemove={handleRemoveImage}
            />
          )}

          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Product"}
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
