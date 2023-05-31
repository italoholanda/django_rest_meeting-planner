"use client";

import { getLocalStorageToken, saveLocalStorageToken } from "@/util/storeToken";
import { ReactNode, createContext, useEffect, useState } from "react";

interface IProps {
  children: ReactNode;
}

const SessionContext = createContext({
  token: "",
  setToken: (arg: string) => {
    return;
  },
  tokenLoaded: false,
});

const SessionContextProvider = (props: IProps) => {
  const [token, _setToken] = useState("");
  const [tokenLoaded, setTokenLoaded] = useState(false);

  const setToken = (token: string) => {
    saveLocalStorageToken(token);
    _setToken(token);
  };

  useEffect(() => {
    const token = getLocalStorageToken();
    if (token) _setToken(token);
    setTokenLoaded(true);
  }, []);

  return (
    <SessionContext.Provider value={{ token, setToken, tokenLoaded }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export { SessionContextProvider, SessionContext };
