import Button from "../../../components/Button";
import { useRouter } from "next/navigation";

export default function CartSummary({ total, isEmpty }) {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center my-4 font-bold text-[16px]">
        <span>الإجمالي</span>
        <span> {total.toFixed(2)} EGP</span>
      </div>
      <Button
        className="bg-primary text-white hover:bg-primary-transparent w-full py-2 px-4 font-medium hidden md:block"
        type="button"
        disabled={isEmpty}
        onClick={() => router.push("/checkout")}
      >
        تنفيذ الطلب
      </Button>
    </>
  );
}
