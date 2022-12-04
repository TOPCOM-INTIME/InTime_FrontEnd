import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScheduleList from './ScheduleListScreen';
import CarShowTime from './CarShowTime';
import Placeinput from './Placeinput';
import PlaceinputForm from '../components/PlaceinputForm';
import SelectPattern from './SelectPattern';
import GroupScheduleFriend from '../components/GroupScheduleFriend';
import Invitation from '../components/Invitation';
import ScheduleandMap from './ScheduleandMap';
import ScheduleCurrent from '../components/ScheduleCurrent';

const Stack = createNativeStackNavigator();
function ScheduleScreen({route}) {
  // console.log(route);
  const [data, setData] = useState({
    name: '',
    time: 0,
    sourceName: '',
    destName: '',
    readyPatterns_Ids: [],
    startTime: 0,
    readyTime: 0,
    endTime: new Date(),
    status: 'PRE',
  });

  const [CarData, setCarData] = useState({
    totalFare: 0,
    totalDistance: 0,
    taxiFare: 0,
  });

  const [WalkData, setWalkData] = useState({
    totalDistance: 0,
    totalTime: 0,
  });

  const [busTime, setBus] = useState(0);
  const [CarTime, setCarTime] = useState(0);
  const [isCar, setisCar] = useState(false);

  const [OdsayData, setOdsayData] = useState([]);
  const [isCreatingGroup, setisCreatingGroup] = useState(false);
  const [isUpdate, setisUPdate] = useState(false);
  const [checkGroup, setcheckGroup] = useState(false);
  const [ItemID, setTiemID] = useState('');
  const [friendList, setfriendList] = useState([]);
  const [UPDATEDATA, SETUPDATEDATA] = useState([]);
  const [INVITE, SETINVITE] = useState(0);
  const [schedulePoolId, setSchedulePool] = useState();
  const [friendtoken, setfriendtoken] = useState([]);
  const [usernameList, setusernameList] = useState([]);
  useEffect(() => {
    if (route.params === undefined) {
      // console.log('when add', route);
    } else if (route.params.isUpdate) {
      // console.log('when update', route.params);
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
    } else {
      SETINVITE(1);
      // console.log('when invite');
      setSchedulePool(route.params.schedulePoolId);
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

  const createCarDatas = name => value => {
    setCarData({...CarData, [name]: value});
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
              INVITE={INVITE}
              isCar={isCar}
              setCarTime={setCarTime}
              CarTime={CarTime}
              usernameList={usernameList}
              CarData={CarData}
              setCarData={setCarData}
              WalkData={WalkData}
              setWalkData={setWalkData}
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
              INVITE={INVITE}
              schedulePoolId={schedulePoolId}
              friendtoken={friendtoken}
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
              isCar={isCar}
              setisCar={setisCar}
              CarTime={CarTime}
              CarData={CarData}
              WalkData={WalkData}
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
              friendtoken={friendtoken}
              setfriendtoken={setfriendtoken}
              usernameList={usernameList}
              setusernameList={setusernameList}
            />
          )}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Invitation"
          children={({navigation}) => (
            <Invitation
              friendList={friendList}
              setfriendList={setfriendList}
              friendtoken={friendtoken}
              setfriendtoken={setfriendtoken}
            />
          )}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ScheduleandMap"
          children={({navigation}) => <ScheduleandMap />}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ScheduleCurrent"
          children={({navigation}) => <ScheduleCurrent />}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
}

export default ScheduleScreen;
