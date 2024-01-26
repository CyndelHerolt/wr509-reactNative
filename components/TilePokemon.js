import React from "react";
import {Image, Text} from "react-native";
import {StyleSheet} from "react-native";
import {TouchableOpacity, View} from "react-native";
import baseImage from "../assets/pokeball.png";

export default function TilePokemon({pokemon}) {

    return (
        <TouchableOpacity style={styles.container}>

            <View style={styles.containerImage}>
                {pokemon.image ?
                    (<Image style={styles.image} source={{uri: pokemon.image}}/>) :
                    (<Image style={styles.image} source={baseImage}/>)
                }
            </View>
            <View style={styles.containerText}>
                <Text style={styles.text}>{pokemon.name}</Text>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        padding: 10,
        width: 150,
    },
    containerImage: {
        flex: 1,
        alignItems: "center",
    },
    containerText: {
        flex: 2,
    },
    image: {
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});