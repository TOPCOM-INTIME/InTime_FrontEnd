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
import BusSubpath from './BusSubpath';
const BusTimeItem = props => {
  const [show, setshow] = useState(false);
  const subPath = props.Busdata.subPath;
  const totalTime = props.Busdata.info.totalTime;
  let isSelected = false;
  if (props.id === props.selectedItem) {
    isSelected = true;
  } else {
    isSelected = false;
  }
  const selectedColor = isSelected ? '#6c757d' : 'white';
  const selectedTextColor = isSelected ? 'white' : 'black';

  function printTime(time) {
    if (time > 60) {
      return (
        <Text
          style={{
            color: isSelected ? 'white' : 'black',
            margin: 10,
            padding: 10,
            fontSize: 24,
          }}>
          {parseInt(time / 60)}시간 {time % 60}분
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            color: isSelected ? 'white' : 'black',
            margin: 10,
            padding: 10,
            fontSize: 24,
          }}>
          {time}분{' '}
        </Text>
      );
    }
  }

  function printButton() {
    if (show) {
      return (
        <Icon
          name={'keyboard-arrow-down'}
          size={27}
          color={isSelected ? 'white' : 'black'}
        />
      );
    } else {
      return (
        <Icon
          name={'keyboard-arrow-right'}
          size={27}
          color={isSelected ? 'white' : 'black'}
        />
      );
    }
  }

  const OnButtonPress = () => {
    setshow(!show);
  };

  return (
    <>
      <View style={styles.item}>
        <View style={styles.beforeShow} backgroundColor={selectedColor}>
          {printTime(totalTime)}
          <TouchableOpacity onPress={OnButtonPress}>
            <View style={styles.button}>{printButton()}</View>
          </TouchableOpacity>
        </View>
        {show && <BusSubpath data={subPath} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  item: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'column',
    borderColor: '#6c757d',
    borderWidth: 2,
    justifyContent: 'space-between',
  },
  text: {
    margin: 10,
    padding: 10,
    fontSize: 24,
    color: 'black',
  },
  selectedText: {
    margin: 10,
    padding: 10,
    fontSize: 24,
    color: 'white',
  },
  beforeShow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#ED3648',
    borderRadius: 13,
  },
  button: {
    marginRight: 10,
    justifyContent: 'center',
  },
});
export default BusTimeItem;
