import { parseCookies, setCookie, destroyCookie } from 'nookies';

const COOKIE_USER_ID = process.env.NEXT_PUBLIC_USER_ID || 'user_id';

export const setUserId = (id: string, ctx?: any) => {
  setCookie(ctx, COOKIE_USER_ID, id, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
  });
};

export const getUserId = (ctx?: any): string | null => {
  const cookies = parseCookies(ctx);
  return cookies[COOKIE_USER_ID] || null;
};

export const clearUserId = (ctx?: any) => {
  destroyCookie(ctx, COOKIE_USER_ID, { path: '/' });
};
