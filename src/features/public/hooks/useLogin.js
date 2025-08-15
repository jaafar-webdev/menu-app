"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/features/public/services/authService";
import {
  validateEmail,
  validatePassword,
} from "@/features/public/utils/validation";

const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setShowSuccessMessage(true);
    }

    const callbackUrl = searchParams.get("callbackUrl");
    if (callbackUrl) {
      sessionStorage.setItem("callbackUrl", callbackUrl);
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors = {};
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (showSuccessMessage) {
      setShowSuccessMessage(false);
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setErrors({});

      const { error } = await login(formData.email, formData.password);

      if (error) {
        setErrors({ form: error });
      } else {
        const callbackUrl = sessionStorage.getItem("callbackUrl");
        if (callbackUrl) {
          sessionStorage.removeItem("callbackUrl");
          router.push(callbackUrl);
        } else {
          router.push("/menu");
        }
      }

      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    showSuccessMessage,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
