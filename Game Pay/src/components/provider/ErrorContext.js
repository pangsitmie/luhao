import React, { createContext, useContext, useState } from "react";

// Create a new context for handling errors
const ErrorContext = createContext(null);

// ErrorProvider component that wraps the entire application
export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  // useErrorHandler hook to consume GraphQL errors and log them to console
  const useErrorHandler = () => {
    const handleError = (error) => {
      setErrors((prevErrors) => [...prevErrors, error]);
      console.error(error);
    };

    return { handleError };
  };

  return (
    <ErrorContext.Provider value={{ errors, useErrorHandler }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Custom hook to consume the error context
export const useErrorContext = () => {
  return useContext(ErrorContext);
};
