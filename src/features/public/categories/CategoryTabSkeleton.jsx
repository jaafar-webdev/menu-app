// CategoryTabSkeleton.jsx
const CategoryTabSkeleton = () => {
  return (
    <ul dir="rtl" className="flex gap-2.5 overflow-x-auto no-scrollbar px-2">
      {Array(4)
        .fill()
        .map((_, index) => (
          <li key={index} className="flex-shrink-0">
            <div className="min-w-[130px] w-[130px] bg-gray-100 rounded-xl animate-pulse">
              <div className="flex flex-col text-center rounded-lg overflow-hidden p-1">
                <div className="w-full h-[90px] rounded-lg mb-1 bg-gray-200"></div>
                <div className="h-[35px] bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CategoryTabSkeleton;
