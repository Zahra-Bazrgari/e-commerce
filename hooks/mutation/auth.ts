import {
  logInFunction,
  signUpFunction,
  refreshAccessToken,
} from "@/apis/auth.service";
import { useMutation } from "react-query";
import { setSession } from "@/utils/session-manager";
import { setRole } from "@/utils/role-manager";
import { setUserInfo } from "@/utils/user-manager";

let refreshTimeout: NodeJS.Timeout | null = null;

const startSingleRefreshTimer = (refreshToken: string) => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
  }

  refreshTimeout = setTimeout(async () => {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      setSession(newAccessToken);
      console.log("Access token refreshed successfully!");
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
      setUserInfo(data.data.user);

      startSingleRefreshTimer(refreshToken);
    },
  });
};

export const useSignup = () => {
  return useMutation(signUpFunction, {
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.token;
      
      setSession(accessToken);
      setRole(data.data.user.role);
      setUserInfo(data.data.user);

      startSingleRefreshTimer(refreshToken);
    },
  });
};
