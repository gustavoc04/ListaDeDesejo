import React, { useState } from 'react';
import { Text, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../utils/http';

export default function LoginScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(userEmail);
  
      if (response) {
        console.log(response);
        await AsyncStorage.setItem('token', JSON.stringify(response));
        navigation.replace('Drawer')
      } else {
        setError('Login failed. Please check your email and try again.');
      }
    } catch (error) {
      setError('Error during login. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Login Screen</Text>
      <TextInput
        value={userEmail}
        onChangeText={setUserEmail}
        placeholder="Enter your email"
      />
      <Button title="Login" onPress={handleLogin} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
