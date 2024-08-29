
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { StackRootParams } from '../../Navigation/StackNavigator';
import { Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { pokemon } from '../../../domain/entities/pokemon';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemon/PokemonCard';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();


    //* Esta es la forma más simple de hacerlo y one-time usage
    // const { isLoading, data: pokemons = [] } = useQuery({
    //     queryKey: ['pokemons'],
    //     queryFn: () => getPokemons(0),
    //     staleTime: 1000 * 60 * 60,
    // });

    const queryClient = useQueryClient();

    console.log({queryClient});

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        queryFn: async (params) =>  {
            const pokemons = await getPokemons(params.pageParam);
            pokemons.forEach( poke => {
                queryClient.setQueryData(['pokemon', poke.id], poke);
            });

            return pokemons;
        },
        getNextPageParam: (lastPage, pages) => pages.length,
        staleTime: 1000 * 60 * 60,
    });

    return (
        <View style={ globalTheme.globalMargin }>
            <PokeballBg style={ styles.imgPosition } />
            {
                isLoading ? <ActivityIndicator style={{ justifyContent: 'center', alignItems: 'center'}} /> : (
                    <FlatList
                        data={ data?.pages.flat() }
                        keyExtractor={(item: pokemon, index: number) => `${item.id}-${index}`}
                        numColumns={2}
                        ListHeaderComponent={ () => <Text variant="displayMedium">Pokedex</Text>}
                        ListHeaderComponentStyle={{ marginTop: top + 20}}
                        renderItem={ ({ item }) => <PokemonCard pokemon={ item } />}
                        onEndReachedThreshold={0.6}
                        onEndReached={ () => fetchNextPage() }
                        showsVerticalScrollIndicator={ false }
                    />
                )
            }

        </View>
    );
};

const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100,
    },
});

