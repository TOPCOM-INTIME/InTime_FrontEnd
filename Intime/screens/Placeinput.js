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

function Placeinput({data, setData, date, setDate}) {
  const {user, setUser} = useUserContext();
  const [loading, setLoading] = useState(false);
  // if (route.params !== undefined) {
  //   const ScheduleData = {
  //     destName: route.params.destName,
  //     sourceName: route.params.sourceName,
  //     time: route.params.time,
  //   };
  //   console.log('일정 데이터', ScheduleData);
  // }
  // const navigation = useNavigation();
  // const primaryTitle = '저장';
  // const secondaryTitle = '취소';
  // const onSecondaryButtonPress = () => {
  //   navigation.navigate('MainTab');
  // };

  // const onSaveButtonPress = async () => {
  //   console.log(ScheduleData);
  //   try {
  //     const res = await axios.post(
  //       'http://175.45.204.122:8000/api/schedule',
  //       ScheduleData,
  //       {
  //         headers: {Authorization: user},
  //       },
  //     );
  //     console.log(res.data);
  //   } catch (e) {
  //     console.log(`[ERROR]${e} SENT${this.ScheduleData}}`);
  //   }
  // };

  return (
    <PlaceinputForm
      data={data}
      setData={setData}
      date={date}
      setDate={setDate}
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
