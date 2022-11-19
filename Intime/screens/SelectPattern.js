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

function SelectPattern({data, setData, date, setDate, route}) {
  const {patterns, setPatterns, patternGroups, setPatternGroups} =
    useLogContext();
  const [group, setGroup] = useState(route?.params.group || []);
  const {user, setUser} = useUserContext();
  const primaryTitle = '저장';
  const secondaryTitle = '취소';
  const navigation = useNavigation();
  const onSecondaryButtonPress = () => {
    navigation.pop();
  };

  const calTime = () => {
    let readyTime = new Date(data.startTime);
    let tmpTime = 0;
    group.map(item => (tmpTime += item.time));
    readyTime.setSeconds(readyTime.getSeconds() - tmpTime);
    return readyTime;
  };

  const onSaveButtonPress = async () => {
    setData('readyPatterns_Ids')(group.map(item => item.id));
    setData('readyTime')(calTime());
    setData('endTime')(date);

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
      console.log(data);
      console.log(`[ERROR]${e} SENT${data.name}}`);
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
