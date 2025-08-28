"use client";

import { useState } from "react";
import Image from "next/image";
import PhoneIcon from "@/components/icon/PhoneIcon";

const BranchCard = ({ branch }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div
          className="flex-grow"
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer" }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {branch.name}
          </h2>
          <p className="text-gray-600">{branch.address}</p>
        </div>
        <div className="flex flex-col items-center space-y-4 ml-4 border-r pr-4 rtl:border-r-0 rtl:border-l rtl:ml-0 rtl:mr-4 rtl:pl-4">
          <a
            href={`tel:${branch.phone}`}
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <PhoneIcon className="w-6 h-6" />
          </a>
          <a
            href={`https://maps.google.com/?q=${branch.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Image src="/globe.svg" alt="Location" width={24} height={24} />
          </a>
        </div>
      </div>

      {isOpen && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div>
            <h3 className="font-bold text-lg text-gray-700">مدير الفرع</h3>
            <p className="text-gray-600">{branch.manager}</p>
          </div>
          <div className="mt-4">
            <h4 className="font-bold text-lg text-gray-700">الموظفون</h4>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              {branch.employees.map((employee, index) => (
                <li key={index}>{employee}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchCard;
