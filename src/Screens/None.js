import React, { createContext, useState } from "react";

// Create Context
export const TabContext = createContext();

// Context Provider Component
export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
