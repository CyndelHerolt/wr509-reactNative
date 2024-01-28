export default function loadAllPokemons() {
    let pokemons = [];
    let offset = 0;

    const loadNext = () => {
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
            .then((newPokemons) => {
                pokemons = [...pokemons, ...newPokemons];
                if (newPokemons.length === 20) {
                    offset += 20;
                    return loadNext();
                } else {
                    return pokemons;
                }
            });
    };

    return loadNext();
}