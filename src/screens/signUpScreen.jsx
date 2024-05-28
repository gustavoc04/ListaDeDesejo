// SignUpScreen.js
import React, { useState } from 'react';
import { Text, Pressable, TextInput, StyleSheet, SafeAreaView, View, ActivityIndicator, Alert } from 'react-native';
import { signUp } from '../utils/http';

export default function SignUpScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await signUp(userName, userEmail);

      if (response) {
        console.log(response);
        Alert.alert(
          'Cadastro realizado com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('Login')
            }
          ],
          { cancelable: false }
        );
      } else {
        setLoading(false);
        setError('Erro no cadastro.');
      }
      
    } catch (error) {
      setError('Erro no cadastro.');
    } finally {
      setLoading(false);

    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Cadastro</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Nome"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          value={userEmail}
          onChangeText={setUserEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonSignUp} onPress={handleSignUp} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonSignUpText}>Cadastrar</Text>
            )}
          </Pressable>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.divider} />
          </View>
          <Pressable style={styles.buttonLogin} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonLoginText}>Fazer login</Text>
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
    padding: '4%',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
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
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
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
  buttonSignUp: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    width: '90%',
    borderRadius: 7,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonSignUpText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  buttonLogin: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
    width: '90%',
    borderRadius: 7,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonLoginText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
