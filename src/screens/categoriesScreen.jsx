import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import CategoriesCard from '../components/CategoriesCard';
import { getCategory } from '../utils/http';

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  // usa a funcao getCategory para fazer a busca de todas as categorias existentes para serem escolhidas como filtro
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  //lida com o click sobre uma categforia, recebendo seu id e nome e trocando a rota para 'CategoryProducts'
  const handleCategoryPress = (categoryId, categoryName) => {
    navigation.navigate('CategoryProducts', { categoryId, categoryName });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {categories.length > 0 ? (
        categories.map((category) => (
          <CategoriesCard 
            key={category.categoriaId} 
            category={category} 
            onPress={() => handleCategoryPress(category.categoriaId, category.nome)} 
          />
        ))
      ) : (
        <Text>Nenhuma categoria disponivel</Text>
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

export default CategoriesScreen;
