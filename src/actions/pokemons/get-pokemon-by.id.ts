import { pokeApi } from "../../config/api/pokeApi";
import { pokemon } from "../../domain/entities/pokemon";
import { PokeAPIPokemon } from "../../infrastructure/interfaces/pokeApi.interfaces";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";

export const getPokemonById = async(id: number): Promise<pokemon> =>  {
    try {

        const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`);
        const Pokemon = await PokemonMapper.PokeApiPokemonToEntity(data);
        return Pokemon;

    } catch(error) {
        console.log(error);
        throw new Error('Error fetching pokemon by id');
    }
}

