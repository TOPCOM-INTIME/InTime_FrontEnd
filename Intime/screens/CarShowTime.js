import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Platform,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import ButtonCarTime from '../components/ButtonCarTime';
import SwitchSelector from 'react-native-switch-selector';
import Icon from 'react-native-vector-icons/MaterialIcons';

function CarShowTime({data, setData, date, setDate}) {
  const {sourceName, destName} = data;
  const [isBus, setBus] = useState(true);
  console.log('쇼타임', date);
  console.log(isBus);
  const Switchoptions = [
    {
      value: false,
      customIcon: <Icon name={'directions-bus'} size={30} color={'black'} />,
    },
    {
      value: true,
      customIcon: <Icon name={'directions-car'} size={30} color={'black'} />,
    },
  ];

  const showTime = {
    hour: 0,
    leftmin: 0,
    minute: 0,
  };

  function Time(totalTime) {
    console.log('Time');
    showTime.hour = parseInt(totalTime / 3600);
    showTime.leftmin = totalTime % 3600;
    showTime.min = parseInt(showTime.leftmin / 60);
    if (showTime.hour > 0) {
      return (
        <Text style={styles.text}>
          {showTime.hour}시간 {showTime.min}분 걸림
        </Text>
      );
    } else {
      return <Text style={styles.text}>{showTime.min}분 걸림</Text>;
    }
  }

  return (
    <>
      <SwitchSelector
        options={Switchoptions}
        initial={0}
        selectedColor={'white'}
        selectedIconColor={'white'}
        buttonColor={'#ED3648'}
        borderColor={'#ED3648'}
        borderWidth={1}
        hasPadding
        onPress={value => setBus(value)}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.select({ios: 'padding'})}>
        <SafeAreaView style={styles.fullscreen}>
          <Text style={styles.text}>출발지: {sourceName}</Text>
          <Text style={styles.text}>도착지: {destName}</Text>
          {Time(data.time)}
          <View style={styles.form}>
            <ButtonCarTime setData={setData} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default CarShowTime;
