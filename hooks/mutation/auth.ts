import {
  logInFunction,
  signUpFunction,
  refreshAccessToken,
} from "@/apis/auth.service";
import { useMutation } from "react-query";
import { setSession } from "@/utils/session-manager";
import { setRole } from "@/utils/role-manager";
import { setUserId } from "@/utils/id-manager";

const startTokenRefreshTimer = (refreshToken: string) => {
  setTimeout(async () => {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      setSession(newAccessToken);
    } catch (error) {
      console.error("Failed to refresh access token:", error);
    }
  }, 14 * 60 * 1000);
};

export const useLogin = () => {
  return useMutation(logInFunction, {
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.token;
      setSession(accessToken);
      setRole(data.data.user.role);
      setUserId(data.data.user._id);
      startTokenRefreshTimer(refreshToken);
    },
  });
};

export const useSignup = () => {
  return useMutation(signUpFunction, {
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.token;
      setSession(accessToken);
      setRole(data.data.user.role);
      setUserId(data.data.user._id);
      startTokenRefreshTimer(refreshToken);
    },
  });
};
