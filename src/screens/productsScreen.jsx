import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ProductCard from '../components/ProductCards';
import { getCategory, getProductsByCategory } from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WishlistProvider, useWishlist } from '../contexts/WishlistContext';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Adicionando estado de loading
  const { wishlist } = useWishlist();

  const fetchProducts = async () => {
    try {
      const email = await AsyncStorage.getItem('token');
      const categories = await getCategory();
      const allProducts = [];
      
      for (const category of categories) {
        const categoryProducts = await getProductsByCategory(category.categoriaId, email);
        allProducts.push(...categoryProducts);
      }

      setProducts(allProducts);
      console.log('Fetched products:', allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const updateProducts = () => {
      setProducts(prevProducts =>
        prevProducts.map(product => ({
          ...product,
          isFavorite: wishlist.includes(product.produtoId),
        }))
      );
    };

    updateProducts();
  }, [wishlist]); // Dependência no wishlist

  useFocusEffect(
    useCallback(() => {
      const refreshProducts = async () => {
        setLoading(true);
        await fetchProducts();
        setLoading(false);
      };

      refreshProducts();
    }, [])
  );

  const onRefresh = async () => {
    setLoading(true);
    await fetchProducts();
    setLoading(false);
  };

  return (
    <WishlistProvider>
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard product={item} loading={loading} />}
          keyExtractor={(item) => item.produtoId.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        />
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
    justifyContent: 'space-between',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default ProductsScreen;
