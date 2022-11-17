import React, {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CarShowTime from './CarShowTime';
import ScheduleSubmitButton from '../components/ScheduleSubmitButton';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';

const patterns = [
  {id: 1, title: '샤워', minute: 10, second: 30},
  {id: 2, title: '양치', minute: 3, second: 20},
  {id: 3, title: '면도', minute: 10, second: 45},
  {id: 4, title: '머리 말리기', minute: 10, second: 45},
  {id: 5, title: '옷 고르기', minute: 10, second: 45},
  {id: 6, title: '옷 입기', minute: 10, second: 45},
  {id: 7, title: '불 끄기', minute: 10, second: 45},
  {id: 8, title: '컴퓨터 끄기', minute: 10, second: 45},
  {id: 9, title: '손 씻기', minute: 10, second: 45},
  {id: 10, title: '세수', minute: 10, second: 45},
  {id: 11, title: '티비 끄기', minute: 10, second: 45},
  {id: 12, title: '가스 끄기', minute: 10, second: 45},
];

function SelectPattern({route}) {
  console.log(route);
  const {user, setUser} = useUserContext();
  const primaryTitle = '저장';
  const secondaryTitle = '취소';
  const navigation = useNavigation();
  const onSecondaryButtonPress = () => {
    navigation.pop();
  };

  const onSaveButtonPress = async () => {
    if (route != undefined) {
      const data = {
        name: route.params.name,
        destName: route.params.destName,
        sourceName: route.params.sourceName,
        time: route.params.time,
      };
      try {
        const res = await axios.post(
          'http://175.45.204.122:8000/api/schedule',
          data,
          {
            headers: {Authorization: user},
          },
        );
        console.log('SUCCESS!', data);
        navigation.push('MainTab');
      } catch (e) {
        console.log(`[ERROR]${e} SENT${data}}`);
      }
    }
  };

  const selectPress = (async = () => {
    navigation.push('MainTab');
  });

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>패턴설정</Text>
      </View>
      <View style={{flex: 1}}></View>
      <View style={styles.button}>
        <ScheduleSubmitButton
          title={secondaryTitle}
          onPress={onSecondaryButtonPress}
        />
        <ScheduleSubmitButton
          title={primaryTitle}
          onPress={onSaveButtonPress}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    // alignItems:'center'
  },
});
export default SelectPattern;
