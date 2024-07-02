import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { SiTrueup } from "react-icons/si";

export const AuthContext = createContext();

// This is Store

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [services, setServices] = useState("");
  const authorizationToken = `Bearer ${token}`;
  const [isLoading, setIsLoading] = useState(SiTrueup);

  // Store Token Functionality
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  //             JWT Authentication -- To Currently login user Data

  const userAuthentication = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User Data", data.userData);
        setUser(data.userData);
        setIsLoading(false);
      } else {
        console.error("Error Fetching User Data");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error Fetching User Data", error);
    }
  }, []);

  const getServices = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/data/service`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.msg);
        setServices(data.msg);
      }
    } catch (error) {
      console.error("Error fetching services from Frontend:", error);
    }
  };

  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        storeTokenInLS,
        logout,
        user,
        services,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// This is Delivery Boy and useContext has everything is in AuthContext

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
