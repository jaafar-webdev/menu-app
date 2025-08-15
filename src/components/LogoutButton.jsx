"use client";

import useLogout from "@/features/public/hooks/useLogout";

const LogoutButton = ({ className = "" }) => {
  const { handleLogout } = useLogout();

  return (
    <button
      onClick={handleLogout}
      className={`px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${className}`}
    >
      تسجيل الخروج
    </button>
  );
};

export default LogoutButton;
