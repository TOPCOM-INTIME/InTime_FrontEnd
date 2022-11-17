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
import CustomSearchInput from './CustomSearchInput';
import DatePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SwitchSelector from 'react-native-switch-selector';
import FindButton from '../components/FindButton';
import ScheduleSubmitButton from './ScheduleSubmitButton';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';

function PlaceinputForm({route}) {
  console.log('route값:', route);
  const navigation = useNavigation();
  const scheduleName = useRef();
  const start = useRef();
  const end = useRef();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isGroup, setGroup] = useState(false);
  const [placeData, setPlaceData] = useState({
    scheduleName: '',
    start: '',
    end: '',
    time: '',
  });
  const primaryTitle = '저장';
  const secondaryTitle = '취소';
  const {user, setUser} = useUserContext();

  const createChangeTextHandler = name => value => {
    setPlaceData({...placeData, [name]: value});
  };

  // 개인이나 단체를 정하는 토글
  const options = [
    {label: '개인', value: false},
    {label: '단체', value: true},
  ];
  //토글 값 변경
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  //DatePicker 출력
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const onSecondaryButtonPress = () => {
    navigation.push('MainTab');
  };

  const selectPress = (async = () => {
    if (route != undefined) {
      const data = {
        name: placeData.scheduleName,
        destName: route.params.destName,
        sourceName: route.params.sourceName,
        time: route.params.time,
      };
      navigation.push('SelectPattern', data);
    } else {
      alert('출발과 도착을 입력해라');
    }
  });

  const onSaveButtonPress = async () => {
    if (route != undefined) {
      const data = {
        name: placeData.name,
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

  return (
    <>
      <SwitchSelector
        options={options}
        initial={0}
        selectedColor={'white'}
        buttonColor={'#ED3648'}
        borderColor={'#ED3648'}
        borderWidth={1}
        hasPadding
        onPress={value => setGroup(value)}
      />
      <ScrollView style={{marginTop: 20, backgroundColor: 'white'}}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>일정 이름 입력</Text>
          <CustomSearchInput
            placeholder="이름"
            ref={scheduleName}
            keyboardType="text"
            returnKeyType="next"
            onChangeText={createChangeTextHandler('scheduleName')}
            hasMarginBottom
          />
          <Text style={styles.sectionTitle}>날짜</Text>
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.sectionTitle}>
                {date.getFullYear()}-{date.getMonth()}-{date.getDate()}
              </Text>
              <TouchableOpacity
                style={{marginLeft: 20}}
                onPress={() => showMode('date')}>
                <Icon name={'calendar-today'} size={24} color={'black'} />
              </TouchableOpacity>
            </View>

            <View style={styles.itemRight}>
              <Text style={styles.sectionTitle}>
                {date.getHours()}:{date.getMinutes()}
              </Text>
              <TouchableOpacity onPress={() => showMode('time')}>
                <Icon name={'access-time'} size={24} color={'black'} />
              </TouchableOpacity>
            </View>
          </View>

          {show && (
            <DatePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <Text style={styles.sectionTitle}>출발지 입력</Text>
          <CustomSearchInput
            placeholder="출발지"
            ref={start}
            keyboardType="text"
            returnKeyType="next"
            onChangeText={createChangeTextHandler('start')}
            hasMarginBottom
          />
          <Text style={styles.sectionTitle}>도착지 입력</Text>
          <CustomSearchInput
            placeholder="도착지"
            ref={end}
            returnKeyType="next"
            onChangeText={createChangeTextHandler('end')}
          />
          <FindButton placeData={placeData} Date={date} />
          {isGroup && (
            <View style={{marginTop: 10}}>
              <Text style={styles.sectionTitle}>친구 추가</Text>
              <TouchableOpacity style={styles.friendBox}></TouchableOpacity>
            </View>
          )}
          {route && (
            <>
              <Text>현재 입력된 정보</Text>
              <Text style={styles.sectionTitle}>
                {route.params.sourceName}{' '}
                <Icon name={'arrow-forward'} size={10} color={'black'} />
                {route.params.destName}
              </Text>
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttons}>
        <ScheduleSubmitButton
          title={secondaryTitle}
          onPress={onSecondaryButtonPress}
        />
        <ScheduleSubmitButton title={primaryTitle} onPress={selectPress} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 15,
    paddingVertical: 10,
    borderRadius: 15,
    flexDirection: 'row',
    marginBottom: 30,
    borderColor: '#ED3648',
    borderWidth: 2,
  },
  tasksWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'row',
    flewWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  itemRight: {
    flex: 1,
    flexDirection: 'row',
    flewWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    flex: 1,
  },
  friendBox: {
    borderColor: '#bdbdbd',
    paddingHorizontal: 16,
    borderRadius: 15,
    height: 48,
    backgroundColor: 'white',
    borderColor: '#ED3648',
    borderWidth: 2,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    height: 30,
    alignItems: 'baseline',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});

export default PlaceinputForm;
