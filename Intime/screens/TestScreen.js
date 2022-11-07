import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CarShowTime from './CarShowTime';
import Placeinput from './Placeinput';

const Stack = createNativeStackNavigator();

function TestScreen() {
 
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Placeinput"
        component={Placeinput}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CarScreen"
        component={CarShowTime}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default TestScreen;
