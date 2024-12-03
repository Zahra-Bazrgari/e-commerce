import axios from "axios";
import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./axiosInstance";
import {
  ILoginRequest,
  IAuthResponse,
  ISignUpRequest,
} from "@/types/auth.types";
import { setSession } from "@/utils/session-manager";

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


export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = window.localStorage.getItem(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string
  );

  if (!refreshToken) return null;

  try {
    const response = await axios.post(urls.auth.token, { refreshToken });

    const newAccessToken = response.data.token.accessToken;

    window.localStorage.setItem(
      process.env.NEXT_PUBLIC_SESSIONS_NAME as string,
      newAccessToken
    );

    return newAccessToken;
  } catch (error) {
    console.log("Failed to refresh access token:", error);
    return null;
  }
};
