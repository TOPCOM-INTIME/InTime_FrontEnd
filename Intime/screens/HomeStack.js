import axios from 'axios';
import React, {useCallback, useEffect} from 'react';
import {Pressable, Text, StyleSheet, View, Linking, Alert} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import authStorage from '../stroages/authStorage';
import BackgroundService from 'react-native-background-actions';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

const options = {
  taskName: '준비',
  taskTitle: '준비할 시간입니다.',
  taskDesc: '준비하세욧!!!!!!!!!!!!',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'Intime://', // See Deep Linking for more info
  parameters: {
    delay: 1000,
  },
};

function handleOpenURL(evt) {
  console.log(evt.url);
}

Linking.addEventListener('url', handleOpenURL);

function HomeStack() {
  const {user, setUser} = useUserContext();
  const logoutHandler = () => {
    authStorage.remove();
    setUser(null);
  };

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(remoteMessage);
  });

  // Foreground 상태인 경우
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  });

  const testHandler = async () => {
    const res = await axios.get('http://175.45.204.122:8000/api/user', {
      headers: {Authorization: user},
    });
    console.log(res.data);
  };

  const sleep = time =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  // You can do anything in your task such as network requests, timers and so on,
  // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
  // React Native will go into "paused" mode (unless there are other tasks running,
  // or there is a foreground app).
  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(i);
        if (i === 10) {
          PushNotification.localNotification({
            channelId: '1', // (required) channelId, if the channel doesn't exist, notification will not trigger.
            title: '준비할 시간입니다.',
            message: '준비를 시작해 주세요',
            autoCancel: false,
            largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
            largeIconUrl: 'https://icons8.com/icon/78402/push-notifications', // (optional) default: true
            bigPictureUrl: 'https://icons8.com/icon/78402/push-notifications', // (optional) default: undefined
            bigLargeIcon: 'ic_launcher', // (optional) default: undefined
            bigLargeIconUrl: 'https://icons8.com/icon/78402/push-notifications',
          });
          await BackgroundService.stop();
        }
        await sleep(delay);
      }
    });
  };

  const puttonPressHandler = async () => {
    console.log('hi');
    await BackgroundService.start(veryIntensiveTask, options);
  };

  const alarmHandler = async () => {
    await BackgroundService.updateNotification({
      taskDesc: 'New ExampleTask description',
    });
  };

  const stopHandler = async () => {
    await BackgroundService.stop();
  };

  const pushHandler = () => {
    console.log('pushed');
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      channelId: '1', // (required) channelId, if the channel doesn't exist, notification will not trigger.
      title: '준비할 시간입니다.',
      message: '준비를 시작해 주세요', // (required)
      date: new Date(Date.now() + 10 * 1000), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      playSound: true, // (optional) default: true
      soundName: 'alarm',
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  };

  const tokenHandler = async () => {
    const fcmToken = await messaging().getToken();
    console.log(fcmToken);
  };

  return (
    <View style={styles.fullscreen}>
      <Text>홈</Text>
      <Pressable onPress={logoutHandler} style={styles.button}>
        <Text style={styles.text}>로그아웃</Text>
      </Pressable>
      <Pressable onPress={testHandler} style={styles.button}>
        <Text style={styles.text}>테스트</Text>
      </Pressable>
      <Pressable onPress={puttonPressHandler} style={styles.button}>
        <Text style={styles.text}>10초 뒤 알람</Text>
      </Pressable>
      <Pressable onPress={pushHandler} style={styles.button}>
        <Text style={styles.text}>알람 예약</Text>
      </Pressable>
      <Pressable onPress={tokenHandler} style={styles.button}>
        <Text style={styles.text}>Get Token</Text>
      </Pressable>
      {/* <Pressable onPress={alarmHandler} style={styles.button}>
        <Text style={styles.text}>알람</Text>
      </Pressable>
      <Pressable onPress={stopHandler} style={styles.button}>
        <Text style={styles.text}>멈춰!</Text>
      </Pressable> */}
    </View>
  );
}

export default HomeStack;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 4,
    height: 48,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ee2f48',
    marginBottom: 4,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
});
