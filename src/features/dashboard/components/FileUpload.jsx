"use client";

export const FileUpload = ({
  preview,
  fileInputRef,
  handleFileChange,
  handleButtonClick,
  file,
}) => {
  return (
    <div className="mt-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <button
        type="button"
        onClick={handleButtonClick}
        className="flex flex-col items-center justify-center border-2 border-dashed border-white p-4 rounded-lg cursor-pointer hover:bg-indigo-400 transition-colors w-full"
      >
        {preview ? (
          <img
            src={preview}
            alt="معاينة الصورة"
            className="w-32 h-32 object-cover rounded-md mb-2"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        )}

        <span className="text-white mt-2">
          {file ? file.name : "اضغط لرفع صورة"}
        </span>
      </button>
    </div>
  );
};
