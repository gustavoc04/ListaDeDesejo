// startScreen.js
import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView} from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Start Screen</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});