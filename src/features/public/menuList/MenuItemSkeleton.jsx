const MealItemSkeleton = () => {
  return (
    <div className="item flex justify-between gap-2 p-2 border border-gray-200 rounded-lg bg-white shadow-sm mx-2 my-3 animate-pulse">
      <div className="txt flex flex-col justify-between flex-grow gap-2 min-h-full">
        <div className="topRow flex flex-col gap-1">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>

        <div className="bottomRow flex items-center justify-between flex-shrink-0">
          <div className="h-6 bg-gray-200 rounded-full w-32"></div>
        </div>
      </div>

      <div className="flex-shrink-0 bg-gray-200 w-[100px] h-[100px] md:w-24 md:h-24 rounded-md lg:w-[120px] lg:h-[120px]"></div>
    </div>
  );
};

export default MealItemSkeleton;
