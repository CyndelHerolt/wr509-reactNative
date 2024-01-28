import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import TeamPokemon from "../components/TeamPokemon";
import {PokemonTeamContext} from '../context/PokemonTeamContext';

export default function Team() {
    // const [teamPokemons, setTeamPokemons] = useState([]);
    const {teamPokemons} = useContext(PokemonTeamContext);
    const [isManagingTeam, setIsManagingTeam] = useState(false);

    return (
        <View>
            <Button title="Manage Team" onPress={() => setIsManagingTeam(!isManagingTeam)}/>
            <ScrollView contentContainerStyle={styles.team}>
                {teamPokemons.map((pokemon, index) => (
                    <View key={index}>
                        <TeamPokemon
                            key={index}
                            pokemon={pokemon}
                            color={pokemon.color}
                            image={pokemon.image}
                            isManagingTeam={isManagingTeam}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    team: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 50,
    },
});