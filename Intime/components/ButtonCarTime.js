import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';

function ButtonCarTime({data, setData, busTime, setBus, isCar, CarTime}) {
  const navigation = useNavigation();
  const primaryTitle = '확인';
  const secondaryTitle = '취소';

  const setTime = time => {
    console.log(time);
    let setTime = new Date(time);
    setTime.setSeconds(0);
    return setTime;
  };

  const onPrimaryButtonPress = () => {
    if (isCar) {
      // setData('startTime')(setTime(data.startTime));
      console.log('차', CarTime);
      setData('time')(CarTime);
      navigation.pop();
    } else {
      if (busTime === 0) {
        Alert.alert('오류', '대중교통을 선택해주세요');
      } else {
        // setData('time')(totalTime);
        console.log('버스', busTime);
        // setData('startTime')(setTime(busTime));
        navigation.pop();
      }
    }
  };
  const onSecondaryButtonPress = () => {
    navigation.pop();
    setData('time')(0);
    setBus(0);
  };

  // if (isCar) {
  //   console.log('차시간 안바뀜', data.startTime);
  // } else {
  //   console.log('버스', busTime);
  // }
  return (
    <View style={styles.buttons}>
      <CustomButton
        title={primaryTitle}
        onPress={onPrimaryButtonPress}
        hasMarginBottom
      />
      <CustomButton
        title={secondaryTitle}
        theme="secondary"
        onPress={onSecondaryButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 64,
  },
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonCarTime;
