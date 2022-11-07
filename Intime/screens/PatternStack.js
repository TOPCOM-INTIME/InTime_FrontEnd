import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import authStorage from '../stroages/authStorage';
import {useUserContext} from '../contexts/UserContext';
import PatternScreen from './PatternScreen';

const Stack = createNativeStackNavigator();

function PatternStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="패턴 리스트"
        component={PatternScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default PatternStack;
