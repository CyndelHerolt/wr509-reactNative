import React, {useState, useEffect} from 'react';
import Home from './views/Home';
import Detail from './views/Detail';
import Team from './views/Team';
import Settings from './views/Settings';
import SearchScreen from './components/SearchScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PokemonContext} from './context/PokemonContext';
import Icon from 'react-native-vector-icons/Ionicons';
import loadAllPokemons from './methods/loadAllPokemons';
import {PokemonTeamProvider} from './context/PokemonTeamContext';

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
    const [allPokemons, setAllPokemons] = useState([]);

    useEffect(() => {
        loadAllPokemons().then(pokemons => {
            setData(pokemons.slice(0, 20));
            setAllPokemons(pokemons);
        });
    }, []);

    const loadMorePokemons = () => {
        if (data.length < allPokemons.length) {
            const morePokemons = allPokemons.slice(data.length, data.length + 20);
            setData([...data, ...morePokemons]);
        }
    };

    return (
        <PokemonContext.Provider value={{data, allPokemons, loadMorePokemons}}>
            <PokemonTeamProvider>
                <NavigationContainer>
                    <MyTabs/>
                </NavigationContainer>
            </PokemonTeamProvider>
        </PokemonContext.Provider>
    );
}
