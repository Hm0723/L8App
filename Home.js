import React, { useState } from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    const loadBooks = async () => {
        let data = await AsyncStorage.getItem('books');
        if (data) setBooks(JSON.parse(data));
    };

    loadBooks(); // Load books on every render

    return (
        <View style={styles.container}>
            <Button
                title="New Book"
                onPress={() => navigation.navigate('AddBook')}
                color="#007bff"
            />
            <FlatList
                data={books}
                keyExtractor={(item) => item.isbn}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('EditBook', { index })}
                    >
                        <Image
                            source={{ uri: item.image || 'placeholder.png' }}
                            style={styles.bookImage}
                        />
                        <View style={styles.details}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.text}>ISBN: {item.isbn}</Text>
                            <Text style={styles.text}>Copies Owned: {item.copies}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    bookImage: {
        width: 60,
        height: 90,
        marginRight: 10,
    },
    details: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 14,
        color: '#555',
    },
});

export default Home;
