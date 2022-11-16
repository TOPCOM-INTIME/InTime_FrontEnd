import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScheduleAddButton from './ScheduleAddButton';
import ScheduleItem from './ScheduleItems';
import {useUserContext} from '../contexts/UserContext';

function ScheduleForm() {
  const {user, setUser} = useUserContext();
  const [scheduleData, setData] = useState([]);

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
      console.log(`[ERROR]${e}`);
    }
  };

  useEffect(() => {
    getSchedule();
    console.log(scheduleData);
  }, []);

  return (
    <>
      <ScrollView style={{width: '100%'}}>
        <View style={styles.container}>
          <View style={styles.tasksWrapper}>
            <View style={styles.header}>
              <Text style={styles.sectionTitle}>일정</Text>
              <ScheduleAddButton style={styles.button} />
            </View>
            <View style={styles.items}>
              {scheduleData.map(item => (
                <ScheduleItem data={item} />
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
