"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/features/public/services/authService";

const useLogout = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError(null);

    const { error } = await logout();

    if (error) {
      setError(error);
      console.error("Error signing out:", error);
    } else {
      router.push("/menu");
    }

    setIsLoggingOut(false);
  };

  return { handleLogout, isLoggingOut, error };
};

export default useLogout;
