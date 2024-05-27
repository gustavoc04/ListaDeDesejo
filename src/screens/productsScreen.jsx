import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import ProductCard from '../components/ProductCards';
import { getCategory, getProductsByCategory } from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WishlistProvider } from '../contexts/WishlistContext';
const ProductsScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
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
        console.log(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (


    <View style={styles.container}>
 
 
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.produtoId.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
        />
      
      
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
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