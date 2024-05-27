import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { WishlistProvider, useWishlist } from '../contexts/WishlistContext';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteButton = ({ productId }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [token, setToken] = useState(null);
  const isFavorite = wishlist.includes(productId);

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
  }, []);

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
    <WishlistProvider>
      <TouchableOpacity onPress={toggleFavorite} style={{}}>
        <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={20} color={isFavorite ? 'red' : 'grey'} />
      </TouchableOpacity>
    </WishlistProvider>
  );
};


export default FavoriteButton;
