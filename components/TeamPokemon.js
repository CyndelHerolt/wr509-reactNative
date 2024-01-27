import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import tinycolor from "tinycolor2";
import bgImage from "../assets/pokeballBg.png";
import {ImageBackground} from "react-native";

export default function TeamPokemon({ pokemon, isManagingTeam }) {
    const colorType = tinycolor(pokemon.color).darken(10).toString();

    return (
        <View style={[styles.CardTeam, {backgroundColor: pokemon.color, borderColor: colorType}]}>
            <ImageBackground source={bgImage} style={styles.imageBg}>
                    <Image source={{uri: pokemon.image}} style={{width: 120, height: 120}} />
                    <Text style={styles.pokemonName}>{pokemon.name}</Text>
            </ImageBackground>
            {isManagingTeam && (
                <View>
                    <TouchableOpacity style={[styles.button, {backgroundColor: colorType}]} onPress={() => {/* TODO: remove pokemon from team */}}>
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: colorType}]} onPress={() => {/* TODO: move pokemon up in the team */}}>
                        <Text style={styles.buttonText}>Move Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: colorType}]} onPress={() => {/* TODO: move pokemon down in the team */}}>
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
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'capitalize',
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
});