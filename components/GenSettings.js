import React, { useEffect, useState } from 'react';
import {View, Text, Switch, StyleSheet, ScrollView} from 'react-native';

export default function GenSettings() {
    const [generations, setGenSettings] = useState([]);
    const [switches, setSwitches] = useState({});

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/generation')
            .then(response => response.json())
            .then(data => {
                setGenSettings(data.results);
                const initialSwitches = data.results.reduce((acc, gen) => {
                    acc[gen.name] = false;
                    return acc;
                }, {});
                setSwitches(initialSwitches);
            });
    }, []);

    const toggleSwitch = (generationName) => {
        setSwitches(prevSwitches => ({
            ...prevSwitches,
            [generationName]: !prevSwitches[generationName]
        }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {generations.map((generation) => (
                <View key={generation.name} style={styles.panel}>
                    <Text>{generation.name}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#4f4f4f" }}
                        thumbColor={switches[generation.name] ? "#da5e5e" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => toggleSwitch(generation.name)}
                        value={switches[generation.name]}
                    />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 10,
    },
    panel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
});