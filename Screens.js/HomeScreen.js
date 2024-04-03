import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import useFetchBooks from './useFetchBooks';

const HomeScreen = () => {
  const { books, loading } = useFetchBooks();
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('English');
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleDirection = () => {
    setIsRTL(!isRTL);
    setLanguage(language === 'English' ? 'Urdu' : 'English');
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.title}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Author: {item.author.name}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { direction: isRTL ? 'rtl' : 'ltr' }]}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Button title={isRTL ? 'LTR' : 'RTL'} onPress={handleToggleDirection} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by book name"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      </View>
      <FlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <View style={styles.languageContainer}>
        <Text>Language: {language}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cfff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '',
    borderWidth: 1,
    marginLeft: 10, // Adjusted marginLeft instead of marginRight
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;
