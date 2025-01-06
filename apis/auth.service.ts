import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./axiosInstance";
import {
  ILoginRequest,
  IAuthResponse,
  ISignUpRequest,
} from "@/types/auth.types";
import { clearSession, setSession } from "@/utils/session-manager";
import { clearRole } from "@/utils/role-manager";
import { deleteUserInfo } from '@/utils/user-manager';

type loginFuncType = (data: ILoginRequest) => Promise<IAuthResponse>;

export const logInFunction: loginFuncType = async (body) => {
  const client = generateAxiosInstance();
  const response = await client.post(urls.auth.login, body);
  return response.data;
};

type signUpFuncType = (data: ISignUpRequest) => Promise<IAuthResponse>;

export const signUpFunction: signUpFuncType = async (body) => {
  const client = generateAxiosInstance();
  const response = await client.post(urls.auth.signup, body);
  return response.data;
};

export const refreshAccessToken = async (refreshToken: string) => {
  const client = generateAxiosInstance();
  try {
    const response = await client.post(urls.auth.token, {
      refreshToken: refreshToken,
    });
    console.log(response.data);
    const newAccessToken = response.data.token.accessToken;
    setSession(newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.log("Failed to refresh access token:", error);
    throw error;
  }
};

export const signOut = async () => {
  const client = generateAxiosInstance();

  try {
    const response = await client.get(urls.auth.logout);

    if (response.status === 200 || response.status === 204) {
      clearSession();
      clearRole();
      deleteUserInfo();
      console.log("User has been signed out successfully.");
    } else {
      console.warn("Unexpected logout response:", response);
    }
  } catch (error) {
    console.error("Failed to log out:", error);
  }
};
