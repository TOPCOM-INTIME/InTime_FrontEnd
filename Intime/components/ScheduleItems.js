import React, {useState} from 'react';
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

const ScheduleItem = props => {
  const {user, setUser} = useUserContext();
  const [forRender, setRender] = useState(0);
  const [isEnabled, setisEnabled] = useState(true);
  const toggleSwitch = () => {
    setisEnabled(previousState => !previousState);
  };
  console.log(props.data);
  const date = new Date(props.data.time);
  const endplace = props.data.destName;
  const startplace = props.data.sourceName;
  const ID = props.data.id;

  const deleteSchedule = async () => {
    try {
      const res = await axios.delete(
        `http://175.45.204.122:8000/api/schedule/scheduleId=${ID}`,
        {
          headers: {Authorization: user},
        },
      );
      setRender(1);
      console.log(forRender);
    } catch (e) {
      console.log(`[ERROR]${e}`);
    }
  };
  const onLongClick = () => {
    Alert.alert('정말로 삭제하시겠습니까?', '', [
      {
        text: '예',
        onPress: () => {
          deleteSchedule();
          console.log(`${ID}deleted`);
        },
      },
      {
        text: '아니오',
        onPress: () => {
          console.log(ID);
        },
      },
    ]);
  };
  return (
    <>
      <TouchableOpacity onLongPress={onLongClick}>
        <View style={styles.item}>
          <View style={styles.itemDate}>
            <Text style={styles.itemMonthDay}>
              {date.getMonth()}/{date.getDate()}
            </Text>
            <Text style={styles.itemTime}>
              {date.getHours()}:{date.getMinutes()}
            </Text>
          </View>

          <View style={styles.itemPlace}>
            <Text style={styles.itemName}>
              {startplace}
              <Icon name={'arrow-forward'} size={10} color={'black'} />
              {endplace}
            </Text>
            <TouchableOpacity style={styles.friendBox}></TouchableOpacity>
          </View>
          <View style={styles.itemDate}>
            <Switch
              style={styles.toggleSwitch}
              trackColor={{false: 'grey', true: '#ED3648'}}
              thumbColor={isEnabled ? '#f4fef4' : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </TouchableOpacity>
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
    borderColor: '#ED3648',
    borderWidth: 4,
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
  },
  itemName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  friendBox: {
    alignItems: 'center',
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
