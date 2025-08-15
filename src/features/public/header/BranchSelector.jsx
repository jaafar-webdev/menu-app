import BranchIcon from "./icons/BranchIcon";

const BranchSelector = () => {
  return (
    <>
      <button className="flex items-center justify-end gap-2 h-10 flex-grow bg-white text-[#474b46] rounded-md p-1 min-w-[140px] overflow-hidden cursor-pointer">
        <div className="w-8 h-8 shrink-0 branch-icon">
          <BranchIcon className="h-full w-full" />
        </div>
        <div className="flex flex-col items-start flex-grow overflow-hidden">
          <small className="text-xs text-gray-500">استلام من</small>
          <span className="text-sm font-medium whitespace-nowrap">
            اختر الفرع
          </span>
        </div>
      </button>
    </>
  );
};

export default BranchSelector;
