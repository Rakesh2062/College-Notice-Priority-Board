import { createContext, useContext, useState, useEffect } from "react";
import { loginApi, registerApi, getMeApi } from "../services/noticeService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          const freshUser = await getMeApi();
          setUser(freshUser);
          localStorage.setItem("user", JSON.stringify(freshUser));
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    localStorage.setItem("token", data.token);
    const userInfo = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
    return userInfo;
  };

  const register = async (userData) => {
    const data = await registerApi(userData);
    localStorage.setItem("token", data.token);
    const userInfo = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
    return userInfo;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAdmin: user?.role === "admin",
        isStudent: user?.role === "student",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

