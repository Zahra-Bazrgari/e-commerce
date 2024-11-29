import { urls } from "@/utils/urls";
import { generateAxiosInstance } from './axiosInstance';


interface ILoginResDto {
  access_token: string;
}

interface ILoginReqDto {
  refresh_token: string;
}

type loginFuncType = (_: ILoginReqDto) => Promise<ILoginResDto>;
export const login: loginFuncType = async (body) => {
  const client = generateAxiosInstance();
  const response = await client.post(urls.auth.login, body);
  return response.data;
};