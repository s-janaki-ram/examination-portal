import { createContext, useContext, useState } from "react";

// Create the authentication context
const AuthContext = createContext();

// Authentication provider used by the whole application
export const AuthProvider = ({ children }) => {

  // Get previously saved user information from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  // Save login information after successful login
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Remove login information during logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication information
export const useAuth = () => {
  return useContext(AuthContext);
};