// LoginScreen.js
import React, { useState } from 'react';
import { Text, Pressable, TextInput, StyleSheet, SafeAreaView, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../utils/http';

export default function LoginScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async () => {
    setLoading(true); // Start loading
    setError(''); // Clear any previous error
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
    } finally {
      setLoading(false); // End loading
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
          <Pressable style={styles.buttonLogin} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonLoginText}>Login</Text>
            )}
          </Pressable>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.divider} />
        </View>
        <Pressable style={styles.buttonRegister} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonRegisterText}>Cadastre-se</Text>
        </Pressable>
      </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '4%',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%', // Reduced margin to fit the divider and new button
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    marginBottom: 20,
    marginLeft: '5%',
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#777',
  },
  buttonRegister: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
    width: '90%',
    borderRadius: 7,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonRegisterText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
