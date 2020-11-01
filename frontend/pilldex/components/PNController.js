import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
//import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { View } from 'react-native';

function PNController() {
  /*useEffect(() => {
    console.log('PNController props:', props);
  }, [props]);*/

  useEffect(() => {
    console.log('PNController mount');
    PushNotification.configure({
      onRegister: (token) => {
        console.log('TOKEN:', token);
      },
      onNotification: (notification) => {
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
        console.log('NOTIFICATION:', notification);
      },
      onAction: (notification) => {
        console.log('ACTION:', notification.action);
      },
      onRegistrationError: (error) => {
        console.log(error);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: false,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    PushNotification.createChannel(
    {
      channelId: "notifications", // (required)
      channelName: "notifications", // (required)
      channelDescription: "A channel for your notifications", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  }, []);

  return <View />;
};

export const displayNotification = (message) => {
  PushNotification.localNotification({
    channelId: "notifications",
    title: "Pill Reminder",
    message: message,
    playSound: false,
    autoCancel: true,
    actions: ['Accept', 'Reject'],
    ignoreInForeground: false,
    playSound: false,
    showWhen: true,
  });
};

export default PNController;
