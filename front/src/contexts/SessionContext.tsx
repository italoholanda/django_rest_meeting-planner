"use client";

import { ReactNode, createContext, useState } from "react";

interface IProps {
  children: ReactNode;
}

const SessionContext = createContext({
  token: "",
  setToken: (arg: string) => {
    return;
  },
});

const SessionContextProvider = (props: IProps) => {
  const [token, setToken] = useState("");
  return (
    <SessionContext.Provider value={{ token, setToken }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export { SessionContextProvider, SessionContext };
