import React, { useEffect, useState } from 'react';
import {View, Text, Switch, StyleSheet, ScrollView} from 'react-native';

export default function TypeSettings() {
    const [types, setTypes] = useState([]);
    const [switches, setSwitches] = useState({});

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/type')
            .then(response => response.json())
            .then(data => {
                setTypes(data.results);
                const initialSwitches = data.results.reduce((acc, type) => {
                    acc[type.name] = false;
                    return acc;
                }, {});
                setSwitches(initialSwitches);
            });
    }, []);

    const toggleSwitch = (typeName) => {
        setSwitches(prevSwitches => ({
            ...prevSwitches,
            [typeName]: !prevSwitches[typeName]
        }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {types.map((type) => (
                <View key={type.name} style={styles.panel}>
                    <Text>{type.name}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#4f4f4f" }}
                        thumbColor={switches[type.name] ? "#da5e5e" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => toggleSwitch(type.name)}
                        value={switches[type.name]}
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