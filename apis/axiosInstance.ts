import axios from "axios";
import { getSession } from '@/utils/session-manager';

export const generateAxiosInstance = () => {
  const token = getSession();
  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = token;
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers,
  })
}