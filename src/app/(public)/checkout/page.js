import Link from "next/link";
import ArrowIcon from "../../../components/icon/ArrowIcon";
import CheckoutClientView from "./CheckoutClientView";

const CheckoutPage = () => {
  return (
    <div className="p-4 mx-auto lg:w-[90%]">
      <h1 className="flex items-center mb-6">
        <Link
          href="/menu"
          className="bg-primary text-white w-9 h-9 rounded-sm flex items-center justify-center ml-3"
        >
          <ArrowIcon fill="white" />
        </Link>
        مراجعة الطلب
      </h1>
      <CheckoutClientView />
    </div>
  );
};

export default CheckoutPage;
