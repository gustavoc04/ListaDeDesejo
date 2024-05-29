import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import ProductCard from '../components/ProductCards';
import { getProductsByCategory } from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WishlistProvider } from '../contexts/WishlistContext';

const CategoryProductsScreen = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params;
  const [products, setProducts] = useState([]);
  //busca os produtos da categoria com o id recebido por params na rota de navegação com a função getProductsByCategory,
  //passando também para ela o email obrigatoria pela api, que é armazenado no token no asyncstorage assim que realizado o login
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const email = await AsyncStorage.getItem('token');
        const data = await getProductsByCategory(categoryId, email);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryId]); // é chamado sempre que atualiza a variavel categoryId passada por params

  return (
    <WishlistProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{categoryName}</Text>
        </View>
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.produtoId.toString()}
          numColumns={2}
          contentContainerStyle={styles.content}
        />
      </SafeAreaView>
    </WishlistProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 16,
  },
});

export default CategoryProductsScreen;
