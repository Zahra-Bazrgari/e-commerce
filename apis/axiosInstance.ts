import axios, { AxiosInstance } from "axios";

type funcType = (_?: {
  signal?: AbortSignal;
  progressCb?: (_?: number) => void;
}) => AxiosInstance;
export const generateAxiosInstance: funcType = (params) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    onUploadProgress(progressEvent) {
      if (!!params?.progressCb) params.progressCb(progressEvent.progress);
    },
    signal: params?.signal,
  });
};