import React, { useContext } from 'react';

const ErrorContext = React.createContext();

export function ErrorProvider({ children }) {
  const [errorMessage, setErrorMessage] = React.useState(null);

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  return { errorMessage, setErrorMessage };
}
