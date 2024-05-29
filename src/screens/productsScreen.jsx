import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ProductCard from '../components/ProductCards';
import { getCategory, getProductsByCategory } from '../utils/http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WishlistProvider, useWishlist } from '../contexts/WishlistContext';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { wishlist } = useWishlist();

  // o fetchProducts faz a busca de todos os produtos para serem exibidos na tela de produtos.
  // Primeiro é chamado a função getCategory para salvar todas as categorias em um array de categorias
  // Depois é feito um for, chamando a função getProdutcsByCategory para cada categoria do vetor categorias
  // e salvando todos os produtos em um array de produtos para serem exibidos na tela

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

  // Assim que a tela é montada a busca dos produtos é realizada
  useEffect(() => {
    fetchProducts();
  }, []);

  // Esse useEffect é responsavel por verificar alterações no context wishlist e atualizar a pagina caso exista
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
  }, [wishlist]);

  // O useFocusEffect garante que sempre que a rota for alterada para 'Produtos' sera realizado o loading das informações
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

  // chama a busca dos produtos
  const onRefresh = async () => {
    setLoading(true);
    await fetchProducts();
    setLoading(false);
  };

  return (
    //recebe o provider do context wishlist
    //refreshControl é o gesto de recarregar os dados ao fazer o gest de deslizar a tela pra baixo
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
