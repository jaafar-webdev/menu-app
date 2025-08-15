import React from "react";

const FormWrapper = ({ title, children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
