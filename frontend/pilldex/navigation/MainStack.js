import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

/* screens */
import HomeStack from './HomeStack.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import PillboxScreen from '../screens/PillboxScreen.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
      <Tab.Navigator
         initialRouteName = 'Home'
         tabBarOptions={{
           activeTintColor:"#fff",
           inactiveTintColor: "#E5E5E5",
           labelStyle: {
             fontSize: 15,
             paddingBottom: 10
           },
           style: {
             backgroundColor: '#84C0C6',
             height: 72,
             paddingTop: 10
           }
         }}
         >
       <Tab.Screen name='Profile' component={ProfileScreen}
                   options = {{
                     tabBarLabel: 'Profile',
                     tabBarIcon: ({ color }) => (
                     <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                      ),
                    }}
                   />
       <Tab.Screen name='Home' component={HomeStack}
                   options = {{
                     tabBarLabel: 'Home',
                     tabBarIcon: ({ color }) => (
                     <MaterialCommunityIcons name="home" color={color} size={26} />
                      ),
                    }}
                   />
       <Tab.Screen name='Pillbox' component={PillboxScreen}
                   options = {{
                     tabBarLabel: 'Pillbox',
                     tabBarIcon: ({ color }) => (
                     <Fontisto name="pills" color={color} size={26} />
                      ),
                    }}
                   />
     </Tab.Navigator>
  );
}

export default MainStack;
