import React, {useState} from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScheduleList from './ScheduleListScreen';
import CarShowTime from './CarShowTime';
import Placeinput from './Placeinput';
import PlaceinputForm from '../components/PlaceinputForm';
import SelectPattern from './SelectPattern';
const Stack = createNativeStackNavigator();
function ScheduleScreen() {
  const [data, setData] = useState({
    name: '',
    time: '',
    sourceName: '',
    destName: '',
    readyPatterns_Ids: [],
    startTime: 0,
    readyTime: 0,
    endTime: new Date(),
    status: 'PRE',
  });
  const [busTime, setBus] = useState(0);

  const createChangeTextHandler = name => value => {
    setData({...data, [name]: value});
  };
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Placeinput"
          children={({navigation}) => (
            <Placeinput
              data={data}
              setData={createChangeTextHandler}
              busTime={busTime}
              setBus={setBus}
            />
          )}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectPattern"
          children={({navigation}) => (
            <SelectPattern
              data={data}
              setData={createChangeTextHandler}
              setDatas={setData}
            />
          )}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CarScreen"
          children={({navigation}) => (
            <CarShowTime
              data={data}
              setData={createChangeTextHandler}
              busTime={busTime}
              setBus={setBus}
            />
          )}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
}

export default ScheduleScreen;
