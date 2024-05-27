import React, { createContext, useContext, useState, useEffect } from 'react';
import { postProductOnWishlist, deleteProdutcFromWishlist } from '../utils/http';
import { getProductsIdsFromWishlist } from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlistIds = async () => {
      try {
        const tokenString = await AsyncStorage.getItem('token');
        if (tokenString) {
          const token = JSON.parse(tokenString);
          const email = token.email;
          const wishlistIds = await getProductsIdsFromWishlist(email);
          setWishlist(wishlistIds);
        } else {
          console.log('Token not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching wishlist IDs:', error);
      }
    };

    fetchWishlistIds();
  }, []);

  const addToWishlist = async (productId, userEmail) => {
    try {
      await postProductOnWishlist(productId, userEmail);
      setWishlist([...wishlist, productId]);
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId, userEmail) => {
    try {
      await deleteProdutcFromWishlist(productId, userEmail);
      // Atualize a lista de desejos removendo o produto
      setWishlist(wishlist.filter(id => id !== productId));
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};