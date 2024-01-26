// App.js
import React, { useState, useEffect } from 'react';
import getPokemons from './methods/getPokemons';
import Home from './views/Home';
import {View, FlatList, StyleSheet} from 'react-native';
import { PokemonContext } from './PokemonContext';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPokemons().then(pokemons => setData(pokemons));
  }, []);

  const loadMorePokemons = () => {
    getPokemons(data.length).then(morePokemons => setData([...data, ...morePokemons]));
  };

  return (
    <PokemonContext.Provider value={{ data, loadMorePokemons }} style={styles.container}>
      <Home/>
    </PokemonContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
