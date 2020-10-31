import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import App from './App';
import {name as appName} from './app.json';

// Register background handler
firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  //displayNotification(remoteMessage.notification.body);
});

AppRegistry.registerComponent(appName, () => App);
