// src/features/public/services/authService.js
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import { loginAction, logoutAction } from "@/app/actions/auth";
import { getFirebaseErrorMessage } from "@/features/public/utils/firebaseErrors";

const handleAuthResponse = async (promise) => {
  try {
    const result = await promise;
    return { data: result, error: null };
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    return { data: null, error: getFirebaseErrorMessage(error.code) };
  }
};

export const login = async (email, password) => {
  const response = await handleAuthResponse(
    signInWithEmailAndPassword(auth, email, password),
  );

  if (response.data) {
    const token = await response.data.user.getIdToken();
    const sessionResult = await loginAction(token);
    if (!sessionResult.success) {
      return {
        data: null,
        error: sessionResult.error || "Failed to set session cookie",
      };
    }
  }

  return response;
};

export const register = async (email, password, name) => {
  const response = await handleAuthResponse(
    createUserWithEmailAndPassword(auth, email, password),
  );

  if (response.data) {
    await updateProfile(response.data.user, { displayName: name });
  }

  return response;
};

export const resetPassword = async (email) => {
  return handleAuthResponse(sendPasswordResetEmail(auth, email));
};

export const logout = async () => {
  let clientSignOutError = null;
  let serverLogoutError = null;

  const clientResponse = await handleAuthResponse(signOut(auth));
  if (clientResponse.error) {
    clientSignOutError = clientResponse.error;
    // Log this error, but proceed to server logout anyway.
    console.error(
      "Client-side signOut failed, proceeding with server logout:",
      clientSignOutError,
    );
  }

  try {
    const serverResponse = await logoutAction();
    if (!serverResponse.success) {
      serverLogoutError =
        serverResponse.error || "Failed to clear session on server.";
    }
  } catch (e) {
    serverLogoutError = "An unexpected error occurred during server logout.";
    console.error(serverLogoutError, e);
  }

  if (serverLogoutError || clientSignOutError) {
    return { data: null, error: serverLogoutError || clientSignOutError };
  }

  return { data: true, error: null };
};
