import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./axiosInstance";
import {
  ILoginRequest,
  IAuthResponse,
  ISignUpRequest,
} from "@/types/auth.types";
import { clearSession, setSession } from "@/utils/session-manager";
import { clearRole } from "@/utils/role-manager";
import { clearUserId } from "@/utils/id-manager";

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
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};

export const signOut = () => {
  clearSession();
  clearRole();
  clearUserId();
  console.log("User has been signed out successfully.");
};
