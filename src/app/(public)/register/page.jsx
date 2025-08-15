"use client";

import useRegister from "@/features/public/hooks/useRegister";
import FormWrapper from "@/components/auth/FormWrapper";
import Input from "@/components/ui/Input";
import Button from "@/components/Button";
import Alert from "@/components/ui/Alert";
import AuthLink from "@/components/auth/AuthLink";

const RegisterPage = () => {
  const {
    formData,
    errors,
    isSubmitting,
    showSuccessMessage,
    handleChange,
    handleSubmit,
  } = useRegister();

  return (
    <FormWrapper title="إنشاء حساب جديد">
      {showSuccessMessage && (
        <Alert type="success" message="تم إنشاء حسابك بنجاح!" />
      )}
      {errors.firebase && <Alert type="error" message={errors.firebase} />}
      <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
        <Input
          id="name"
          name="name"
          type="text"
          label="الاسم الكامل"
          autoComplete="name"
          required
          placeholder="الاسم الكامل"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="البريد الإلكتروني"
          autoComplete="email"
          required
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="كلمة المرور"
          autoComplete="new-password"
          required
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="تأكيد كلمة المرور"
          autoComplete="new-password"
          required
          placeholder="تأكيد كلمة المرور"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
        </Button>
      </form>
      <div className="text-sm text-center">
        <p className="text-gray-600">
          لديك حساب بالفعل؟ <AuthLink href="/login">تسجيل الدخول</AuthLink>
        </p>
      </div>
    </FormWrapper>
  );
};

export default RegisterPage;
