import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Biblioteca de ícones FontAwesome
import AuthStack from './AuthStack'; 
import ProductsScreen from '../screens/productsScreen';
import WishlistScreen from '../screens/wishlistScreen'
import ProfileScreen from '../screens/profileScreen'
import CategoriesScreen from '../screens/categoriesScreen';
import CategoryProductsScreen from '../screens/categoryProductsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetailsScreen from '../screens/productDetailsScreen';
import { WishlistProvider } from '../contexts/WishlistContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// quando o botao logout for clicado o token é excluido e o usuario é redirecionado para a navegação de autenticaçao novamente
const handleLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('token'); 
    navigation.navigate('Auth'); 
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// o drawernavigation inicia na tela produtos
const CustomDrawerContent = (props) => {
  const [selectedOption, setSelectedOption] = useState('Produtos'); 


  // salva a tela selecionada para mostrar um ativador sobre a opçao e realiza a troca de tela
  const handleDrawerItemPress = (screenName) => {
    setSelectedOption(screenName);
    props.navigation.navigate(screenName);
  };

  // todos os itens do drawer com suas logos e nomes
  const renderDrawerItems = () => {
    return (
      <>
        <DrawerItem
          label="Produtos"
          onPress={() => handleDrawerItemPress('Produtos')}
          icon={({ color, size }) => <FontAwesome name="shopping-cart" size={size} color={color} />}
          focused={selectedOption === 'Produtos'}
        />
        <DrawerItem
          label="Categorias"
          onPress={() => handleDrawerItemPress('Categorias')}
          icon={({ color, size }) => <FontAwesome name="list" size={size} color={color} />}
          focused={selectedOption === 'Categorias'} 
        />
        <DrawerItem
          label="Favoritos"
          onPress={() => handleDrawerItemPress('Favoritos')}
          icon={({ color, size }) => <FontAwesome name="heart" size={size} color={color} />}
          focused={selectedOption === 'Favoritos'} 
        />
        <DrawerItem
          label="Sair"
          onPress={() => handleLogout(props.navigation)}
          icon={({ color, size }) => <FontAwesome name="sign-out" size={size} color={color} />}
        />
      </>
    );
  };

  // exibe uma logo que é o perfil do usuario e quando clicado navega para a rota 'Perfil'
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => handleDrawerItemPress('Perfil')} style={styles.profileButton}>
          <FontAwesome name="user-circle" size={50} color="black" />
          <Text style={styles.profileText}>Perfil</Text>
        </TouchableOpacity>
      </View>
      {renderDrawerItems()} 
    </DrawerContentScrollView>
  );
};

//define as rotas do drawernavigation
const AppDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Produtos" component={ProductsScreen} />
      <Drawer.Screen name="Categorias" component={CategoriesScreen} />
      <Drawer.Screen name="Favoritos" component={WishlistScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};


//Navega em stack entre a autenticação, drawernavigation, tela de produtos da categoria e tela de detalhes do produto
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Drawer" component={AppDrawer} />
      <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};


export default function AppNav() {
  return (
    <NavigationContainer>
    <WishlistProvider>
      <MainNavigator />
    </WishlistProvider>
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