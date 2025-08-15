import React from "react";

const Alert = ({ type, message }) => {
  const baseClasses = "p-3 text-sm rounded-md";
  const typeClasses = {
    success: "text-white bg-green-500",
    error: "text-white bg-red-500",
  };

  if (!message) return null;

  return (
    <div className={`${baseClasses} ${typeClasses[type] || typeClasses.error}`}>
      {message}
    </div>
  );
};

export default Alert;
