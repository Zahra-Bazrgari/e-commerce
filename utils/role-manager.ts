export const setRole = (role: string) => {
  window.localStorage.setItem(
    process.env.NEXT_PUBLIC_ROLE_NAME as string,
    role
  );
};

export const getRole = (): string | null => {
  return window.localStorage.getItem(process.env.NEXT_PUBLIC_ROLE_NAME as string);
};

export const clearRole = () => {
  window.localStorage.removeItem(process.env.NEXT_PUBLIC_ROLE_NAME as string);
};
