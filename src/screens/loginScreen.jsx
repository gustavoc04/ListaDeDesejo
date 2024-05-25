// LoginScreen.js
import React, { useState } from 'react';
import { Text, Pressable, TextInput, StyleSheet, SafeAreaView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        navigation.replace('Drawer');
      } else {
        setError('Login failed. Please check your email and try again.');
      }
    } catch (error) {
      setError('Error during login. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        value={userEmail}
        onChangeText={setUserEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
      <Pressable style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.buttonLoginText}>Login</Text>
      </Pressable>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '4%'
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40, // Additional margin to ensure it's at the bottom
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    marginBottom: 20,
    marginLeft: '5%'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '90%',
  },
  buttonLogin: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    width: '90%',
    borderRadius: 7,
    marginVertical: 5,
    alignItems: 'center', // Center text horizontally
  },
  buttonLoginText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
