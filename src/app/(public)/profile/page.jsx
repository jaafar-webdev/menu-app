"use client";

import { useAuth } from "@/context/AuthContext";
import LogoutButton from "@/components/LogoutButton";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          الملف الشخصي
        </h2>

        <div className="space-y-4">
          {user?.photoURL && (
            <div className="flex justify-center">
              <img
                src={user.photoURL}
                alt="صورة المستخدم"
                className="w-24 h-24 rounded-full"
              />
            </div>
          )}

          <div className="p-4 bg-gray-100 rounded-md">
            <p className="mb-2">
              <span className="font-semibold">الاسم:</span>{" "}
              {user?.displayName || "غير محدد"}
            </p>
            <p className="mb-2">
              <span className="font-semibold">البريد الإلكتروني:</span>{" "}
              {user?.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">
                حالة التحقق من البريد الإلكتروني:
              </span>
              {user?.emailVerified ? "تم التحقق" : "لم يتم التحقق"}
            </p>
          </div>

          <div className="flex justify-center">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
