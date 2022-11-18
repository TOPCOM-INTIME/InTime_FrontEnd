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
  const [isEnabled, setisEnabled] = useState(true);
  const toggleSwitch = () => {
    setisEnabled(previousState => !previousState);
  };
  console.log('what data came as item', props.data);
  const NAME = props.data.name;
  const date = new Date(props.data.time);
  const endplace = props.data.destName;
  const startplace = props.data.sourceName;
  const status = props.data.status;
  console.log(status);

  return (
    <>
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
          {NAME && (
            <Text style={{fontWeight: 'bold', color: 'black'}}>{NAME}</Text>
          )}

          <Text style={styles.itemName}>
            {startplace}
            <Icon name={'arrow-forward'} size={10} color={'black'} />
            {endplace}
          </Text>
          <TouchableOpacity style={styles.friendBox}></TouchableOpacity>
        </View>
        <View style={styles.itemDate}>
          {/* <Switch
            style={styles.toggleSwitch}
            trackColor={{false: 'grey', true: '#ED3648'}}
            thumbColor={isEnabled ? '#f4fef4' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          /> */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginLeft: 30,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text>진행중</Text>
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
    fontWeight: 'bold',
  },
  itemName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
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
