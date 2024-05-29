import React, { useState, useEffect, useRef } from 'react';
import { Text, Pressable, TextInput, StyleSheet, SafeAreaView, View, ActivityIndicator, Keyboard, Animated, Alert } from 'react-native';
import { signUp } from '../utils/http';
import logo from '../../assets/LOGOEMPRESA.png';

export default function SignUpScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const logoSize = useRef(new Animated.Value(1)).current;

  // useEffect apenas para esconder a logo quando o teclado estiver ativo e exibir quando nao estiver
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

  // handleSignUp chama a função que enviar os dados coletados nos inputs para a função no arquivo http.jsx 
  // que faz a comunicação com a api quando o botão de enviar cadastro for clicado
  const handleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await signUp(userName, userEmail); // -> função signup importada do http.jsx passando nome e email como atributo
      console.log('Response do cadastro:', response); 

      if (response) {
        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Seu cadastro foi realizado com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('Login')
            }
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log('Error durante o cadastro:', error);
      setError('Erro no cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.Image source={logo} style={[styles.logo, { transform: [{ scale: logoSize }] }]} />
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
  logo: {
    width: 150,
    height: 250,
    marginBottom: 20,
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
