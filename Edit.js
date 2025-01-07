
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation, route }) => {
    const { index } = route.params;
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const loadBook = async () => {
            let data = JSON.parse(await AsyncStorage.getItem('books')) || [];
            setBooks(data);
            const book = data[index];
            setTitle(book.title);
            setIsbn(book.isbn);
            setCopies(book.copies);
            setImage(book.image);
        };
        loadBook();
    }, [index]);

    const saveBook = async () => {
        books[index] = { title, isbn, copies, image };
        await AsyncStorage.setItem('books', JSON.stringify(books));
        navigation.goBack();
    };

    const deleteBook = async () => {
        books.splice(index, 1);
        await AsyncStorage.setItem('books', JSON.stringify(books));
        navigation.goBack();
    };

    return (
        <View>
            <Text>Title:</Text>
            <TextInput value={title} onChangeText={setTitle} />
            <Text>ISBN:</Text>
            <TextInput value={isbn} onChangeText={setIsbn} />
            <Text>Copies:</Text>
            <TextInput value={copies} onChangeText={setCopies} />
            <Text>Image URL:</Text>
            <TextInput value={image} onChangeText={setImage} />
            <Button title="Save Changes" onPress={saveBook} />
            <Button title="Delete Book" onPress={deleteBook} color="red" />
        </View>
    );
};
export default Edit;
