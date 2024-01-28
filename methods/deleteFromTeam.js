import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function deleteFromTeam(pokemonId) {
    try {
        let teamPokemons = await AsyncStorage.getItem('teamPokemons');
        teamPokemons = teamPokemons == null ? [] : JSON.parse(teamPokemons);

        const newTeamPokemons = teamPokemons.filter(pokemon => pokemon.id !== pokemonId);

        await AsyncStorage.setItem('teamPokemons', JSON.stringify(newTeamPokemons));
    } catch (e) {
        console.error(e);
    }
}