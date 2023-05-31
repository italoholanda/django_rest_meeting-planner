const saveLocalStorageToken = (token: string) =>
  localStorage.setItem("_token", token);

const getLocalStorageToken = () => localStorage.getItem("_token");

export { saveLocalStorageToken, getLocalStorageToken };
