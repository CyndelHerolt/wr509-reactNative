import React, {useState, useEffect} from 'react';
import {Image, Text, ImageBackground} from "react-native";
import {StyleSheet} from "react-native";
import {TouchableOpacity, View} from "react-native";
import baseImage from "../assets/pokeball.png";
import bgImage from "../assets/pokeballBg.png";
import tinycolor from 'tinycolor2';
import { useNavigation } from '@react-navigation/native';

function getColorByType(type) {

    switch (type) {
        case 'fire':
            return '#ea6e6e';
        case 'grass':
            return '#73d0a6';
        case 'electric':
            return '#fcee79';
        case 'water':
            return '#7fc7e7';
        case 'bug':
            return '#a6c86a';
        case 'normal':
            return '#b5b9c4';
        case 'poison':
            return '#b97fc9';
        case 'ground':
            return '#f7de3f';
        case 'fairy':
            return '#ff9ce2';
        case 'fighting':
            return '#ea6e6e';
        case 'psychic':
            return '#f3668c';
        case 'rock':
            return '#c9bb8a';
        case 'ghost':
            return '#7b62a3';
        case 'ice':
            return '#74cec0';
        case 'dragon':
            return '#5a6bd4';
        case 'dark':
            return '#707070';
        case 'steel':
            return '#9eb7b8';
        default:
            return '#f2f2f2';
    }
}

export default function TilePokemon({pokemon}) {
    const [pokemonData, setPokemonData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetch(pokemon.url)
            .then(response => response.json())
            .then(data => setPokemonData(data));
    }, [pokemon.url]);

    if (!pokemonData) {
        return null; // todo: ajouter un spinner
    }

    // console.log(pokemonData.types)

    const color = getColorByType(pokemonData.types[0].type.name);
    const colorType = tinycolor(getColorByType(pokemonData.types[0].type.name)).darken(10).toString();


    return (
            <TouchableOpacity
                style={[styles.container, {backgroundColor: color}]}
                onPress={() => navigation.navigate('Detail', { pokemonData, image: pokemon.image, color })}
            >
                <ImageBackground source={bgImage} style={styles.imageBg}>

                </ImageBackground>
                <View style={styles.containerText}>
                    <View style={styles.name}>
                        <Text style={styles.text}>#{pokemonData.id}</Text>
                        <Text style={styles.text}>{pokemon.name}</Text>
                    </View>
                    <View style={styles.pillType}>
                        {pokemonData.types.map((type, index) => (
                            <Text key={index} style={[styles.type, {backgroundColor: colorType}]}>
                                {type.type.name}
                            </Text>
                        ))}
                    </View>
                </View>
                <View style={styles.containerImage}>
                    {pokemon.image ?
                        (<Image style={styles.image} source={{uri: pokemon.image}}/>) :
                        (<Image style={styles.image} source={baseImage}/>)
                    }
                </View>

            </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        borderRadius: 10,
        margin: 20,
        color: '#fff',
    },
    imageBg: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        borderRadius: 10,
    },
    containerImage: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        paddingRight: 40,
    },
    containerText: {
        flex: 2,
        height: 150,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
    },
    image: {
        width: 150,
        height: 150,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff',
        textTransform: 'capitalize',
    },
    name: {
        flexDirection: 'column',
        alignItems: 'start',
    },
    pillType: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    type: {
        color: '#fff',
        borderRadius: 10,
        padding: 5,
        width: 70,
        marginVertical: 5,
        marginRight: 5,
        textAlign: 'center',
    },
});
