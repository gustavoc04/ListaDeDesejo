import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/startScreen';
import LoginScreen from '../screens/loginScreen';
import SignUpScreen from '../screens/signUpScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
