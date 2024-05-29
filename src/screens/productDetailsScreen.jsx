import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCategory, getProductsByCategory } from '../utils/http';
import FavoriteButton from '../components/FavoriteButton';
import { WishlistProvider } from '../contexts/WishlistContext';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const ProductScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const navigation = useNavigation();

  // o fetchProducts faz a busca de todos os produtos para serem exibidos na tela de produtos.
  // Primeiro é chamado a função getCategory para salvar todas as categorias em um array de categorias
  // Depois é feito um for, chamando a função getProdutcsByCategory para cada categoria do vetor categorias
  // e salvando todos os produtos em um array de produtos para serem exibidos na tela e é realizada a filtragem
  // para exibir apenas o produto com o id selecionado por meio dos metodo find, passando o objeto salvo em selectedProduct
  // para o state product e exibindo seus atributos (nome, imagem e preco) na tela 
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

        const selectedProduct = allProducts.find(prod => prod.produtoId === productId);
        setProduct(selectedProduct);
      
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [productId]);

  // é chamado o componente FavoriteButton que recebe o WishlistProvider e lida com a funcao de adicionar e remover item da lista de favoritos
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {product ? (
        <View style={styles.container}>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <WishlistProvider>
              <FavoriteButton productId={product.produtoId} style={styles.favoriteButton}/>
            </WishlistProvider>
          </View>
          <Image
            source={{ uri: product.urlImagem }}
            style={styles.image}
          />
          <View style={styles.productInfo}>
            <Text style={styles.name}>{product.nome}</Text>
            <Text style={styles.price}>R$ {product.preco}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Carregando...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtons: {
    position: 'absolute',
    top: '8%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '8%',
    zIndex: 1,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginRight:'25%'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  backButton: {
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    textAlign: 'center',
  },
  image: {
    width: '90%',
    height: '40%',
    marginBottom: 16,
    marginTop: '35%',
    borderRadius: 10
  },
  favoriteButton: {
    zIndex: 1,
  },
});

export default ProductScreen;
