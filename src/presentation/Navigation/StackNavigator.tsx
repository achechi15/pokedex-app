
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from '../screens/home/HomeScreen';
import { PokemonScreen } from '../screens/pokemon/PokemonScreen';
import { SearchScreen } from '../screens/search/SearchScreen';


export type StackRootParams = {
    Home: undefined;
    Pokemon: { pokemonId: number };
    Search: undefined;
}

export const StackNavigator = () => {

    const Stack = createStackNavigator<StackRootParams>();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Home" component={ HomeScreen } />
            <Stack.Screen name="Pokemon" component={ PokemonScreen } />
            <Stack.Screen name="Search" component={ SearchScreen } />
        </Stack.Navigator>
    );
};

