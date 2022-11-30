import React, {useEffect} from 'react';
import {Link, NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {UserContextProvider} from './contexts/UserContext';
import {LogContextProvider} from './contexts/LogContext';
import {Text} from '@react-native-material/core';
import messaging from '@react-native-firebase/messaging';
import {Alert, Linking} from 'react-native';
import {API_URL} from '@env';
import PushNotification from 'react-native-push-notification';

// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification);
//     // process the notification
//     const {link = null} = notification?.data || {}; // <---- 1
//     link && Linking.openURL(link.toLowerCase());
//     console.log(link.toLowerCase());
//   },
//   // popInitialNotification: true,
//   // onAction: function (notification) {
//   //   console.log('ACTION:', notification.action);
//   //   console.log('NOTIFICATION:', notification);
//   // },
// });

const linking = {
  prefixes: ['intime://'],
  config: {
    screens: {
      MainTab: {
        screens: {
          일정: 'schedule',
          친구: 'friend',
          패턴: 'pattern',
          리스트: 'list',
          '내 정보': 'info',
        },
      },
      write: 'write',
      ScheduleScreen: 'ScheduleScreen',
      CreateGroup: 'group',
      CommunityScreenAdd: 'community',
      NickName: 'nickname',
      Password: 'password',
    },
  },
};
function App() {
  // Foreground 상태인 경우
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          const link = remoteMessage?.data?.link;
          link && Linking.openURL(link);
        }
      });
    return unsubscribe;
  });
  return (
    <>
      <UserContextProvider>
        <LogContextProvider>
          <NavigationContainer
            linking={linking}
            fallback={<Text>Loading...</Text>}>
            <RootStack />
          </NavigationContainer>
        </LogContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
