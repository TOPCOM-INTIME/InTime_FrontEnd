import React, {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import CarShowTime from './CarShowTime';
import ScheduleSubmitButton from '../components/ScheduleSubmitButton';
import {useNavigation} from '@react-navigation/native';
import {useLogContext} from '../contexts/LogContext';
import {useUserContext} from '../contexts/UserContext';
import Patterns from '../components/Patterns';
import PatternGroups from '../components/PatternGroups';
import PushNotification from 'react-native-push-notification';
import {AppBar, Divider, Button, IconButton} from '@react-native-material/core';
import {API_URL} from '@env';
import LoadingBar from '../components/LoadingBar';

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
  INVITE,
  schedulePoolId,
  friendtoken,
  patternList,
}) {
  const {
    patterns,
    setPatterns,
    patternGroups,
    setPatternGroups,
    setScheduleInvite,
    isLoading,
    setIsLoading,
  } = useLogContext();
  const [group, setGroup] = useState([]);
  const {user, setUser} = useUserContext();
  const primaryTitle = '저장';
  const secondaryTitle = '취소';
  const navigation = useNavigation();
  let group_data;
  // console.log('일정 확인', data);
  console.log('친구 목록', patternList);

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

  const sendnotice = async item => {
    let fcm_data = {
      destName: data.destName,
      scheduleName: data.name,
      scheduleTime: String(data.endTime),
      targetToken: item,
    };
    try {
      const res = await axios.post(`${API_URL}/api/fcm/schedule`, fcm_data, {
        headers: {Authorization: user},
      });
      console.log(`[NOTICE_SUCCESS]`);
    } catch (e) {
      console.log(`[NOTICE_ERROR],${e}`, fcm_data);
    }
  };

  const sendNotification = res => {
    console.log('알림 데이터', res.data.data);
    try {
      PushNotification.localNotificationSchedule({
        channelId: '1', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: '준비할 시간입니다.',
        message: `준비를 시작해 주세요 도착지: ${data.destName} 도착예정 시간:${data.endTime}`,
        date: setTime(data.readyTime),
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        playSound: true, // (optional) default: true
        soundName: 'alarm',
        repeatTime: 1,
        id: res.data.data * 2 + 1,
      });
      PushNotification.localNotificationSchedule({
        channelId: '1', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: `출발할 시간입니다. 도착지: ${data.destName} 도착예정 시간:${data.endTime}`,
        message: '출발하세요!!',
        date: setTime(data.startTime), // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        playSound: true, // (optional) default: true
        soundName: 'alarm',
        repeatTime: 1,
        id: res.data.data * 2,
      });
    } catch (e) {
      console.log('[SEND_NOTIFICATION_ERROR]', e);
    }
  };

  useEffect(() => {
    // if (isUpdate) {
    //   console.log(data);
    //   for (let i = 0; i < patternList.length; i++) {
    //     group.push(patternList[i]);
    //   }
    // }

    const calTime = () => {
      let readyTime = new Date(data.startTime);
      let tmpTime = 0;
      group.map(item => (tmpTime += item.time));
      readyTime.setSeconds(readyTime.getSeconds() - tmpTime);
      return setTime(readyTime);
    };

    setDatas(data => {
      console.log('데이터 변화', data);
      return {
        ...data,
        readyPatterns_Ids: group.map(item => item.id),
        readyTime: calTime(),
      };
    });
  }, [group, setDatas, data.startTime]);

  const onSaveButtonPress = async () => {
    // console.log('알림 설정한 시간', data.readyTime);
    let currentDate = new Date();
    if (currentDate > data.startTime) {
      Alert.alert('오류', '지금 출발해도 지각입니다! 그냥 출발하세요!!');
    } else if (currentDate > data.readyTime) {
      Alert.alert('오류', '준비시간이 너무 길어요!');
    } else {
      //초대장으로 온 일정
      setIsLoading(true);
      if (!isUpdate) {
        if (INVITE === 1) {
          console.log('초대장으로 인한', schedulePoolId);
          try {
            group_data = data;
            group_data.members_Ids = friendList;
            // console.log(group_data);
            const res = await axios.post(
              `${API_URL}/api/group-scehduel-after-invitation/schedulepool=${schedulePoolId}`,
              group_data,
              {
                headers: {Authorization: user},
              },
            );
            const fetchedSchedule = await axios.get(
              `${API_URL}/api/schedule-invitations`,
              {
                headers: {Authorization: user},
              },
            );
            setScheduleInvite(fetchedSchedule.data);
            sendNotification(res);
            console.log('INVITE_POST_SUCCESS!', group_data, res.data);
            navigation.push('MainTab');
          } catch (e) {
            console.log(group_data);
            console.log(`[INVITE_POST_ERROR]${e} SENT${schedulePoolId}`);
          }
        }
        // 그룹 일정 생성
        else if (checkGroup) {
          try {
            group_data = data;
            group_data.members_Ids = friendList;

            friendtoken.map(item => {
              sendnotice(item);
            });

            const res = await axios.post(
              `${API_URL}/api/group-schedule`,
              group_data,
              {
                headers: {Authorization: user},
              },
            );
            sendNotification(res);
            console.log('GROUP_POST_SUCCESS!', group_data, res.data);
            navigation.push('MainTab');
          } catch (e) {
            console.log(group_data);
            console.log(`[GROUP_POST_ERROR]${e} SENT${group_data}`);
          }
        } //개인 일정 생성
        else {
          console.log(data);
          try {
            const res = await axios.post(`${API_URL}/api/schedule`, data, {
              headers: {Authorization: user},
            });
            sendNotification(res);
            console.log('[INDIVIDUAL_POST_SUCCESS]', data);
            navigation.push('MainTab');
          } catch (e) {
            console.log(`[INDIVIDUAL_POST_ERROR]${e} SENT${data}`);
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
        sendNotification(res);
        console.log('UPDATE_SUCCESS!', data);
        navigation.push('MainTab');
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <AppBar
        title="패턴 설정"
        titleStyle={{fontFamily: 'NanumSquareRoundEB'}}
        centerTitle={true}
        color="#6c757d"
        tintColor="white"
      />
      {isLoading && <LoadingBar />}
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
          <Divider
            color="#6c757d"
            style={{height: 1.2}}
            leadingInset={0}
            trailingInset={0}
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
        <Button
          title={secondaryTitle}
          color="#6c757d"
          variant="text"
          onPress={onSecondaryButtonPress}
          width="45%"
        />
        <Button
          title={primaryTitle}
          color="#6c757d"
          variant="text"
          onPress={onSaveButtonPress}
          width="45%"
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
  // header: {
  //   paddingTop: 20,
  //   paddingHorizontal: 20,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   fontSize: 300,
  // },
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
    borderColor: '#6c757d',
    borderRightWidth: 1,
    width: '50%',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    color: 'black',
  },
});
export default SelectPattern;
