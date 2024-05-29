import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { WishlistProvider, useWishlist } from '../contexts/WishlistContext';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteButton = ({ productId }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [token, setToken] = useState(null);
  const isFavorite = wishlist.includes(productId);

  //busca o token no AsyncStorage para acessar o email dentro dele para realizar a requisição nas funcões removeFromWishlist e addToWishlist
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenString = await AsyncStorage.getItem('token');
        const tokenObject = JSON.parse(tokenString);
        setToken(tokenObject);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, [addToWishlist, removeFromWishlist]);

  
  // verifica se o item é favorito ou não, se for ele remove ao clicar no botao, senao ele adiciona.
  const toggleFavorite = async () => {
    if (!token) return;

    const { email } = token;

    if (isFavorite) {
      await removeFromWishlist(productId, email);
    } else {
      await addToWishlist(productId, email);
    }
  };

  return (
    // a troca da cor do botao é realizado com um ternario que verifica a variavel isFavorite e caso seja favorito o coração fica vermelho e preenchido,
    //senao ele sera cinza e sem interior
    <WishlistProvider>
      <TouchableOpacity onPress={toggleFavorite} style={{}}>
        <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={20} color={isFavorite ? 'red' : 'grey'} />
      </TouchableOpacity>
    </WishlistProvider>
  );
};


export default FavoriteButton;
