import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen.js';
import NewPillScreen from '../screens/NewPillScreen.js';
import CheckPillScreen from '../screens/CheckPillScreen.js';
import NotificationsScreen from '../screens/NotificationsScreen.js';

const Stack = createStackNavigator();

function HomeStack () {
    return (
        <Stack.Navigator intialRouteName = 'Home'
                         screenOptions={{
                             headerShown: false,
                         }}>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='NewPill' component={NewPillScreen}/>
          <Stack.Screen name='CheckPill' component={CheckPillScreen}/>
          <Stack.Screen name='Notifications' component={NotificationsScreen}
                        options={{ animationEnabled: false }}
          />
        </Stack.Navigator>
      );
}

export default HomeStack;
