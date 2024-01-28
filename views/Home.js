import React, { useContext, useState, useEffect, useRef } from 'react';
import {View, FlatList, TextInput, Text, Animated, Easing} from 'react-native';
import TilePokemon from '../components/TilePokemon';
import { PokemonContext } from '../context/PokemonContext';

export default function Home({showSearch = false}) {
    const { data, allPokemons, loadMorePokemons } = useContext(PokemonContext);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const spinValue = useRef(new Animated.Value(0)).current;

    // First set up animation
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        )
    ).start();

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    useEffect(() => {
        if (data.length > 0) {
            setIsLoading(false);
        }
    }, [data]);

    const filteredData = allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <View style={styles.app}>
            {isLoading ? (
                <Animated.Image
                    style={{...styles.spinner, transform: [{rotate: spin}]}}
                    source={require('../assets/pokeball.png')}
                />
            ) : (
                <>
                    {showSearch && (
                        <TextInput
                            style={styles.searchBar}
                            placeholder="Search..."
                            onChangeText={text => setSearchValue(text)}
                            value={searchValue}
                        />
                    )}
                    {filteredData.length === 0 && searchValue !== '' ? (
                        <Text style={styles.error}>There isn't any Pokemon with this name !</Text>
                    ) : (
                        <FlatList
                            data={searchValue ? filteredData : data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => <TilePokemon pokemon={item} />}
                            onEndReached={loadMorePokemons}
                            onEndReachedThreshold={0.5}
                        />
                    )}
                </>
            )}
        </View>
    );
}

const styles = {
    searchBar: {
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: .3,
        borderColor: '#b9b9b9',
        borderRadius: 10,
    },
    error: {
        textAlign: 'center',
        color: 'red',
    },
    spinner: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 100,
    },
}