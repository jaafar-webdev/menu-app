// src/features/public/utils/validation.js

export const validateEmail = (email) => {
  if (!email) {
    return "البريد الإلكتروني مطلوب.";
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return "صيغة البريد الإلكتروني غير صحيحة.";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return "كلمة المرور مطلوبة.";
  }
  if (password.length < 6) {
    return "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.";
  }
  return null;
};

export const validateName = (name) => {
  if (!name.trim()) {
    return "الاسم مطلوب.";
  }
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return "تأكيد كلمة المرور مطلوب.";
  }
  if (password !== confirmPassword) {
    return "كلمات المرور غير متطابقة.";
  }
  return null;
};
