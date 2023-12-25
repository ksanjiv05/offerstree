export const isValidEmail = (value: string) => {
  const regEx =
    /^(?=.{1,256}$)([a-zA-Z0-9._-])+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

  return regEx.test(String(value).toLowerCase());
};
