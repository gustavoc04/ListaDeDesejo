import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{product.nome}</Text>
      <Image
        source={{ uri: product.urlImagem }}
        style={styles.image}
      />
      <Text>{product.description}</Text>
    </View>
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
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default ProductCard;
