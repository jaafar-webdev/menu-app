// src/features/public/utils/firebaseErrors.js
const FIREBASE_ERROR_MESSAGES = {
  "auth/invalid-credential": "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
  "auth/user-not-found": "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
  "auth/wrong-password": "كلمة المرور غير صحيحة.",
  "auth/too-many-requests":
    "تم تعطيل الوصول إلى هذا الحساب مؤقتًا بسبب محاولات تسجيل دخول متكررة. يمكنك استعادة الوصول على الفور عن طريق إعادة تعيين كلمة المرور الخاصة بك.",
  "auth/email-already-in-use":
    "البريد الإلكتروني مستخدم بالفعل. يرجى استخدام بريد إلكتروني آخر.",
  "auth/weak-password": "كلمة المرور ضعيفة جدًا. يرجى اختيار كلمة مرور أقوى.",
  "auth/invalid-email": "صيغة البريد الإلكتروني غير صحيحة.",
  "auth/operation-not-allowed": "العملية غير مسموح بها.",
  "auth/network-request-failed":
    "فشل طلب الشبكة. يرجى التحقق من اتصالك بالإنترنت.",
};

export const getFirebaseErrorMessage = (errorCode) => {
  return (
    FIREBASE_ERROR_MESSAGES[errorCode] ||
    "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."
  );
};
