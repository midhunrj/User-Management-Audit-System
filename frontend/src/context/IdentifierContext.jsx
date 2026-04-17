
import React, { createContext, useState, useContext, ReactNode } from 'react';




const LastIdentifierContext = createContext(undefined);

// Custom hook to access the context easily
export const useLastIdentifier = () => {
  const context = useContext(LastIdentifierContext);
  if (!context) {
    throw new Error("useLastIdentifier must be used within an IdentifierProvider");
  }
  return context;
};

export const IdentifierProvider = ({ children }) => {
  const [lastIdentifier, setLastIdentifier] = useState<string | null>(null);

  // Function to update lastIdentifier
  const updateLastIdentifier = (newIdentifier) => {
    setLastIdentifier(newIdentifier);
  };

  return (
    <LastIdentifierContext.Provider value={{ lastIdentifier, updateLastIdentifier }}>
      {children}
    </LastIdentifierContext.Provider>
  );
};
