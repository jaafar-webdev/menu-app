"use client";

import Link from "next/link";
import useResetPassword from "@/features/public/hooks/useResetPassword";
import Input from "@/components/ui/Input";
import Button from "@/components/Button";
import FormWrapper from "@/components/auth/FormWrapper";
import Alert from "@/components/ui/Alert";
import AuthLink from "@/components/auth/AuthLink";

const ResetPasswordPage = () => {
  const {
    email,
    errors,
    isSubmitting,
    successMessage,
    handleChange,
    handleSubmit,
  } = useResetPassword();

  return (
    <FormWrapper title="إعادة تعيين كلمة المرور">
      <Alert type="success" message={successMessage} />
      <Alert type="error" message={errors.firebase} />

      <p className="text-sm text-gray-600">
        أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور
        الخاصة بك.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <Input
          id="email"
          name="email"
          type="email"
          label="البريد الإلكتروني"
          value={email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          required
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
        </Button>
      </form>
      <div className="text-sm text-center">
        <p className="text-gray-600">
          <AuthLink href="/login">العودة إلى تسجيل الدخول</AuthLink>
        </p>
      </div>
    </FormWrapper>
  );
};

export default ResetPasswordPage;
