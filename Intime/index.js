/**
 * @format
 */

import React from 'react';
import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  console.log(remoteMessage?.data?.link.toLowerCase());
  remoteMessage?.data?.link &&
    Linking.openURL(remoteMessage.data.link.toLowerCase());
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

import PushNotification, {Importance} from 'react-native-push-notification';
AppRegistry.registerComponent(appName, () => HeadlessCheck);
PushNotification.deleteChannel('1');
PushNotification.createChannel(
  {
    channelId: '1', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: 'alarm', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`createChannel returned '${created}'`),
); // (optional) callback returns whether the channel was created, false means it already existed.
