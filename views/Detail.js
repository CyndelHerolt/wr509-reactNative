import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import baseImage from "../assets/pokeball.png";
import bgImage from "../assets/pokeballBg.png";
import SpeciesDetails from '../components/SpeciesDetails';
import tinycolor from "tinycolor2";
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Detail({route}) {
    const {pokemonData, image, color} = route.params;
    const colorType = tinycolor(color).darken(10).toString();
    const navigation = useNavigation();

    const species = pokemonData.species.name;
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${species}`;

    const sprites = Object.values(pokemonData.sprites).filter(sprite => sprite);
    const spritesNames = Object.keys(pokemonData.sprites).filter(sprite => sprite);

    console.log(pokemonData.species);

    return (
        <View style={{flex:1, backgroundColor: color}}>
            <ImageBackground source={bgImage} style={styles.imageBg}>
                <View style={styles.btnActions}>
                    <TouchableOpacity style={[styles.btn, {backgroundColor: colorType}]}
                                      onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={20} color="#fff"/>
                    </TouchableOpacity>
                    {/*todo: ajouter à l'équipe onPress -> localStorage*/}
                    <TouchableOpacity style={[styles.btn, {backgroundColor: colorType}]}
                                      onPress={() => navigation.goBack()}>
                        <Icon name="heart-outline" size={20} color="#fff"/>
                    </TouchableOpacity>
                </View>
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
            <ScrollView style={[styles.containerBody]}>
                <SpeciesDetails speciesUrl={speciesUrl} />
            </ScrollView>
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
        paddingBottom: 50,
    },
    image: {
        width: 150,
        height: 150,
        position: 'absolute',
        bottom: -60,
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
        fontSize: 25,
        fontWeight: "bold",
        color: '#fff',
        textTransform: 'capitalize',
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
    btnActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btn: {
        marginTop: 20,
        marginHorizontal: 20,
        borderRadius: 50,
        padding: 10,
    },
    containerBody: {
        flexDirection: "column",
        paddingHorizontal: 25,
        paddingTop: 50,
        backgroundColor: '#fff',
    },
    textBody: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#000',
        textTransform: 'capitalize',
    },
});