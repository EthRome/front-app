import { createContext, useContext, useState } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';

interface ExampleContextType {
  navHeight: number | undefined;
  setNavHeight: Dispatch<SetStateAction<number | undefined>>;
}

const ExampleContext = createContext<ExampleContextType | undefined>(undefined);

export const ExampleContextProvider = ({ children }: { children: ReactNode }) => {
  const [navHeight, setNavHeight] = useState<number | undefined>(0);

  return <ExampleContext.Provider value={{ navHeight, setNavHeight }}>{children}</ExampleContext.Provider>;
};

export const useExampleData = () => {
  const context = useContext(ExampleContext);

  if (context === undefined) {
    throw new Error('Context should be inside provider!');
  }
  return context;
};
