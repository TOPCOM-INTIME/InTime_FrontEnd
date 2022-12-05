import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useUserContext} from '../contexts/UserContext';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@env';

const ScheduleItem = props => {
  const navigation = useNavigation();
  const {user, setUser} = useUserContext();
  const [isEnabled, setisEnabled] = useState(true);
  const [status, setStaus] = useState('PRE');
  const [show, setshow] = useState(false);
  const toggleSwitch = () => {
    setisEnabled(previousState => !previousState);
  };
  // console.log('what data came as item', props.data);
  const NAME = props.data.name;
  const date = new Date(props.data.readyTime);
  const endplace = props.data.destName;
  const startplace = props.data.sourceName;
  const ID = props.data.id;
  const endTime = new Date(props.data.endTime);
  const startTime = new Date(props.data.startTime);
  let isSelected = false;
  console.log(false);
  let isGroup;
  const PUSHDATA = {
    ID: props.data.schedulePoolId,
    startTime: new Date(props.data.readyTime),
    endTime: new Date(props.data.endTime),
  };

  if (props.data.schedulePoolId) {
    isGroup = true;
  } else {
    isGroup = false;
  }

  const findAlert = () => {
    Alert.alert('', '진행중인 일정만 위치를 확인할 수 있습니다.');
  };

  function statusPrint() {
    if (status === 'ING' || status === 'END') {
      return (
        <View>
          <TouchableOpacity
            onPress={() => navigation.push('ScheduleandMap', PUSHDATA)}>
            <Text style={{color: 'black'}}>위치 보기</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <>
          <TouchableOpacity onPress={() => findAlert()}>
            <Text style={{color: 'black'}}>위치 보기</Text>
          </TouchableOpacity>
        </>
      );
    }
  }

  function print() {
    if (status === 'ING') {
      return <Text style={{color: 'black'}}>진행중</Text>;
    } else if (status === 'PRE') {
      return <Text style={{color: 'black'}}>예정</Text>;
    } else if (status === 'END') {
      return <Text style={{color: 'black'}}>종료</Text>;
    }
  }

  function printButton() {
    if (show) {
      return (
        <Icon
          name={'keyboard-arrow-down'}
          size={24}
          color={isSelected ? 'white' : 'black'}
        />
      );
    } else {
      return (
        <Icon
          name={'keyboard-arrow-right'}
          size={24}
          color={isSelected ? 'white' : 'black'}
        />
      );
    }
  }

  const OnButtonPress = () => {
    setshow(!show);
  };

  useEffect(() => {
    const NOW = new Date();
    const timer = date - NOW;
    const ENDTIMER = endTime - NOW;
    if (endTime <= NOW) {
      setStaus('END');
    } else if (date <= NOW) {
      setStaus('ING');
      let timeout = setTimeout(() => setStaus('END'), ENDTIMER);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      let timeout = setTimeout(() => setStaus('ING'), timer);
      let timeout2 = setTimeout(() => setStaus('END'), ENDTIMER);
      return () => {
        clearTimeout(timeout);
        clearTimeout(timeout2);
      };
    }
  }, []);

  return (
    <>
      <View style={styles.item}>
        {NAME && (
          <View style={styles.itemName}>
            <Text style={styles.textPlace}>{NAME}</Text>
          </View>
        )}
        <View style={styles.itemName}>
          <Text style={styles.textPlace}>{startplace}</Text>
          <Icon name={'arrow-forward'} size={10} color={'black'} />
          <Text style={styles.textPlace}>{endplace}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.itemDate}>
            <Text style={styles.itemMonthDay}>
              {String(date.getMonth() + 1).padStart(2, '0')}/
              {String(date.getDate()).padStart(2, '0')}
            </Text>
            <Text style={styles.itemTime}>
              {String(date.getHours()).padStart(2, '0')}:
              {String(date.getMinutes()).padStart(2, '0')}
            </Text>
            <Text style={styles.itemMonthDay}>준비 시작</Text>
          </View>
          <View style={styles.itemDate}>
            <Text style={styles.itemMonthDay}>
              {String(startTime.getMonth() + 1).padStart(2, '0')}/
              {String(startTime.getDate()).padStart(2, '0')}
            </Text>
            <Text style={styles.itemTime}>
              {String(startTime.getHours()).padStart(2, '0')}:
              {String(startTime.getMinutes()).padStart(2, '0')}
            </Text>
            <Text style={styles.itemMonthDay}>출발 시작</Text>
          </View>

          <View style={styles.itemDate}>
            <Text style={styles.itemMonthDay}>
              {String(endTime.getMonth() + 1).padStart(2, '0')}/
              {String(endTime.getDate()).padStart(2, '0')}
            </Text>
            <Text style={styles.itemTime}>
              {String(endTime.getHours()).padStart(2, '0')}:
              {String(endTime.getMinutes()).padStart(2, '0')}
            </Text>
            <Text style={styles.itemMonthDay}>도착 예정</Text>
          </View>
        </View>
        <View style={styles.itemButtom}>{print()}</View>

        <View style={styles.itemButtom}>
          <TouchableOpacity style={styles.itemDetail}>
            <Text style={styles.itemMonthDay} onPress={OnButtonPress}>
              자세히 보기
            </Text>
            {printButton()}
          </TouchableOpacity>
          {isGroup && statusPrint()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 20,
    background: 'white',
    padding: 15,
    paddingVertical: 20,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderColor: '#6c757d',
    borderWidth: 2,
    // backgroundColor: 'red',
  },
  itemDate: {
    flex: 1,
    flexDirection: 'column',
    flewWrap: 'wrap',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  itemMonthDay: {
    color: 'black',
  },
  itemDetail: {
    flexDirection: 'row',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  itemTime: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
  itemPlace: {
    flex: 1,
    flexDirection: 'column',
    flewWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  itemName: {
    flexDirection: 'row',
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  itemButtom: {
    flexDirection: 'row',
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  itemTitle: {
    flexDirection: 'row',
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  friendBox: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 132,
    height: 30,
    background: 'white',
    borderColor: '#ED3648',
    borderWidth: 1,
    borderRadius: 15,
  },
  textPlace: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    flexWrap: 'wrap',
  },
  toggleSwitch: {
    marginTop: 15,
  },
});
export default ScheduleItem;
