import React, {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, TextInput, VStack} from '@react-native-material/core';
import CustomSearchInput from './CustomSearchInput';
import DatePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SwitchSelector from 'react-native-switch-selector';
import FindButton from '../components/FindButton';
import ScheduleSubmitButton from './ScheduleSubmitButton';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';
import {AppBar, IconButton} from '@react-native-material/core';
import {API_URL} from '@env';
import LoadingBar from './LoadingBar';
import {useLogContext} from '../contexts/LogContext';
function PlaceinputForm({
  data,
  setData,
  setDate,
  busTime,
  setBus,
  OdsayData,
  setOdsayData,
  checkGroup,
  setcheckGroup,
  friendList,
  setfriendList,
  INVITE,
  isCar,
  setCarTime,
  CarTime,
  usernameList,
  CarData,
  setCarData,
  WalkData,
  setWalkData,
}) {
  const navigation = useNavigation();
  const name = useRef();
  const start = useRef();
  const end = useRef();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isGroup, setGroup] = useState(false);
  const [nowDate, setcurrentDate] = useState(new Date());
  const {user, setUser} = useUserContext();
  const {isLoading, setIsLoading} = useLogContext();
  const primaryTitle = '저장';
  const secondaryTitle = '취소';
  const setTime = time => {
    let setTime = new Date(time);
    setTime.setSeconds(0);
    return setTime;
  };
  // console.log('친구리스트', INVITE);
  // console.log('데이터', data.time);

  // 개인이나 단체를 정하는 토글
  const options = [
    {label: '개인', value: false},
    {label: '단체', value: true},
  ];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || nowDate;
    setShow(Platform.OS === 'ios');
    setData('endTime')(setTime(currentDate));
  };

  const TimeAlert = () => {
    Alert.alert('오류', '지난 날짜는 설정할 수 없습니다');
  };

  //DatePicker 출력
  const showMode = currentMode => {
    if (!INVITE) {
      setShow(true);
      setMode(currentMode);
    } else {
      Alert.alert('오류', '초대 받은 일정의 날짜는 수정할 수 없습니다');
    }
  };
  const onSecondaryButtonPress = () => {
    setData('startTime')(0);
    navigation.pop();
  };

  const setendTime = () => {
    if (data.time === 0) {
      console.log(data);
      Alert.alert('출발과 도착을 입력해라');
    } else {
      let tmpDate = new Date(data.endTime);
      tmpDate.setSeconds(tmpDate.getSeconds() - data.time);
      setData('startTime')(tmpDate);
      navigation.push('SelectPattern');
    }
  };

  const selectPress = async () => {
    if (nowDate > data.endTime) {
      TimeAlert();
    } else {
      setendTime();
    }
  };

  const OnFriendBox = () => {
    navigation.push('GroupScheduleFriend');
  };

  const OnSwitchChange = value => {
    if (INVITE !== 1) {
      setcheckGroup(value);
    }
  };

  function whenInvite() {
    if (INVITE) {
      return (
        <View style={styles.inviteBox}>
          <Text>{`${data.destName}`}</Text>
        </View>
      );
    } else {
      return (
        <TextInput
          label="도착지"
          variant="outlined"
          returnKeyType="next"
          onChangeText={setData('destName')}
          value={data.destName}
          onSubmitEditing={() => {
            end.current.focus();
          }}
          disabled={INVITE ? true : false}
          color="#6c757d"
          backgroundColor="white"
        />
      );
    }
  }

  return (
    <>
      {isLoading && <LoadingBar />}

      <AppBar
        title="일정 생성"
        titleStyle={{fontFamily: 'NanumSquareRoundEB'}}
        centerTitle={true}
        color="#6c757d"
        tintColor="white"
      />
      <SwitchSelector
        options={options}
        initial={INVITE}
        selectedColor={'white'}
        buttonColor={'#6c757d'}
        borderColor={'#6c757d'}
        borderRadius={2}
        borderWidth={1}
        value={INVITE}
        hasPadding
        onPress={value => OnSwitchChange(value)}
        disabled={INVITE ? true : false}
      />
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.tasksWrapper}>
          <VStack spacing={10} mt={15} mh={'5%'}>
            <Text style={styles.sectionTitle}>일정 이름 입력</Text>
            <TextInput
              label="일정 이름"
              variant="outlined"
              returnKeyType="next"
              onChangeText={setData('name')}
              value={data.name}
              onSubmitEditing={() => {
                name.current.focus();
              }}
              color="#6c757d"
              backgroundColor="white"
            />
          </VStack>

          <VStack spacing={10} mt={15} mh={'5%'}>
            <Text style={styles.sectionTitle}>날짜</Text>
            <View style={styles.item}>
              <View style={styles.itemRight}>
                <Text style={styles.sectionTitle}>
                  {data.endTime.getFullYear()}-
                  {String(data.endTime.getMonth() + 1).padStart(2, '0')}-
                  {String(data.endTime.getDate()).padStart(2, '0')}
                </Text>
                <TouchableOpacity
                  style={{marginLeft: 20}}
                  onPress={() => showMode('date')}>
                  <Icon name={'calendar-today'} size={24} color={'black'} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.itemRight}>
                <Text style={styles.sectionTitle}>
                  {String(data.endTime.getHours()).padStart(2, '0')}:
                  {String(data.endTime.getMinutes()).padStart(2, '0')}
                </Text>
                <TouchableOpacity onPress={() => showMode('time')}>
                  <Icon name={'access-time'} size={24} color={'black'} />
                </TouchableOpacity>
              </View>
            </View>
          </VStack>

          {show && (
            <DatePicker
              testID="dateTimePicker"
              value={data.endTime}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              disabled={INVITE ? true : false}
            />
          )}
          <VStack spacing={10} mt={15} mh={'5%'}>
            <Text style={styles.sectionTitle}>출발지 입력</Text>
            <TextInput
              label="출발지"
              variant="outlined"
              returnKeyType="next"
              onChangeText={setData('sourceName')}
              value={data.sourceName}
              onSubmitEditing={() => {
                start.current.focus();
              }}
              color="#6c757d"
              backgroundColor="white"
            />
            <Text style={styles.sectionTitle}>도착지 입력</Text>
            {whenInvite()}
          </VStack>
          <FindButton
            data={data}
            setData={setData}
            busTime={busTime}
            setBus={setBus}
            OdsayData={OdsayData}
            setOdsayData={setOdsayData}
            setCarTime={setCarTime}
            setCarData={setCarData}
            CarData={CarData}
            setWalkData={setWalkData}
            WalkData={WalkData}
          />
          {checkGroup && (
            <VStack spacing={10} mt={15} mh={'5%'}>
              <Text style={styles.sectionTitle}>친구 초대</Text>
              <TouchableOpacity style={styles.friendBox} onPress={OnFriendBox}>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  친구 추가/삭제하기
                </Text>
              </TouchableOpacity>
              <Text style={styles.sectionTitle}>추가한 친구들</Text>
              {usernameList.map(item => (
                <TouchableOpacity style={styles.firendlist} key={item}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </VStack>
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
    borderRadius: 3,
    flexDirection: 'row',
    marginBottom: 30,
    borderColor: '#6c757d',
    borderWidth: 1,
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    flex: 1,
  },
  friendBox: {
    paddingHorizontal: 16,
    borderRadius: 2,
    height: 40,
    backgroundColor: 'white',
    borderColor: '#6c757d',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    height: 60,
    alignItems: 'center',
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
  firendlist: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    borderRadius: 2,
    height: 40,
    backgroundColor: 'white',
    borderColor: '#6c757d',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteBox: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 15,
    paddingVertical: 15,
    borderRadius: 3,
    flexDirection: 'row',
    marginBottom: 10,
    borderColor: '#6c757d',
    borderWidth: 1,
  },
});

export default PlaceinputForm;
