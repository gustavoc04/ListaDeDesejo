import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoriesCard = ({ category, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(category.categoriaId)}>
      <Text style={styles.text}>{category.nome}</Text>
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
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoriesCard;