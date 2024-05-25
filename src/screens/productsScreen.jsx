import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCards';
import { getCategory, getProductsByCategory } from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>All Products</Text>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.produtoId} product={product} />
        ))
      ) : (
        <Text>No products available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
});

export default ProductsScreen;
