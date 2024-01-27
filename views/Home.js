// Home.js
import React, { useContext, useState } from 'react';
import {View, FlatList, TextInput, Text} from 'react-native';
import TilePokemon from '../components/TilePokemon';
import { PokemonContext } from '../PokemonContext';

export default function Home({showSearch = false}) {
  const { data, loadMorePokemons } = useContext(PokemonContext);
  const [searchValue, setSearchValue] = useState('');

  const filteredData = data.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
  );

    return (
        <View style={styles.app}>
            {showSearch && (
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search..."
                    onChangeText={text => setSearchValue(text)}
                    value={searchValue}
                />
            )}
            {filteredData.length === 0 && searchValue !== '' ? (
                <Text style={styles.error}>There isn't any Pokemon with this name !</Text>
            ) : (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <TilePokemon pokemon={item} />}
                    onEndReached={loadMorePokemons}
                    onEndReachedThreshold={0.5}
                />
            )}
        </View>
    );
}

const styles = {
    searchBar: {
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: .3,
        borderColor: '#b9b9b9',
        borderRadius: 10,
    },
    error: {
        textAlign: 'center',
        color: 'red',
    },
}