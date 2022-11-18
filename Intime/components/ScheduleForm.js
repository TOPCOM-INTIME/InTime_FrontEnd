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

function ScheduleForm() {
  const {user, setUser} = useUserContext();
  const [scheduleData, setData] = useState([]);
  const optionBack = {
    taskName: '준비',
    taskTitle: '준비할 시간입니다.',
    taskDesc: '준비하세욧!!!!!!!!!!!!',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'Intime://', // See Deep Linking for more info
    parameters: {
      delay: 1000,
    },
  };
  let currentDate = new Date();
  const sleep = time =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  const getSchedule = async () => {
    try {
      const res = await axios.get(
        'http://175.45.204.122:8000/api/user/schedule/all',
        {
          headers: {Authorization: user},
        },
      );
      setData(res.data);
    } catch (e) {
      console.log(`[GETERROR]${e}`);
    }
  };

  const deleteSchedule = async ID => {
    try {
      axios
        .delete(`http://175.45.204.122:8000/api/schedule/scheduleId=${ID}`, {
          headers: {Authorization: user},
        })
        .then(res => {
          getSchedule();
        });
    } catch (e) {
      console.log(`[DELETE_ERROR]${e}`);
    }
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

  const updateScehdule = item => {
    let tmpDate = new Date(item.time);
    if (tmpDate <= currentDate && item.status != 'ING') {
      try {
        const data = {
          destName: item.destName,
          endTime: item.endTime,
          name: item.name,
          readyPatterns_Ids: item.readyPatterns_Ids,
          readyTime: item.readyTime,
          schedulePoolId: item.schedulePoolId,
          sourceName: item.sourceName,
          startTime: item.startTime,
          status: 'ING',
          time: item.time,
        };
        axios
          .put(
            `http://175.45.204.122:8000/api/schedule=${item.id}/update`,
            data,
            {
              headers: {Authorization: user},
            },
          )
          .then(res => {
            getSchedule();
          });
        console.log('업데이트 필요', item.status);
      } catch (e) {
        console.log(`[ERROR]${e}`, item.id);
      }
    } else {
      console.log('업데이트 불필요', item.id, currentDate, tmpDate);
    }
  };

  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        currentDate.setSeconds(currentDate.getSeconds() + delay / 1000);
        scheduleData.map(item => updateScehdule(item));
        console.log(scheduleData);
        await sleep(delay);
      }
    });
  };

  const puttonPressHandler = async () => {
    console.log('hi');
    await BackgroundService.start(veryIntensiveTask, optionBack);
  };

  const stopHandler = async () => {
    await BackgroundService.stop();
  };

  useEffect(() => {
    getSchedule();
  }, []);

  if (scheduleData.length == 0) {
    return (
      <>
        <ScrollView style={{width: '100%'}}>
          <View style={styles.tasksWrapper}>
            <View style={styles.header}>
              <Text style={styles.sectionTitle}>일정</Text>
              <ScheduleAddButton style={styles.button} />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '80%',
              }}>
              <Text>일정 없습니다</Text>
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
              <TouchableOpacity
                onPress={stopHandler}
                onLongPress={puttonPressHandler}>
                <Text style={styles.sectionTitle}>테스트</Text>
              </TouchableOpacity>
              <ScheduleAddButton style={styles.button} />
            </View>
            <View style={styles.items}>
              {scheduleData.map(item => (
                <TouchableOpacity onLongPress={() => onLongClick(item)}>
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
});

export default ScheduleForm;
