"use client";

import useLogin from "@/features/public/hooks/useLogin";
import FormWrapper from "@/components/auth/FormWrapper";
import Input from "@/components/ui/Input";
import Button from "@/components/Button";
import Alert from "@/components/ui/Alert";
import AuthLink from "@/components/auth/AuthLink";

const LoginPage = () => {
  const {
    formData,
    errors,
    isSubmitting,
    showSuccessMessage,
    handleChange,
    handleSubmit,
  } = useLogin();

  return (
    <FormWrapper title="تسجيل الدخول">
      {showSuccessMessage && (
        <Alert type="success" message="تم تسجيل الدخول بنجاح!" />
      )}
      {errors.form && <Alert type="error" message={errors.form} />}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
          autoComplete="current-password"
          required
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <AuthLink href="/reset-password">هل نسيت كلمة المرور؟</AuthLink>
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </Button>
      </form>
      <div className="text-sm text-center">
        <p className="text-gray-600">
          ليس لديك حساب؟ <AuthLink href="/register">إنشاء حساب</AuthLink>
        </p>
      </div>
    </FormWrapper>
  );
};

export default LoginPage;
