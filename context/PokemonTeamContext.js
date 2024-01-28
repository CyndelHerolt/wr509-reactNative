import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PokemonTeamContext = createContext();

export const PokemonTeamProvider = ({ children }) => {
    const [teamPokemons, setTeamPokemons] = useState([]);

    const fetchTeamPokemons = async () => {
        let storedPokemons = await AsyncStorage.getItem('teamPokemons');
        storedPokemons = storedPokemons == null ? [] : JSON.parse(storedPokemons);
        setTeamPokemons(storedPokemons);
    };

    const addPokemonToTeam = async (pokemon) => {
        const newTeamPokemons = [...teamPokemons, pokemon];
        await AsyncStorage.setItem('teamPokemons', JSON.stringify(newTeamPokemons));
        setTeamPokemons(newTeamPokemons);
    };

    const removePokemonFromTeam = async (pokemon) => {
        const newTeamPokemons = teamPokemons.filter(p => p.id !== pokemon.id);
        await AsyncStorage.setItem('teamPokemons', JSON.stringify(newTeamPokemons));
        setTeamPokemons(newTeamPokemons);
    };

    useEffect(() => {
        fetchTeamPokemons();
    }, []);

    return (
        <PokemonTeamContext.Provider value={{ teamPokemons, addPokemonToTeam, removePokemonFromTeam }}>
            {children}
        </PokemonTeamContext.Provider>
    );
};