import { pokeApi } from "../../config/api/pokeApi";
import { pokemon } from "../../domain/entities/pokemon";
import { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../../infrastructure/interfaces/pokeApi.interfaces";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";

export const getPokemons = async(page: number, limit: number = 20): Promise<pokemon[]> => {

    try {
        const url = `/pokemon?offset=${page * 20}&limit=${limit}`;
        const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

        const pokemonPromise = data.results.map( info => {
            return pokeApi.get<PokeAPIPokemon>(info.url);
        });

        const pokeApiPokemons = await Promise.all(pokemonPromise);
        const pokemonsPromises = pokeApiPokemons.map( async poke => await PokemonMapper.PokeApiPokemonToEntity(poke.data));

        return await Promise.all(pokemonsPromises);
    } catch (error) {
        console.log('error');
        throw new Error('Error getting Pokemons');
    }


};


