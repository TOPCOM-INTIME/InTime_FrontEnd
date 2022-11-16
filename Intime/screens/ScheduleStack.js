import React from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScheduleList from './ScheduleListScreen';
import CarShowTime from './CarShowTime';
import Placeinput from './Placeinput';
import PlaceinputForm from '../components/PlaceinputForm';
const Stack = createNativeStackNavigator();
function ScheduleScreen() {
  return (
    <>
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
        <Stack.Screen
          name="Placinputform"
          component={PlaceinputForm}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
}

export default ScheduleScreen;
