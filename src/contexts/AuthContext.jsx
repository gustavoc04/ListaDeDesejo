import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// o authcontext por guardar o token em um context
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const userToken = await AsyncStorage.getItem('token');
      setToken(userToken);
      setIsLoading(false);
    };

    getToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};
