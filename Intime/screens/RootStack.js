import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import SignInScreen from './SignInScreen';
import GroupCreateScreen from './GroupCreateScreen';
import CommunityScreenAdd from './CommunityScreen/CommunityScreenAdd';
import PatternCreateScreen from './PatternCreateScreen';
import NickNameScreen from './NickNameScreen';
import authStorage from '../stroages/authStorage';
import {useUserContext} from '../contexts/UserContext';
import ScheduleScreen from './ScheduleStack';
import PasswordScreen from './PasswordScreen';
import {API_URL} from '@env';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import {Text} from '@react-native-material/core';
import {Linking} from 'react-native';
import InvitationScreen from './InvitationScreen';
import PasswordChangeScreen from './PasswordChangeScreen';
import {useLogContext} from '../contexts/LogContext';
import ScheduleandMap from './ScheduleandMap';
import ScheduleCurrent from '../components/ScheduleCurrent';
const Stack = createNativeStackNavigator();

function RootStack() {
  const {user, setUser} = useUserContext();
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
            name="CommunityScreenAdd"
            component={CommunityScreenAdd}
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
          <Stack.Screen
            name="InvitationScreen"
            component={InvitationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScheduleandMap"
            component={ScheduleandMap}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScheduleCurrent"
            component={ScheduleCurrent}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="changePassword"
            component={PasswordChangeScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
