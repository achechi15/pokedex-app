/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */

import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemon/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNamesWithId, getPokemonsByIds } from '../../../actions/pokemons';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();

    const [term, setTerm] = useState<string>('');
    const debouncedValue = useDebouncedValue();

    const { isLoading, data: pokemonNameList = []} = useQuery({
        queryKey: ['pokemons', 'all'],
        queryFn: () => getPokemonNamesWithId(),
    });

    const pokemonNameIdList = useMemo( () => {
        // Es un número
        if ( !isNaN(Number(debouncedValue)) ) {
            const Pokemon = pokemonNameList.find( Pokemon => Pokemon.id === Number(debouncedValue))
            return Pokemon ? [Pokemon] : [];
        }

        if (debouncedValue.length === 0) return [];

        if ( debouncedValue.length < 3) return [];

        return pokemonNameList.filter( poke => poke.name.includes(debouncedValue.toLocaleLowerCase()));


    }, [debouncedValue]);

    const { isLoading: isLoadingPokemons, data: Pokemons = []} = useQuery({
        queryKey: ['pokemons', 'by', pokemonNameIdList],
        queryFn: () => getPokemonsByIds(pokemonNameIdList.map( poke => poke.id)),
        staleTime: 1000 * 60 * 5,
    });

    if(isLoading) return <FullScreenLoader />;


    return (
        <View style={[ globalTheme.globalMargin, { paddingTop: top + 20}]}>
            <TextInput
                placeholder="Buscar pokemon"
                mode="flat"
                autoFocus
                autoCorrect={ false }
                onChangeText={ value => setTerm(value)}
            />


            { isLoadingPokemons &&
            <ActivityIndicator
                style={{ paddingTop: 20 }}
            />
            }
            <FlatList
                data={ Pokemons }
                keyExtractor={(item: pokemon, index: number) => `${item.id}-${index}`}
                numColumns={2}
                renderItem={ ({ item }) => <PokemonCard pokemon={ item } />}
                showsVerticalScrollIndicator={ false }
                ListFooterComponent={ <View style={{ height: 100 }} />}
            />
        </View>
    );
};

