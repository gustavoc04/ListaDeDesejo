import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNav from './src/navigation/AppNav';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  useEffect(() => {
    AsyncStorage.removeItem('token');
  }, []);
  
  return (

    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
