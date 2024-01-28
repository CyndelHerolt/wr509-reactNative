import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import tinycolor from "tinycolor2";
import bgImage from "../assets/pokeballBg.png";
import {ImageBackground} from "react-native";
import {PokemonTeamContext} from "../context/PokemonTeamContext";

export default function TeamPokemon({ pokemon, color, image, isManagingTeam }) {
    const { removePokemonFromTeam, movePokemonUp, movePokemonDown } = useContext(PokemonTeamContext);
    const colorType = tinycolor(color).darken(10).toString();

    return (
        <View style={[styles.CardTeam, {backgroundColor: color, borderColor: colorType}]}>
            <ImageBackground source={bgImage} style={styles.cardContent}>
                <Image source={{uri: image}} style={{width: 120, height: 120}} />
                <Text style={styles.pokemonName}>{pokemon.name}</Text>
            </ImageBackground>
            {isManagingTeam && (
                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: colorType}]} onPress={() => {
                        removePokemonFromTeam(pokemon);
                    }}>
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: colorType}]} onPress={() => {
                        movePokemonUp(pokemon);
                    }}>
                        <Text style={styles.buttonText}>Move Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: colorType}]} onPress={() => {
                        movePokemonDown(pokemon);
                    }}>
                        <Text style={styles.buttonText}>Move Down</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    CardTeam: {
        borderWidth: 10,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    pokemonName: {
        textAlign: 'center',
        padding: 10,
        paddingTop: 0,
        marginRight: 50,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'capitalize',
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
});