"use client";

import { useAddGroupForm } from "./useAddGroupForm";
import Input from "@/components/ui/Input";
import Button from "@/components/Button";
import ImagePreview from "./ImagePreview";
import FormResponse from "../components/FormResponse";

export default function AddGroupPage() {
  const {
    imagePreview,
    response,
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
  } = useAddGroupForm();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Group</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <FormResponse response={response} />

        <Input label="Group Name" name="groupName" id="groupName" required />

        <Input
          label="Group Image"
          name="image"
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />

        {imagePreview && (
          <ImagePreview src={imagePreview} onRemove={handleRemoveImage} />
        )}

        <Button type="submit" variant="default" className="w-full">
          Add Group
        </Button>
      </form>
    </div>
  );
}
