import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti'; // Importar MotiView da biblioteca Moti
import FavoriteButton from './FavoriteButton';
import { useNavigation } from '@react-navigation/native';
import { WishlistProvider } from '../contexts/WishlistContext';

const ProductCard = ({ product, loading }) => {
  const navigation = useNavigation();

  // Ao ser acionado troca a rota para ProductDetails, que é uma stacknavigation
  const handlePress = () => {
    navigation.navigate('ProductDetails', { productId: product.produtoId });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}> 
    <MotiView //animação de loadign do card
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 1000 }}
      style={{ opacity: loading ? 0 : 1 }}
    >
      <Image
        source={{ uri: product.urlImagem }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {product.nome}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.price}>R$ {product.preco}</Text>
        <WishlistProvider>
        <FavoriteButton productId={product.produtoId} />
        </WishlistProvider>
      </View>
    </MotiView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  textContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#333',
  },
});

export default ProductCard;
