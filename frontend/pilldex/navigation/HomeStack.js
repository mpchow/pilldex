import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen.js';
import NewPillScreen from '../screens/NewPillScreen.js';
import CheckPillScreen from '../screens/CheckPillScreen.js';
import NotificationsScreen from '../screens/NotificationsScreen.js';
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();

function HomeStack () {
  useEffect(() => {
    // foreground notification
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // notification while app is in background mode
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // notification while app is in quit mode
    messaging()
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
