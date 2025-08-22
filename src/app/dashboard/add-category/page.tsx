import type { FC } from "react";
import AddCategoryForm from "./AddCategoryForm";

const AddCategoryPage: FC = () => {
   return (
      <div className="max-w-4xl mx-auto p-8">
         <h1 className="text-2xl font-bold mb-6">Add New Category</h1>
         <AddCategoryForm />
      </div>
   );
};

export default AddCategoryPage;
