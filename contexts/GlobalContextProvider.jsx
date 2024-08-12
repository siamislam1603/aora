import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import React, { createContext, useContext, useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useAuth = () => useContext(GlobalContext);
const queryClient = new QueryClient();

const GlobalContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setIsLoggedIn(!isLoggedIn);
        setUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(!isLoading));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          isLoading,
          setIsLoading,
        }}
      >
        {isLoading ? <LoadingScreen /> : children}

        <StatusBar style="light" backgroundColor="#161622" />
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
};

export default GlobalContextProvider;
