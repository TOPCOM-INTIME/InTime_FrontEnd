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
  const endKey = [encodeURI(endplace)];
  let tmpDate = new Date(date);
  let isSelected = false;
  let isGroup;
  const PUSHDATA = {
    ID: props.data.schedulePoolId,
    startTime: new Date(props.data.readyTime),
    endTime: new Date(props.data.endTime),
  };

  const END_PUSHDATA = {
    ID: props.data.schedulePoolId,
    startTime: new Date(props.data.readyTime),
    endTime: new Date(props.data.endTime),
  };

  const endData = {
    endX: 0,
    endY: 0,
  };

  const patterns = props.data.patterns;
  let start = date;
  function calTime(time) {
    tmpDate.setSeconds(tmpDate.getSeconds() + time);
    return tmpDate;
  }

  async function findPlace() {
    const optionsEnd = {
      method: 'GET',
      headers: {
        appKey: 'l7xx67fb6edf4df64a82a1a889e87430c919',
        Accept: 'application/json',
      },
    };
    try {
      const response2 = await fetch(
        `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${endKey}&searchType=all&searchtypCd=A&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&page=1&count=20&multiPoint=N&poiGroupYn=N`,
        optionsEnd,
      );
      const data2 = await response2.json();
      END_PUSHDATA.endX = data2.searchPoiInfo.pois.poi[0]['frontLon'];
      END_PUSHDATA.endY = data2.searchPoiInfo.pois.poi[0]['frontLat'];
      console.log(END_PUSHDATA, 'PUSHED');
      navigation.push('ScheduleandMap', END_PUSHDATA);
    } catch (e) {
      console.log(e);
    }
  }

  function printTime() {
    console.log(patterns.length);
    const result = [];
    for (let i = 0; i < patterns.length; i++) {
      result.push(
        <View key={i} style={styles.pattern}>
          <View style={styles.patternDetail}>
            <Text style={styles.patternText}>
              {String(tmpDate.getHours()).padStart(2, '0')}:
              {String(tmpDate.getMinutes()).padStart(2, '0')}
            </Text>
            <Text style={styles.patternText}> {patterns[i].name} 시작</Text>
          </View>
        </View>,
      );
      calTime(patterns[i].time);
    }
    return result;
  }

  function showPatterns() {
    console.log(patterns);
    if (patterns.length === 0) {
      return <Text style={styles.itemMonthDay}>설정된 패턴이 없습니다</Text>;
    } else {
      return (
        <>
          {printTime()}
          <View style={styles.patternDetail}>
            <Text style={styles.startText}>
              {String(startTime.getHours()).padStart(2, '0')}:
              {String(startTime.getMinutes()).padStart(2, '0')}
            </Text>
            <Text style={styles.startText}>출발</Text>
          </View>
        </>
      );
    }
  }

  if (props.data.schedulePoolId) {
    isGroup = true;
  } else {
    isGroup = false;
  }

  const findAlert = () => {
    Alert.alert('', '진행중인 일정만 위치를 확인할 수 있습니다.');
  };

  function statusPrint() {
    if (status === 'END') {
      return (
        <TouchableOpacity onPress={() => findPlace()}>
          <Text style={{color: 'black'}}>결과 보기</Text>
        </TouchableOpacity>
      );
    } else if (status === 'ING') {
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
    // console.log(show, '클릭');
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
        {show && showPatterns()}
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
  pattern: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  patternDetail: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 4,

    // backgroundColor: 'red',
  },
  patternText: {
    color: 'black',
    marginLeft: 10,
  },
  startText: {
    color: 'black',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
export default ScheduleItem;
