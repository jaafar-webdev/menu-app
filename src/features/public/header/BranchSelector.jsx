import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import BranchIcon from "./icons/BranchIcon";
import "./header.css";
import { branches } from "@/data/branches";

const BranchSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const selectorRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSelectBranch = (branch) => {
    setSelectedBranch(branch);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex-grow min-w-[140px]" ref={selectorRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-end gap-2 h-10 w-full bg-white text-[#474b46] rounded-md p-1 overflow-hidden cursor-pointer"
      >
        <div className="w-8 h-8 shrink-0 branch-icon">
          <BranchIcon className="h-full w-full" />
        </div>
        <div className="flex flex-col items-start flex-grow overflow-hidden">
          <small className="text-xs text-gray-500">
            {selectedBranch ? "الفرع المختار" : "استلام من"}
          </small>
          <span className="text-sm font-medium whitespace-nowrap">
            {selectedBranch ? selectedBranch.name : "اختر الفرع"}
          </span>
        </div>
      </button>

      <CSSTransition
        nodeRef={dropdownRef}
        in={isOpen}
        timeout={200}
        classNames="branch-dropdown"
        unmountOnExit
      >
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 w-screen max-w-[90Vw] bg-white shadow-lg z-10 border-y border-gray-200 left-1/2 -translate-x-1/2 md:w-full md:left-0 md:translate-x-0 md:rounded-md md:border"
        >
          <ul className="py-1">
            {branches.map((branch) => (
              <li
                key={branch.id}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      {branch.name}
                    </p>
                    <p className="text-xs text-gray-500">{branch.address}</p>
                  </div>
                  <button
                    onClick={() => handleSelectBranch(branch)}
                    className="text-xs bg-[#272727] text-white font-bold py-1.5 px-3 rounded-md hover:bg-black transition-colors"
                  >
                    اختر
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default BranchSelector;
