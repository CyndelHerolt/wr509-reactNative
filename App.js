import React, { useState, useEffect } from 'react';
import getPokemons from './methods/getPokemons';
import Home from './views/Home';
import Detail from './views/Detail';
import {View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PokemonContext } from './PokemonContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPokemons().then(pokemons => setData(pokemons));
  }, []);

  const loadMorePokemons = () => {
    getPokemons(data.length).then(morePokemons => setData([...data, ...morePokemons]));
  };

  return (
    <PokemonContext.Provider value={{ data, loadMorePokemons }}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </PokemonContext.Provider>
  );
}

const styles = StyleSheet.create({

});