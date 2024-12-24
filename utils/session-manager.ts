import { parseCookies, setCookie, destroyCookie } from 'nookies';

const COOKIE_NAME = process.env.NEXT_PUBLIC_SESSIONS_NAME as string;

export const getSession = (ctx?: any) => {
  const cookies = parseCookies(ctx);
  return cookies[COOKIE_NAME];
};

export const setSession = (token: string, ctx?: any) => {
  setCookie(ctx, COOKIE_NAME, token, {
    maxAge: 5 * 60 , 
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
  });
};

export const clearSession = (ctx?: any) => {
  destroyCookie(ctx, COOKIE_NAME, { path: '/' });
};
