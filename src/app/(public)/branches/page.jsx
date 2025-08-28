import BranchCard from "@/components/branches/BranchCard";
import Image from "next/image";
import { branches } from "@/data/branches";

const BranchesPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Image
            src="/choseBranch.svg"
            alt="choseBranch"
            width={120}
            height={120}
            className="mx-auto"
          />
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mt-4">
            فروعنا
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            اكتشف مواقع فروعنا وتواصل معنا. نحن دائما في خدمتكم.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchesPage;
