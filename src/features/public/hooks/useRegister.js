"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/features/public/services/authService";
import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
} from "@/features/public/utils/validation";

const useRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword,
    );
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      const { error } = await register(
        formData.email,
        formData.password,
        formData.name,
      );

      if (error) {
        setErrors({ form: error });
      } else {
        router.push("/login?registered=true");
      }

      setIsSubmitting(false);
    }
  };

  return { formData, errors, isSubmitting, handleChange, handleSubmit };
};

export default useRegister;
