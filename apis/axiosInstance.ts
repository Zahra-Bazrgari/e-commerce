import axios, { AxiosInstance } from "axios";

export const generateAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL
})