import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

/* components */
import HomeStack from './HomeStack.js';
import ProfileStack from './ProfileStack.js';
import PillBoxStack from './PillBoxStack.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  useEffect(() => {
    // foreground notification
    const unsubscribe = firebase.messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // notification while app is in background mode
    firebase.messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // notification while app is in quit mode
    firebase.messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    return unsubscribe;
  }, []);

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
       <Tab.Screen name='Profile' component={ProfileStack}
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
       <Tab.Screen name='Pillbox' component={PillBoxStack}
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
