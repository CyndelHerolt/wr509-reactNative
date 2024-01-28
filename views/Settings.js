import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Generations from '../components/GenSettings';
import Types from '../components/TypeSettings';

const Tab = createMaterialTopTabNavigator();

export default function Settings() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Generations" component={Generations} />
            <Tab.Screen name="Types" component={Types} />
        </Tab.Navigator>
    );
}