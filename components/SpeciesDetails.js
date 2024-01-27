import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
import styleSheet from "react-native-web/src/exports/StyleSheet";

export default function SpeciesDetails({ speciesUrl }) {
  const [speciesData, setSpeciesData] = useState(null);

  console.log(speciesData);

  useEffect(() => {
    fetch(speciesUrl)
      .then(response => response.json())
      .then(data => setSpeciesData(data));
  }, [speciesUrl]);

  if (!speciesData) {
    return null; // todo: afficher un loader
  }

    const firstEntry = speciesData.flavor_text_entries[0];

    const dataItems = [
        { key: 'Color', value: speciesData.color.name },
        { key: 'Habitat', value: speciesData.habitat.name },
        { key: 'Generation', value: speciesData.generation.name },
        { key: 'Shape', value: speciesData.shape.name },
        { key: 'Capture rate', value: speciesData.capture_rate },
        { key: 'Base happiness', value: speciesData.base_happiness },
        { key: 'Growth rate', value: speciesData.growth_rate.name },
        { key: 'Egg groups', value: speciesData.egg_groups.map(eggGroup => eggGroup.name).join(', ') },
        { key: 'Evolves from', value: speciesData.evolves_from_species ? speciesData.evolves_from_species.name : 'none' },
        { key: 'Hatch counter', value: speciesData.hatch_counter },
    ];

    return (
    <ScrollView style={[styles.dataContainer]}>
        <Text style={styles.description}>{firstEntry.flavor_text.replace(/\n/g, ' ')}</Text>
        <View style={[styles.dataList]}>
            {dataItems.map((item, index) => (
                <View style={styles.dataItem} key={index}>
                    <Text style={styles.dataListKey}>{item.key}</Text>
                    <Text style={styles.dataListValue}>{item.value}</Text>
                </View>
            ))}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    dataContainer: {
        paddingBottom: 100,
    },
    dataList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    dataItem: {
        width: '48%',
        marginBottom: 10,
    },
    dataListKey: {
        fontWeight: 'bold',
    },
    dataListValue: {
        borderWidth: .3,
        borderColor: '#b9b9b9',
        padding: 5,
        marginTop: 5,
        borderRadius: 10,
        textAlign: 'center',
    },
    description: {
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
        backgroundColor: '#f3f3f3',
        padding: 10,
        borderRadius: 10,
    },
});