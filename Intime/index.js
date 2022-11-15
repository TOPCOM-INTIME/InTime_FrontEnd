/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import PushNotification, {Importance} from 'react-native-push-notification';
AppRegistry.registerComponent(appName, () => App);
PushNotification.deleteChannel('1');
PushNotification.createChannel(
  {
    channelId: '1', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: 'alarm.mp3', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`createChannel returned '${created}'`),
); // (optional) callback returns whether the channel was created, false means it already existed.
