import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TeamPokemon from "../components/TeamPokemon";
import TilePokemon from "../components/TilePokemon";

export default function Team() {
    const [favoritePokemons, setFavoritePokemons] = useState([]);
    const [isManagingTeam, setIsManagingTeam] = useState(false);

    useEffect(() => {
        const fetchFavoritePokemons = async () => {
            let pokemons = await AsyncStorage.getItem('favoritePokemons');
            pokemons = pokemons == null ? [] : JSON.parse(pokemons);
            setFavoritePokemons(pokemons);
        };

        fetchFavoritePokemons();
    }, []);

    return (
        <View>
            <Button title="Manage Team" onPress={() => setIsManagingTeam(!isManagingTeam)} />
            <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center', paddingBottom: 70, paddingTop:40}}>
                {favoritePokemons.map((pokemon, index) => (
                    <View key={index}>
                        <TeamPokemon key={index} pokemon={pokemon} isManagingTeam={isManagingTeam}/>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}