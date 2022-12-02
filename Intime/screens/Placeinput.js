import axios from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Platform,
  Text,
  StyleSheet,
  Keyboard,
  Pressable,
} from 'react-native';
import FindButton from '../components/FindButton';
import PlaceinputForm from '../components/PlaceinputForm';
import ScheduleSubmitButton from '../components/ScheduleSubmitButton';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';

function Placeinput({
  data,
  setData,
  busTime,
  setBus,
  OdsayData,
  setOdsayData,
  checkGroup,
  setcheckGroup,
  friendList,
  setfriendList,
  INVITE,
  isCar,
  setCarTime,
  CarTime,
}) {
  const {user, setUser} = useUserContext();
  const [loading, setLoading] = useState(false);
  return (
    <PlaceinputForm
      data={data}
      setData={setData}
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
      CarTime={CarTime}
      setCarTime={setCarTime}
    />
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: 'white',
  },
  fullscreen: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 16,
  },
  buttons: {
    height: 30,
    alignItems: 'baseline',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});

export default Placeinput;
