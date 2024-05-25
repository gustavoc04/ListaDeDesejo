import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView} from 'react-native';

export default function SignUpScreen() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await signUp(userName, userEmail); // Chame a função de cadastro da API

      if (response.data) { // Verifique se o cadastro foi bem-sucedido
        // Exiba mensagem de sucesso ao usuário (opcional)
        // Potencialmente navegue para uma tela diferente (opcional)
      } else {
        console.error('Signup failed!');
        // Exiba mensagem de erro ao usuário
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Exiba mensagem de erro ao usuário
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Sign Up Screen</Text>
      <TextInput
        value={userName}
        onChangeText={setUserName}
        placeholder="Enter your name"
      />
      <TextInput
        value={userEmail}
        onChangeText={setUserEmail}
        placeholder="Enter your email"
      />
      <Button title="Sign Up" onPress={handleSignUp} />
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
