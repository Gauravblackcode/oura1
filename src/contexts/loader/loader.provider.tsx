import React, { useState, useMemo } from 'react';

export interface LoaderContextInterface {
  isLoading: boolean;
  showLoader: (isLoading: boolean) => void;
}

export const LoaderContext = React.createContext<LoaderContextInterface>({
  isLoading: false,
  showLoader: () => {},
});

const LoaderProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = (loading: boolean) => {
    setIsLoading(loading);
  };

  const contextValue: LoaderContextInterface = useMemo(
    () => ({
      isLoading,
      showLoader,
    }),
    [isLoading],
  );

  return <LoaderContext.Provider value={contextValue}>{children}</LoaderContext.Provider>;
};

export default LoaderProvider;
