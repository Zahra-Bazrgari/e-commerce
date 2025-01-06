import { parseCookies, setCookie, destroyCookie } from "nookies";

const COOKIE_NAME = process.env.NEXT_PUBLIC_SESSIONS_NAME as string;

export const getSession = () => {
  const cookies = parseCookies();
  return cookies[COOKIE_NAME];
};

export const setSession = (token: string) => {
  setCookie(null, COOKIE_NAME, token, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  });
};

export const clearSession = () => {
  destroyCookie(null, COOKIE_NAME, { path: "/" });
};
