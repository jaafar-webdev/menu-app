"use server";

import { cookies } from "next/headers";

export async function loginAction(token) {
  try {
    if (!token) {
      return { error: "Token is required" };
    }

    cookies().set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { success: true, message: "Logged in successfully" };
  } catch (error) {
    console.error("Login Action Error:", error);
    return { error: "Internal Server Error" };
  }
}

export async function logoutAction() {
  try {
    cookies().set("authToken", "", { maxAge: 0, path: "/" });
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Logout Action Error:", error);
    return { error: "Internal Server Error" };
  }
}
