import React, { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [authType, setAuthType] = useState("SignInScreen");
  const [customComponent, setCustomComponent] = useState(null);
  return (
    <AuthContext.Provider
      value={{ authType, setAuthType, customComponent, setCustomComponent }}
    >
      {children}
    </AuthContext.Provider>
  );
};
