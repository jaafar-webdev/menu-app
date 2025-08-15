"use client";

import { useState } from "react";
import { resetPassword } from "@/features/public/services/authService";
import { validateEmail } from "@/features/public/utils/validation";

const useResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    return newErrors;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (successMessage) setSuccessMessage("");
    if (errors.email || errors.form) setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setErrors({});

      const { error } = await resetPassword(email);

      if (error) {
        // For security reasons, we don't want to reveal if an email exists or not
        // So we show the same success message even if the email doesn't exist
        if (error.includes("user-not-found")) {
          setSuccessMessage(
            "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد الخاص بك.",
          );
          setEmail("");
        } else {
          setErrors({ form: error });
        }
      } else {
        setSuccessMessage(
          "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد الخاص بك.",
        );
        setEmail("");
      }

      setIsSubmitting(false);
    }
  };

  return {
    email,
    errors,
    isSubmitting,
    successMessage,
    handleChange,
    handleSubmit,
  };
};

export default useResetPassword;
