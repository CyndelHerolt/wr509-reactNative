import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';
import {useEffect} from "react";
import Detail from "../views/Detail";

export default async function addToTeam(pokemonData, image, color) {
    try {
        let favoritePokemons = await AsyncStorage.getItem('favoritePokemons');
        favoritePokemons = favoritePokemons == null ? [] : JSON.parse(favoritePokemons);

        if (favoritePokemons.length >= 6) {
            Alert.alert(
                "Équipe complète",
                "You can only have 6 pokemons in your team.",
                [
                    { text: "OK" }
                ]
            );
            return;
        }

        const newPokemon = {
            id: pokemonData.id,
            name: pokemonData.name,
            image: image,
            color: color
        };

        favoritePokemons.push(newPokemon);

        await AsyncStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons));
    } catch (e) {
        console.error(e);
    }
}