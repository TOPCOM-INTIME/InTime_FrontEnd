import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScheduleList from './ScheduleListScreen';
import CarShowTime from './CarShowTime';
import Placeinput from './Placeinput';
import PlaceinputForm from '../components/PlaceinputForm';
import SelectPattern from './SelectPattern';
import GroupScheduleFriend from '../components/GroupScheduleFriend';
const Stack = createNativeStackNavigator();
function ScheduleScreen({route}) {
  // console.log(route);
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
  const [OdsayData, setOdsayData] = useState([]);
  const [isCreatingGroup, setisCreatingGroup] = useState(false);
  const [isUpdate, setisUPdate] = useState(false);
  const [checkGroup, setcheckGroup] = useState(false);
  const [ItemID, setTiemID] = useState('');
  const [friendList, setfriendList] = useState([]);
  useEffect(() => {
    if (route.params === undefined) {
      // console.log('when add');
    } else {
      setisUPdate(true);
      setTiemID(route.params.id);
      setData({
        name: route.params.name,
        time: route.params.time,
        sourceName: route.params.sourceName,
        destName: route.params.destName,
        readyPatterns_Ids: route.params.readyPatterns_Ids,
        startTime: new Date(route.params.startTime),
        readyTime: new Date(route.params.readyTime),
        endTime: new Date(route.params.endTime),
        status: route.params.status,
      });
    }
  }, []);

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
              OdsayData={OdsayData}
              setOdsayData={setOdsayData}
              checkGroup={checkGroup}
              setcheckGroup={setcheckGroup}
              friendList={friendList}
              setfriendList={setfriendList}
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
              isUpdate={isUpdate}
              ItemID={ItemID}
              checkGroup={checkGroup}
              friendList={friendList}
              setfriendList={setfriendList}
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
              OdsayData={OdsayData}
              setBus={setBus}
            />
          )}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GroupScheduleFriend"
          children={({navigation}) => (
            <GroupScheduleFriend
              friendList={friendList}
              setfriendList={setfriendList}
            />
          )}
        />
      </Stack.Navigator>
    </>
  );
}

export default ScheduleScreen;
