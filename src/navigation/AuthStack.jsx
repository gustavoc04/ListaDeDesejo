import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/startScreen';
import LoginScreen from '../screens/loginScreen';
import SignUpScreen from '../screens/signUpScreen';

const Stack = createStackNavigator();

//esse stack de navegação é responsavel ate que o usuario seja autenticado, apos isso ele é alterado para a navegação principal do app
export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
