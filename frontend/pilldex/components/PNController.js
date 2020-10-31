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
  }, []);

  return <View />;
};

export const displayNotification = (message) => {
  PushNotification.localNotification({
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
