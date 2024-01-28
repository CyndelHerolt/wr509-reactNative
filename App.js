import React, {useState, useEffect} from 'react';
import getPokemons from './methods/getPokemons';
import Home from './views/Home';
import Detail from './views/Detail';
import Team from './views/Team';
import Settings from './views/Settings';
import SearchScreen from './components/SearchScreen';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PokemonContext} from './PokemonContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Detail" component={Detail}/>
            <Stack.Screen name="Team" component={Team}/>
        </Stack.Navigator>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Pokedex"
                        component={HomeStack}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <Icon name="home" color={color} size={size}/>
                            ),
                        }}/>
            <Tab.Screen name="Search"
                        component={SearchScreen}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <Icon name="search" color={color} size={size}/>
                            ),
                        }}/>
            <Tab.Screen name="Team"
                        component={Team}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <Icon name="list-outline" color={color} size={size}/>
                            ),
                        }}/>
            <Tab.Screen name="Settings"
                        component={Settings}
                        options={{
                            tabBarIcon: ({color, size}) => (
                                <Icon name="cog-outline" color={color} size={size}/>
                            ),
                        }}/>
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
        <PokemonContext.Provider value={{data, loadMorePokemons}}>
            <NavigationContainer>
                <MyTabs/>
            </NavigationContainer>
        </PokemonContext.Provider>
    );
}
