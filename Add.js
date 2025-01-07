import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('1');
    const [image, setImage] = useState('');

    const addBook = async () => {
        let books = JSON.parse(await AsyncStorage.getItem('books')) || [];
        books.push({ title, isbn, copies, image });
        await AsyncStorage.setItem('books', JSON.stringify(books));
        navigation.goBack();
    };

    return (
        <View>
            <Text>Title:</Text>
            <TextInput value={title} onChangeText={setTitle} />
            <Text>ISBN:</Text>
            <TextInput value={isbn} onChangeText={setIsbn} />
            <Text>Number of Copies:</Text>
            <TextInput value={copies} onChangeText={setCopies} keyboardType="numeric" />
            <Text>Image URL:</Text>
            <TextInput value={image} onChangeText={setImage} />
            <Button title="Save Book" onPress={addBook} />
        </View>
    );
};
export default Add;
