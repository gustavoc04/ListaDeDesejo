import React, { useState, useEffect, useRef } from 'react';
import { Text, Pressable, TextInput, StyleSheet, SafeAreaView, View, ActivityIndicator, Keyboard, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../utils/http';
import logo from '../../assets/LOGOEMPRESA.png';

export default function LoginScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const logoSize = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(logoSize, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: true, 
      }).start();
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(logoSize, {
        toValue: 1,
        duration: 300, 
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [logoSize]);

  
  //Ao clicar no botao login o dado do input email é enviado para a função login que faz a requisição na api e retona um objeto com
  // id, nome e email. Se a requisição retornar resposta o usuario é direcionado do grupo de navegação de autenticação para o drawernavigation
  const handleLogin = async () => {
    setLoading(true); 
    setError(''); 
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
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.Image source={logo} style={[styles.logo, { transform: [{ scale: logoSize }] }]} />
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
  logo: {
    width: 200, 
    height: 300, 
    marginBottom: 20, 
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%', 
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
    alignItems: 'center', 
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
