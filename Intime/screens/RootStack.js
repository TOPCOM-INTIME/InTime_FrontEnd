import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import SignInScreen from './SignInScreen';
import GroupCreateScreen from './GroupCreateScreen';
import PatternCreateScreen from './PatternCreateScreen';
import NickNameScreen from './NickNameScreen';
import authStorage from '../stroages/authStorage';
import {useUserContext} from '../contexts/UserContext';
import ScheduleScreen from './ScheduleStack';
import PasswordScreen from './PasswordScreen';
import {API_URL} from '@env';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {user, setUser} = useUserContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await authStorage.get();
        setUser(data);
        const deviceToken = await messaging().getToken();
        await axios.put(
          `${API_URL}/api/device-token`,
          {deviceToken},
          {headers: {Authorization: data}},
        );
      } catch (e) {
        return;
      }
    }
    fetchData();
  }, [setUser]);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="write"
            component={PatternCreateScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScheduleScreen"
            component={ScheduleScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateGroup"
            component={GroupCreateScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NickName"
            component={NickNameScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Password"
            component={PasswordScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
