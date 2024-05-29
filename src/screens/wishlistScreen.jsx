import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ProductCard from '../components/ProductCards';
import { getProductsFromWishlist } from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WishlistProvider } from '../contexts/WishlistContext';

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState([]);
  const [total, setTotal] = useState(0);

  //busca o token no asyncStorage para guardar o email e realizar a requisição da funcão getProductsFromWishlist  
  // que retorna os produtos da lista de desejo
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const tokenString = await AsyncStorage.getItem('token');
        const token = JSON.parse(tokenString);
        const email = token.email;
        const wishlistProducts = await getProductsFromWishlist(email);
        setWishlist(wishlistProducts);

        // realiza a soma total do valor dos produtos favoritados, iniciando em 0 e somando o product.preco de cada item
        const totalAmount = wishlistProducts.reduce((valor, product) => valor + product.preco, 0);
        setTotal(totalAmount);
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
      }
    };

    fetchWishlist();
  }, [wishlist]);

  return (
    <WishlistProvider>
      <View style={styles.container}>
        {wishlist.length > 0 ? (
          <>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
            </View>
            <FlatList
              data={wishlist}
              renderItem={({ item }) => <ProductCard product={item} />}
              keyExtractor={(item) => item.produtoId.toString()}
              contentContainerStyle={styles.list}
            />
          </>
        ) : (
          <Text>No products in wishlist</Text>
        )}
      </View>
    </WishlistProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5
  },
  totalLabel: {
    fontSize: 18,
    color: 'gray',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WishlistScreen;
