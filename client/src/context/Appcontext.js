import { createContext, useState } from "react";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
