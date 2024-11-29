export const getToken = () => {
  return window.localStorage.getItem(
    process.env.NEXT_PUBLIC_TOKENS_NAME as string
  );
};

export const setToken = (token: string) => {
  return window.localStorage.setItem(
    process.env.NEXT_PUBLIC_TOKENS_NAME as string,
    token
  );
};

export const delToken = () => {
  window.localStorage.removeItem(
    process.env.NEXT_PUBLIC_TOKENS_NAME as string
  );
};