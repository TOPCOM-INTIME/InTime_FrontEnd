import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScheduleAddButton from './ScheduleAddButton';
import ScheduleItem from './ScheduleItems';
import { useUserContext } from '../contexts/UserContext';
import BackgroundService from 'react-native-background-actions';
import { useNavigation } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import {
  AppBar,
  IconButton,
  Badge,
  HStack,
  Box,
} from '@react-native-material/core';
import { API_URL } from '@env';
import { useLogContext } from '../contexts/LogContext';
import LoadingBar from './LoadingBar';

function ScheduleForm() {
  const { user, setUser } = useUserContext();
  const { scheduleInvite, isLoading, setIsLoading } = useLogContext();
  const [scheduleData, setSchedule] = useState([]);
  const navigation = useNavigation();

  function checkEnd(item) {
    let currentDate = new Date();
    let tmpendtime = new Date(item.endTime);
    console.log(currentDate, '지금시간');
    console.log(tmpendtime, '일정 종료 시간');
    if (tmpendtime < currentDate) {
      return true;
    } else {
      return false;
    }
  }

  const getSchedule = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/user/schedule/all`, {
        headers: { Authorization: user },
      });
      setSchedule(res.data);
      // console.log('GET_SCHEDULE', res.data);
    } catch (e) {
      console.log(`[GET_SCHEDULE_ERROR]${e}`);
    }
    setIsLoading(false);
  };

  const deleteNotification = ID => {
    try {
      PushNotification.cancelLocalNotification(ID * 2);
      PushNotification.cancelLocalNotification(ID * 2 + 1);
      console.log(`Notification deleted${ID}`);
    } catch (e) {
      console.log('[ERROR_NOTIFICATION]', e);
    }
  };

  const deleteSchedule = async ID => {
    setIsLoading(true);
    try {
      deleteNotification(ID);
      axios
        .delete(`${API_URL}/api/schedule/scheduleId=${ID}`, {
          headers: { Authorization: user },
        })
        .then(res => {
          getSchedule();
        });
    } catch (e) {
      console.log(`[DELETE_ERROR]${e}`);
    }
    setIsLoading(false);
  };

  const onShortPress = item => {
    setIsLoading(true);
    item.isUpdate = true;
    if (item.schedulePoolId) {
      Alert.alert('', '이미 생성된 단체일정은 수정할 수 없습니다!');
    } else {
      navigation.push('ScheduleScreen', item);
    }
    setIsLoading(false);
  };

  const onSubmit = () => {
    navigation.push('ScheduleScreen');
  };

  const onLongClick = item => {
    if (item.schedulePoolId) {
      if (checkEnd(item)) {
        Alert.alert('삭제', '정말로 삭제하시겠습니까?', [
          {
            text: '예',
            onPress: () => {
              deleteSchedule(item.id);
              AsyncStorage.removeItem(toString(item.schedulePoolId))
              console.log(`${item.id}deleted`);
            },
          },
          {
            text: '아니오',
            onPress: () => {
              console.log(`nothing deleted`);
            },
          },
        ]);
      } else {
        Alert.alert('', '종료되지 않은 단체일정은 삭제할 수 없습니다!');
      }
    } else {
      Alert.alert('삭제', '정말로 삭제하시겠습니까?', [
        {
          text: '예',
          onPress: () => {
            deleteSchedule(item.id);
            console.log(`${item.id}deleted`);
          },
        },
        {
          text: '아니오',
          onPress: () => {
            console.log(`nothing deleted`);
          },
        },
      ]);
    }
  };

  const onNoticePress = () => {
    navigation.push('InvitationScreen');
  };

  const [sec, setSec] = useState(0);
  useEffect(() => {
    // checkInvitation();
    getSchedule();
  }, []);

  if (scheduleData.length === 0) {
    return (
      <>
        {isLoading && <LoadingBar />}
        <AppBar
          title="일정"
          titleStyle={{ fontFamily: 'NanumSquareRoundEB' }}
          centerTitle={true}
          color="#6c757d"
          tintColor="white"
          leading={<></>}
          trailing={props => (
            <HStack>
              <IconButton
                icon={props => <Icon name="notifications" {...props} />}
                color="white"
                onPress={onNoticePress}
              />
              <Badge
                label={scheduleInvite.length}
                showZero={false}
                tintColor="white"
                color="red"
                style={{ position: 'absolute', left: 30 }}
              />
              <IconButton
                icon={props => <Icon name="add" {...props} />}
                color="white"
                onPress={onSubmit}
              />
            </HStack>
          )}
        />

        <ScrollView style={{ width: '100%' }}>
          <View style={styles.tasksWrapper}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '80%',
              }}>
              <Text style={{ color: 'black' }}>일정 없습니다</Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      {isLoading && <LoadingBar />}
      <AppBar
        title="일정"
        titleStyle={{ fontFamily: 'NanumSquareRoundEB' }}
        centerTitle={true}
        color="#6c757d"
        tintColor="white"
        leading={<></>}
        trailing={props => (
          <HStack>
            <IconButton
              icon={props => <Icon name="notifications" {...props} />}
              color="white"
              onPress={onNoticePress}
            />
            <Badge
              label={scheduleInvite.length}
              showZero={false}
              tintColor="white"
              color="red"
              style={{ position: 'absolute', left: 30 }}
            />

            <IconButton
              icon={props => <Icon name="add" {...props} />}
              color="white"
              onPress={onSubmit}
            />
          </HStack>
        )}
      />
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'grey' }}>
          개인 일정/종료된 단체 일정은 길게 누르면 삭제할 수 있습니다
        </Text>
      </View>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.container}>
          <View style={styles.tasksWrapper}>
            <View style={styles.items}>
              {scheduleData.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onLongPress={() => onLongClick(item)}
                  onPress={() => onShortPress(item)}>
                  <ScheduleItem data={item} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  form: {
    marginTop: 80,
    width: '100%',
    paddingHorizontal: 16,
  },
  button: {
    flexDirection: 'row-reverse',
    margin: 15,
  },
  rightButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ScheduleForm;
