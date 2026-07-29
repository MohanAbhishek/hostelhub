// src/context/AuthContext.jsx

import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  jwtDecode,
} from "jwt-decode";

export const AuthContext =
  createContext();

function AuthProvider({ children }) {

  const [token, setToken] =
    useState(null);

  const [user, setUser] =
    useState(null);

  const [isAuthenticated,
    setIsAuthenticated] =
    useState(false);

  const [authLoading,
    setAuthLoading] =
    useState(true);

  // RESTORE AUTH ON REFRESH

  useEffect(() => {

    const restoreAuth = () => {

      try {

        const savedToken =
          localStorage.getItem("token");

        if (!savedToken) {

          setAuthLoading(false);

          return;
        }

        const decoded =
          jwtDecode(savedToken);

        const currentTime =
          Date.now() / 1000;

        // TOKEN EXPIRED

        if (decoded.exp < currentTime) {

          logout();

          setAuthLoading(false);

          return;
        }

        // RESTORE SESSION

        setToken(savedToken);

        setUser(decoded);

        setIsAuthenticated(true);

      } catch (error) {

        console.error(error);

        logout();

      } finally {

        setAuthLoading(false);
      }
    };

    restoreAuth();

  }, []);

  // LOGIN

  const login = (jwtToken) => {

    try {

      const decoded =
        jwtDecode(jwtToken);

      localStorage.setItem(
        "token",
        jwtToken
      );

      setToken(jwtToken);

      setUser(decoded);

      setIsAuthenticated(true);

    } catch (error) {

      console.error(error);

      logout();
    }
  };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

    setUser(null);

    setIsAuthenticated(false);
  };

  return (

    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        authLoading,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

export default AuthProvider;