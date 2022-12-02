import React, {useEffect, useState} from 'react';
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
import {useUserContext} from '../contexts/UserContext';
import BackgroundService from 'react-native-background-actions';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import {API_URL} from '@env';

function ScheduleForm() {
  const {user, setUser} = useUserContext();
  const [scheduleData, setSchedule] = useState([]);
  const navigation = useNavigation();

  const checkInvitation = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/schedule-invitations`, {
        headers: {Authorization: user},
      });
      console.log('get한 데이터', res.data);
    } catch (e) {
      console.log(`[CHECK_ERROR]${e}`);
    }
  };

  const getSchedule = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user/schedule/all`, {
        headers: {Authorization: user},
      });
      setSchedule(res.data);
      console.log('GET_SCHEDULE', res.data);
    } catch (e) {
      console.log(`[GET_SCHEDULE_ERROR]${e}`);
    }
  };

  const deleteNotification = ID => {
    PushNotification.cancelLocalNotification(ID);
  };

  const deleteSchedule = async ID => {
    try {
      deleteNotification(ID);
      axios
        .delete(`${API_URL}/api/schedule/scheduleId=${ID}`, {
          headers: {Authorization: user},
        })
        .then(res => {
          getSchedule();
        });
    } catch (e) {
      console.log(`[DELETE_ERROR]${e}`);
    }
  };

  const onShortPress = item => {
    let isUpdate = true;
    item.isUpdate = true;
    navigation.push('ScheduleScreen', item);
  };

  const onLongClick = item => {
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
  };

  const onNoticePress = () => {
    navigation.push('InvitationScreen');
  };

  const [sec, setSec] = useState(0);
  useEffect(() => {
    // checkInvitation();
    getSchedule();
  }, []);

  if (scheduleData.length == 0) {
    return (
      <>
        <ScrollView style={{width: '100%'}}>
          <View style={styles.tasksWrapper}>
            <View style={styles.header}>
              <Text style={styles.sectionTitle}>일정</Text>
              <View style={styles.rightButton}>
                <TouchableOpacity onPress={onNoticePress}>
                  <Icon name={'notifications'} size={30} color={'black'} />
                </TouchableOpacity>
                <ScheduleAddButton style={styles.button} />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '80%',
              }}>
              <Text style={{color: 'black'}}>일정 없습니다</Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <ScrollView style={{width: '100%'}}>
        <View style={styles.container}>
          <View style={styles.tasksWrapper}>
            <View style={styles.header}>
              <Text style={styles.sectionTitle}>일정</Text>
              <View style={styles.rightButton}>
                <TouchableOpacity onPress={onNoticePress}>
                  <Icon name={'notifications'} size={30} color={'black'} />
                </TouchableOpacity>
                <ScheduleAddButton style={styles.button} />
              </View>
            </View>
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
