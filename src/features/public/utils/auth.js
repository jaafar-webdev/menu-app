import { auth } from "../../../lib/firebase";
import Cookies from "js-cookie";

/**
 * Checks if the user is authenticated by verifying the presence of an authToken cookie.
 * @returns {boolean} True if the user is authenticated, false otherwise.
 */
export const isAuthenticated = () => {
  const token = Cookies.get("authToken");
  return !!token;
};

/**
 * Retrieves the current authenticated Firebase user.
 * This function returns a promise that resolves with the user object or null.
 * @returns {Promise<import("firebase/auth").User|null>} The current user object or null if not authenticated.
 */
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // Unsubscribe after the first state change to get the current user.
      resolve(user);
    }, reject);
  });
};

/**
 * Fetches and returns a simplified user data object for the currently authenticated user.
 * @returns {Promise<Object|null>} A promise that resolves to an object with user data, or null if not authenticated.
 */
export const getUserData = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
};
