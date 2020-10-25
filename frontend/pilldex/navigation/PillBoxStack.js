import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PillboxScreen from '../screens/PillboxScreen.js';
import PillInfoScreen from '../screens/PillInfoScreen.js';

const Stack = createStackNavigator();

function PillBoxStack(propName) {
    return (
        <Stack.Navigator intialRouteName = 'PillBox'
                         screenOptions={{
                             headerShown: false
                         }}>
          <Stack.Screen name='PillBox' component={PillboxScreen}/>
          <Stack.Screen name='PillInfo' component={PillInfoScreen}/>
        </Stack.Navigator>
      );
}

export default PillBoxStack;
