import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);

  //faz a busca das informações do usuario (email e nome) que ficam salvos no 'token' no AsyncStorage assim que é realizado o login
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const { nome, email } = JSON.parse(token);
        setUserInfo({ nome, email });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <MaterialIcons name="account-circle" size={200} color="lightgrey" />
      </View>
      {userInfo ? (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={[styles.textInput, { width: '100%' }]}
              value={userInfo.nome}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              style={[styles.textInput, { width: '100%' }]}
              value={userInfo.email}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: '20%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    justifyContent: 'flex-start'
  },
  textInput: {
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
});
