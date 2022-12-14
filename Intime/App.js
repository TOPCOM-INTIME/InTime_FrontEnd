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
import LoadingBar from './components/LoadingBar';

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
      InvitationScreen: 'invitation',
    },
  },
};
function App() {
  return (
    <>
      <UserContextProvider>
        <LogContextProvider>
          <NavigationContainer linking={linking} fallback={<LoadingBar />}>
            <RootStack />
          </NavigationContainer>
        </LogContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
