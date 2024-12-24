import { parseCookies, setCookie, destroyCookie } from 'nookies';

const COOKIE_ROLE_NAME = process.env.NEXT_PUBLIC_ROLE_NAME as string;

export const setRole = (role: string, ctx?: any) => {
  setCookie(ctx, COOKIE_ROLE_NAME, role, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
  });
};

export const getRole = (ctx?: any): string | null => {
  const cookies = parseCookies(ctx);
  return cookies[COOKIE_ROLE_NAME] || null;
};

export const clearRole = (ctx?: any) => {
  destroyCookie(ctx, COOKIE_ROLE_NAME, { path: '/' });
};
