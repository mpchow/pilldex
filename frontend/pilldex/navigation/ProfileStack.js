import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ProfileScreen from '../screens/ProfileScreen.js';
import SchedulerScreen from '../screens/SchedulerScreen.js';

const Stack = createStackNavigator();

function ProfileStack(propName) {
    return (
        <Stack.Navigator intialRouteName = 'Profile'
                         screenOptions={{
                             headerShown: false
                         }}>
          <Stack.Screen name='Profile' component={ProfileScreen}/>
          <Stack.Screen name='Scheduler' component={SchedulerScreen}/>
        </Stack.Navigator>
      );
}

export default ProfileStack;
