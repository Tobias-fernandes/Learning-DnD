"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";

interface IInputContext {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}

// Initialize the context
export const InputContext = createContext({} as IInputContext);

// Create context provider
export const InputContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [input, setInput] = useState<string>(""); // Initialize the state as an empty string

  return (
    <>
      <InputContext.Provider value={{ input, setInput }}>
        {children}
      </InputContext.Provider>
    </>
  );
};
