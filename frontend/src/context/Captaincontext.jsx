import { createContext, useState, useContext, useEffect } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [ captain, setCaptain ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
    if (!captain) {
      // Try to get from localStorage
      const storedCaptain = localStorage.getItem("captain");
      if (storedCaptain) {
        setCaptain(JSON.parse(storedCaptain));
      }else{
        console.log("No Captain Stored");
      }
      // Or fetch from API if needed
      // else fetch('/api/captain/me').then(...)
    }
  }, [captain, setCaptain]);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;