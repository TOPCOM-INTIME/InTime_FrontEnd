import React, {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import CustomSearchInput from './CustomSearchInput';
import DatePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SwitchSelector from 'react-native-switch-selector';
import FindButton from '../components/FindButton';
import ScheduleSubmitButton from './ScheduleSubmitButton';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';

function PlaceinputForm({data, setData, setDate, busTime, setBus}) {
  console.log('데이터', data);
  const navigation = useNavigation();
  const name = useRef();
  const start = useRef();
  const end = useRef();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isGroup, setGroup] = useState(false);

  const primaryTitle = '저장';
  const secondaryTitle = '취소';

  // 개인이나 단체를 정하는 토글
  const options = [
    {label: '개인', value: false},
    {label: '단체', value: true},
  ];
  //토글 값 변경
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data.endTime;
    setShow(Platform.OS === 'ios');
    setData('endTime')(currentDate);
  };

  //DatePicker 출력
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const onSecondaryButtonPress = () => {
    // setData('time')(0);
    navigation.pop();
  };

  const selectPress = () => {
    if (data.time === 0) {
      Alert.alert('출발과 도착을 입력해라');
    } else {
      navigation.push('SelectPattern');
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
          <TextInput
            style={styles.input}
            placeholder="이름"
            ref={name}
            keyboardType="text"
            returnKeyType="next"
            onChangeText={setData('name')}
            value={data.name}
          />

          <Text style={styles.sectionTitle}>날짜</Text>
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Text style={styles.sectionTitle}>
                {data.endTime.getFullYear()}-{data.endTime.getMonth()}-
                {data.endTime.getDate()}
              </Text>
              <TouchableOpacity
                style={{marginLeft: 20}}
                onPress={() => showMode('date')}>
                <Icon name={'calendar-today'} size={24} color={'black'} />
              </TouchableOpacity>
            </View>

            <View style={styles.itemRight}>
              <Text style={styles.sectionTitle}>
                {data.endTime.getHours()}:{data.endTime.getMinutes()}
              </Text>
              <TouchableOpacity onPress={() => showMode('time')}>
                <Icon name={'access-time'} size={24} color={'black'} />
              </TouchableOpacity>
            </View>
          </View>

          {show && (
            <DatePicker
              testID="dateTimePicker"
              value={data.endTime}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <Text style={styles.sectionTitle}>출발지 입력</Text>
          <TextInput
            style={styles.input}
            placeholder="출발지"
            ref={start}
            keyboardType="text"
            returnKeyType="next"
            onChangeText={setData('sourceName')}
            value={data.sourceName}
            hasMarginBottom
          />
          <Text style={styles.sectionTitle}>도착지 입력</Text>
          <TextInput
            style={styles.input}
            placeholder="도착지"
            ref={end}
            value={data.destName}
            returnKeyType="next"
            onChangeText={setData('destName')}
          />
          <FindButton
            data={data}
            setData={setData}
            busTime={busTime}
            setBus={setBus}
          />
          {isGroup && (
            <View style={{marginTop: 10}}>
              <Text style={styles.sectionTitle}>친구 추가</Text>
              <TouchableOpacity style={styles.friendBox}></TouchableOpacity>
            </View>
          )}
          {data.time !== 0 && (
            <>
              {/* <Text>현재 입력된 정보</Text> */}
              <Text style={styles.sectionTitle}>
                {data.sourceName}{' '}
                <Icon name={'arrow-forward'} size={10} color={'black'} />{' '}
                {data.destName}
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
  input: {
    paddingHorizontal: 16,
    borderRadius: 15,
    height: 48,
    backgroundColor: 'white',
    borderColor: '#ED3648',
    borderWidth: 2,
    color: 'black',
    marginBottom: 20,
  },
});

export default PlaceinputForm;
