import { pokemon } from "../../domain/entities/pokemon";
import { getPokemonById } from "./get-pokemon-by.id";

export const getPokemonsByIds = async(ids: number[]): Promise<pokemon[]> => {
    try {
        const pokemonsPromises: Promise<pokemon> [] = ids.map( id => getPokemonById(id));
        return Promise.all( pokemonsPromises );
    } catch(error) {
        throw new Error('Error fetching pokemons by ids');
    }
};
