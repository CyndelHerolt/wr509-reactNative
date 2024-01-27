export default function getPokemons(offset = 0) {
    return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        .then((response) => response.json())
        .then((json) => {
            const promises = json.results.map((pokemon) =>
                fetch(pokemon.url)
                    .then((response) => response.json())
                    .then((pokemonDetails) => {
                        return {...pokemon, image: pokemonDetails.sprites.front_default};
                    })
            );
            return Promise.all(promises);
        })
        .catch((error) => console.error(error));
}