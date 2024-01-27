import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import baseImage from "../assets/pokeball.png";
import bgImage from "../assets/pokeballBg.png";
import tinycolor from "tinycolor2";

export default function Detail({route}) {
    const {pokemonData, image, color} = route.params;
    const colorType = tinycolor(color).darken(10).toString();

    return (
        <View style={{backgroundColor: color}}>
            <ImageBackground source={bgImage} style={styles.imageBg}>
                <View style={[styles.containerHeader]}>
                    <View style={[styles.containerHeaderText]}>
                        <Text style={styles.text}>#{pokemonData.id}</Text>
                        <Text style={styles.textName}>{pokemonData.name}</Text>
                        <View style={styles.pillType}>
                            {pokemonData.types.map((type, index) => (
                                <Text key={index} style={[styles.type, {backgroundColor: colorType}]}>
                                    {type.type.name}
                                </Text>
                            ))}
                        </View>
                    </View>
                    {image ?
                        (<Image style={styles.image} source={{uri: image}}/>) :
                        (<Image style={styles.image} source={baseImage}/>)
                    }
                </View>
            </ImageBackground>
            <View style={[styles.containerBody]}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerHeader: {
        padding: 20,
    },
    containerHeaderText: {
        flexDirection: "column",
        alignItems: 'flex-start',
        paddingBottom: 100,

    },
    image: {
        width: 200,
        height: 200,
        position: 'absolute',
        bottom: -75,
        zIndex: 1,
        alignSelf: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
        opacity: 0.75,
        color: '#fff',
    },
    textName: {
        fontSize: 30,
        fontWeight: "bold",
        color: '#fff',
        textTransform: 'capitalize',
    },
    containerBody: {
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderTopStartRadius: 100,
        borderTopEndRadius: 100,
        backgroundColor: '#fff',
        height: '100%',
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