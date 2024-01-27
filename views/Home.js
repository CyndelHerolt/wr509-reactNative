// Home.js
import React, { useContext } from 'react';
import {View, FlatList} from 'react-native';
import TilePokemon from '../components/TilePokemon';
import { PokemonContext } from '../PokemonContext';

export default function Home() {
  const { data, loadMorePokemons } = useContext(PokemonContext);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <TilePokemon pokemon={item} />}
        onEndReached={loadMorePokemons}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}