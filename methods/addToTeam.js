import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';

export default async function addToTeam(pokemonData, image, color) {
    try {
        let teamPokemons = await AsyncStorage.getItem('teamPokemons');
        teamPokemons = teamPokemons == null ? [] : JSON.parse(teamPokemons);

        if (teamPokemons.length >= 6) {
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

        teamPokemons.push(newPokemon);

        await AsyncStorage.setItem('teamPokemons', JSON.stringify(teamPokemons));
    } catch (e) {
        console.error(e);
    }
}