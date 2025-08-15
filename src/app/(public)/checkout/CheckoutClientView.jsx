"use client";

import UserInfoForm from "./UserInfoForm";
import Button from "@/components/Button";
import useCheckout from "../../../features/public/hooks/useCheckout";
import CartItemsList from "@/features/public/cart/CartItemsList";
import CartDesktop from "@/features/public/cart/CartDesktop";

const CheckoutClientView = () => {
  const {
    userInfo,
    items,
    errors,
    handleInputChange,
    handleSubmit,
    handleBlur,
  } = useCheckout();

  return (
    <form onSubmit={handleSubmit} className="mx-auto space-y-6">
      <UserInfoForm
        userInfo={userInfo}
        onInputChange={handleInputChange}
        onBlur={handleBlur}
        errors={errors}
      />
      <CartDesktop showSummary={false} />
      <Button type="submit" size="lg" className="w-full">
        إرسال الطلب
      </Button>
    </form>
  );
};

export default CheckoutClientView;
