import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Edit from './Edit';
import Add from "./Add";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddBook" component={Add} />
                <Stack.Screen name="EditBook" component={Edit} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
