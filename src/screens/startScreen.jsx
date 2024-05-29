import React from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, Image } from 'react-native';
import logo from '../../assets/LOGOEMPRESA.png';

export default function StartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={logo} style={[styles.logo, { marginBottom: '30%' }]} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Lista de Desejos</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.buttonLogin,
              { backgroundColor: pressed ? '#0056b3' : '#007BFF' },
            ]}
            onPress={() => navigation.navigate('Login')} //altera a navegação para a tela de login clicando no botao login
          >
            <Text style={styles.buttonLoginText}>Login</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.buttonSignup,
              { backgroundColor: pressed ? '#e6f0ff' : 'transparent' },
            ]}
            onPress={() => navigation.navigate('SignUp')} //altera a navegação para a tela de cadastro clicando no botao cadastro
          >
            <Text style={styles.buttonSignupText}>Cadastre-se</Text>
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
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    marginBottom: 20,
    marginLeft: '5%',
  },
  buttonContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonLogin: {
    paddingVertical: 10,
    width: '100%',
    borderRadius: 7,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonLoginText: {
    color: 'white',
    fontSize: 16,
  },
  buttonSignup: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  buttonSignupText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
