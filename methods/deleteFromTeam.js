import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function deleteFromTeam(pokemonId) {
    try {
        let favoritePokemons = await AsyncStorage.getItem('favoritePokemons');
        favoritePokemons = favoritePokemons == null ? [] : JSON.parse(favoritePokemons);

        const newFavoritePokemons = favoritePokemons.filter(pokemon => pokemon.id !== pokemonId);

        await AsyncStorage.setItem('favoritePokemons', JSON.stringify(newFavoritePokemons));
    } catch (e) {
        console.error(e);
    }
}