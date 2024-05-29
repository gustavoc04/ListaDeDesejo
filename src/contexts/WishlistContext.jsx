import React, { createContext, useContext, useState, useEffect } from 'react';
import { postProductOnWishlist, deleteProdutcFromWishlist, getProductsIdsFromWishlist } from '../utils/http'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

// Cria um contexto para a lista de desejos
const WishlistContext = createContext();

// Hook personalizado para usar o contexto Wishlist
export const useWishlist = () => useContext(WishlistContext);

// Provedor do contexto Wishlist
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]); // Estado para armazenar a lista de desejos

  // useEffect para buscar os IDs dos produtos na lista de desejos ao montar o componente
  useEffect(() => {
    const fetchWishlistIds = async () => {
      try {
        const tokenString = await AsyncStorage.getItem('token'); // Obtém o token do AsyncStorage
        if (tokenString) {
          const token = JSON.parse(tokenString); 
          const email = token.email; // Obtém o email do token
          const wishlistIds = await getProductsIdsFromWishlist(email); // Busca os IDs dos produtos da lista de desejos
          setWishlist(wishlistIds); // Atualiza o estado da lista de desejos
        } else {
          console.log('Token not found in AsyncStorage'); 
        }
      } catch (error) {
        console.error('Error fetching wishlist IDs:', error); 
      }
    };

    fetchWishlistIds(); 
  }, []);

  // Função para adicionar um produto à lista de desejos
  const addToWishlist = async (productId, userEmail) => {
    try {
      await postProductOnWishlist(productId, userEmail); // Chama a função que adiciona o produto na lista de desejos
      setWishlist([...wishlist, productId]); // Atualiza o estado da lista de desejos
    } catch (error) {
      console.error('Error adding product to wishlist:', error); 
    }
  };

  // Função para remover um produto da lista de desejos
  const removeFromWishlist = async (productId, userEmail) => {
    try {
      await deleteProdutcFromWishlist(productId, userEmail); // Chama a função que remove o produto da lista de desejos
      setWishlist(wishlist.filter(id => id !== productId)); // Atualiza a lista de desejos removendo o produto
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  // Retorna o provedor do contexto com os valores do estado e as funções de manipulação da lista de desejos
  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children} 
    </WishlistContext.Provider>
  );
};
