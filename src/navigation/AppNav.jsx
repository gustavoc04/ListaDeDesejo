import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Biblioteca de ícones FontAwesome
import AuthStack from './AuthStack'; 
import ProductsScreen from '../screens/productsScreen';
import FavoritesScreen from '../screens/favoritesScreen'
import ProfileScreen from '../screens/profileScreen'
import CategoriesScreen from '../screens/categoriesScreen';
import CategoryProductsScreen from '../screens/categoryProductsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Função para realizar o logout
const handleLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('token'); // Remova o token ou qualquer outro dado de autenticação
    navigation.navigate('Auth'); // Navegue para a tela de autenticação
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Custom Drawer content to include profile button at the top
const CustomDrawerContent = (props) => {
  const [selectedOption, setSelectedOption] = useState('Produtos'); // Estado para controlar a opção selecionada

  // Função para atualizar a opção selecionada e navegar para a tela correspondente
  const handleDrawerItemPress = (screenName) => {
    setSelectedOption(screenName); // Atualizar a opção selecionada
    props.navigation.navigate(screenName); // Navegar para a tela correspondente
  };

  // Função para renderizar os itens do Drawer
  const renderDrawerItems = () => {
    return (
      <>
        <DrawerItem
          label="Produtos"
          onPress={() => handleDrawerItemPress('Produtos')}
          icon={({ color, size }) => <FontAwesome name="shopping-cart" size={size} color={color} />}
          focused={selectedOption === 'Produtos'} // Adiciona o estado de foco para destacar a opção selecionada
        />
        <DrawerItem
          label="Categorias"
          onPress={() => handleDrawerItemPress('Categorias')}
          icon={({ color, size }) => <FontAwesome name="list" size={size} color={color} />}
          focused={selectedOption === 'Categorias'} // Adiciona o estado de foco para destacar a opção selecionada
        />
        <DrawerItem
          label="Favoritos"
          onPress={() => handleDrawerItemPress('Favoritos')}
          icon={({ color, size }) => <FontAwesome name="heart" size={size} color={color} />}
          focused={selectedOption === 'Favoritos'} // Adiciona o estado de foco para destacar a opção selecionada
        />
        <DrawerItem
          label="Sair"
          onPress={() => handleLogout(props.navigation)}
          icon={({ color, size }) => <FontAwesome name="sign-out" size={size} color={color} />}
        />
      </>
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => handleDrawerItemPress('Perfil')} style={styles.profileButton}>
          <FontAwesome name="user-circle" size={50} color="black" />
          <Text style={styles.profileText}>Profile</Text>
        </TouchableOpacity>
      </View>
      {renderDrawerItems()} 
    </DrawerContentScrollView>
  );
};

const AppDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Produtos" component={ProductsScreen} />
      <Drawer.Screen name="Categorias" component={CategoriesScreen} />
      <Drawer.Screen name="Favoritos" component={FavoritesScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Drawer" component={AppDrawer} />
      <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
    </Stack.Navigator>
  );
};

export default function AppNav() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'flex-start',
    marginLeft: '10%',
    marginBottom: 20,
    marginTop: 20,
  },
  profileButton: {
    alignItems: 'center',
  },
  profileText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});