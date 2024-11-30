export const getSession = () => {
  return window.localStorage.getItem(
    process.env.NEXT_PUBLIC_SESSIONS_NAME as string
  );
};

export const setSession = (token: string) => {
  return window.localStorage.setItem(
    process.env.NEXT_PUBLIC_SESSIONS_NAME as string,
    token
  );
};

export const clearSession = () => {
  window.localStorage.removeItem(
    process.env.NEXT_PUBLIC_SESSIONS_NAME as string
  );
};