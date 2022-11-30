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
import {useLogContext} from '../contexts/LogContext';
import {useUserContext} from '../contexts/UserContext';
import Patterns from '../components/Patterns';
import PatternGroups from '../components/PatternGroups';
import PushNotification from 'react-native-push-notification';
import {API_URL} from '@env';

// api​/schedule={id}​/update/
function SelectPattern({
  data,
  setData,
  date,
  setDate,
  setDatas,
  isUpdate,
  ItemID,
  checkGroup,
  friendList,
}) {
  const {patterns, setPatterns, patternGroups, setPatternGroups} =
    useLogContext();
  const [group, setGroup] = useState([]);
  const {user, setUser} = useUserContext();
  const primaryTitle = '저장';
  const secondaryTitle = '취소';
  const navigation = useNavigation();
  let group_data;
  console.log('일정 확인', checkGroup);
  console.log('친구 목록', friendList);

  const onSecondaryButtonPress = () => {
    navigation.pop();
    setData('readyTime')(0);
  };
  // console.log(data.readyPatterns_Ids);
  const setTime = time => {
    let setTime = new Date(time);
    setTime.setSeconds(0);
    return setTime;
  };
  const calTime = () => {
    let readyTime = new Date(data.startTime);
    let tmpTime = 0;
    group.map(item => (tmpTime += item.time));
    readyTime.setSeconds(readyTime.getSeconds() - tmpTime);
    return setTime(readyTime);
  };

  useEffect(() => {
    setDatas(data => {
      return {
        ...data,
        readyPatterns_Ids: group.map(item => item.id),
        readyTime: calTime(),
      };
    });
  }, [group]);

  // const setDatass = () => {
  //   setData('readyPatterns_Ids')(group.map(item => item.id));
  //   setData('readyTime')(calTime());
  // };

  const onSaveButtonPress = async () => {
    console.log('알림 설정한 시간', data.readyTime);
    PushNotification.localNotificationSchedule({
      channelId: '1', // (required) channelId, if the channel doesn't exist, notification will not trigger.
      title: '준비할 시간입니다.',
      message: '준비를 시작해 주세요', // (required)
      date: setTime(data.readyTime),
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      playSound: true, // (optional) default: true
      soundName: 'alarm',
      repeatTime: 1,
    });
    PushNotification.localNotificationSchedule({
      channelId: '2', // (required) channelId, if the channel doesn't exist, notification will not trigger.
      title: '출발할 시간입니다.',
      message: '출발하세요!!', // (required)
      date: setTime(data.startTime), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      playSound: true, // (optional) default: true
      soundName: 'alarm',
      repeatTime: 1,
    });
    try {
      if (!isUpdate) {
        // 그룹 일정 생성
        if (checkGroup) {
          try {
            group_data = data;
            group_data.members_Ids = friendList;
            console.log(group_data);
            const res = await axios.post(
              `${API_URL}/api/group-schedule`,
              group_data,
              {
                headers: {Authorization: user},
              },
            );
            console.log('GROUP_POST_SUCCESS!', group_data, res);
            navigation.push('MainTab');
          } catch (e) {
            console.log(group_data);
            console.log(`[GROUP_POST_ERROR]${e} SENT${group_data}`);
          }
        } //개인 일정 생성
        else {
          try {
            const res = await axios.post(`${API_URL}/api/schedule`, data, {
              headers: {Authorization: user},
            });
            console.log('POST_SUCCESS!', data);
            navigation.push('MainTab');
          } catch {
            console.log(data);
            console.log(`[POST_ERROR]${e} SENT${data}`);
          }
        }
      } // 기존 일정 수정
      else {
        console.log(`UPDATE ${ItemID}`);
        const res = await axios.put(
          `${API_URL}/api/schedule=${ItemID}/update/`,
          data,
          {
            headers: {Authorization: user},
          },
        );
        console.log('UPDATE_SUCCESS!', data);
        navigation.push('MainTab');
      }
    } catch (e) {
      console.log(data);
      console.log(`[POST_ERROR]${e} SENT${data}`);
    }
  };

  return (
    <>
      <View>
        <Text style={styles.sectionTitle}>패턴설정</Text>
      </View>

      <View style={styles.block}>
        <View style={styles.container}>
          <View style={styles.text}>
            <Text style={styles.header}>패턴 그룹 목록</Text>
          </View>
          <PatternGroups
            data={data}
            setData={setDatas}
            patterns={patternGroups}
            setGroup={setGroup}
            isCreatingGroup={2}
          />
          <View style={styles.text}>
            <Text style={styles.header}>패턴 목록</Text>
          </View>
          <Patterns
            patterns={patterns}
            setGroup={setGroup}
            isCreatingGroup={2}
            setData={setDatas}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.text}>
            <Text style={styles.header}>선택된 패턴</Text>
          </View>
          <Patterns patterns={group} setGroup={setGroup} isCreatingGroup={2} />
        </View>
      </View>

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
  block: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
  },
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
  container: {
    width: '50%',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    color: 'black',
  },
});
export default SelectPattern;
