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
  let isGroup;
  const PUSHDATA = {
    ID: props.data.id,
    startTime: new Date(props.data.readyTime),
    endTime: new Date(props.data.endTime),
  };

  if (props.data.schedulePoolId) {
    isGroup = true;
  } else {
    isGroup = false;
  }

  const deleteSchedule = async ID => {
    try {
      axios.delete(`${API_URL}/api/schedule/scheduleId=${ID}`, {
        headers: {Authorization: user},
      });
    } catch (e) {
      console.log(`[DELETE_ERROR]${e}`);
    }
  };

  function statusPrint() {
    if (status === 'ING' || status === 'END') {
      return (
        <View>
          <TouchableOpacity
            onPress={() => navigation.push('ScheduleandMap', PUSHDATA)}>
            <Text style={{marginTop: 10, color: 'black'}}>위치보기</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <>
          <TouchableOpacity
            onPress={() => navigation.push('ScheduleCurrent', ID)}>
            <Text style={{marginTop: 10, color: 'black'}}>초대 현황보기</Text>
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
      if (isGroup) {
        setTimeout(() => deleteSchedule(ID), 1000);
      }
      return <Text style={{color: 'black'}}>종료</Text>;
    }
  }

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
        <View style={styles.itemDate}>
          <Text style={styles.itemMonthDay}>
            {String(date.getMonth() + 1).padStart(2, '0')}/
            {String(date.getDate()).padStart(2, '0')}
          </Text>
          <Text style={styles.itemTime}>
            {String(date.getHours()).padStart(2, '0')}:
            {String(date.getMinutes()).padStart(2, '0')}
          </Text>
        </View>

        <View style={styles.itemPlace}>
          {NAME && (
            <Text style={{fontWeight: 'bold', color: 'black'}}>{NAME}</Text>
          )}

          <Text style={styles.itemName}>
            {startplace}
            <Icon name={'arrow-forward'} size={10} color={'black'} />
            {endplace}
          </Text>
          {isGroup && statusPrint()}
        </View>
        <View style={styles.itemDate}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginLeft: 30,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            {print()}
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderColor: '#6c757d',
    borderWidth: 2,
  },
  itemDate: {
    flex: 1,
    flexDirection: 'column',
    flewWrap: 'wrap',
  },
  itemMonthDay: {
    marginLeft: 10,
    color: 'black',
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
    // backgroundColor: 'blue',
  },
  itemName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    // backgroundColor: 'red',
    alignItems: 'center',
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
  toggleSwitch: {
    marginTop: 15,
  },
});
export default ScheduleItem;
