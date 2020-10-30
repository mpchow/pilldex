import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SignInScreen from '../screens/SignInScreen.js';
import NewUserScreen from '../screens/NewUserScreen.js';
import SchedulerScreen from '../screens/SchedulerScreen.js';

const Stack = createStackNavigator();

function LoginStack ( ) {
    return (
        <Stack.Navigator intialRouteName = 'SignIn'
                         screenOptions={{
                             headerShown: false
                         }}>
          <Stack.Screen name='SignIn' component={SignInScreen}/>
          <Stack.Screen name='Register' component={NewUserScreen}/>
          <Stack.Screen name='Scheduler' component={SchedulerScreen}/>
        </Stack.Navigator>
      );
}

export default LoginStack;
