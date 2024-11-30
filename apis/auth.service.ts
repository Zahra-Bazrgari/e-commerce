import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./axiosInstance";
import {
  ILoginRequest,
  IAuthResponse,
  ISignUpRequest,
} from "@/types/auth.types";

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
