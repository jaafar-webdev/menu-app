"use client";
import { useState, useEffect, useCallback } from "react";
import useCartStore from "../../../store/cartStore";
import { useRouter } from "next/navigation";

const useCheckout = () => {
  const { clearCart, getSubtotal, items } = useCartStore();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(() => {
    const savedUserInfo = sessionStorage.getItem("userInfo");
    return savedUserInfo
      ? JSON.parse(savedUserInfo)
      : {
          name: "Gaafer Alwakeil",
          phone: "01023456789",
          address: "",
        };
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (items.length === 0) {
      router.push("/menu");
    }
  }, [items, router]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  const validate = () => {
    const newErrors = {};
    if (!userInfo.address.trim()) {
      newErrors.address = "العنوان مطلوب";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e) => {
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    if (items.length === 0) {
      // This is a safeguard, though the redirect should handle it.
      alert("لا يمكنك إرسال طلب فارغ.");
      return;
    }

    const subtotal = getSubtotal();
    const deliveryFee = 30;
    const total = subtotal + deliveryFee;

    const orderData = {
      userInfo,
      items,
      orderSummary: {
        subtotal,
        deliveryFee,
        total,
      },
    };

    console.log(orderData);
    clearCart();
    sessionStorage.removeItem("userInfo");
    router.push("/menu");
  };

  return {
    userInfo,
    items,
    errors,
    handleInputChange,
    handleSubmit,
    handleBlur,
  };
};

export default useCheckout;
