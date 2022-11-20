import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';

function ButtonCarTime({data, setData, busTime, setBus, isCar}) {
  const navigation = useNavigation();
  const primaryTitle = '확인';
  const secondaryTitle = '취소';
  const onPrimaryButtonPress = () => {
    if (isCar) {
      setData('startTime')(data.startTime);
    } else {
      setData('startTime')(busTime);
    }
    navigation.pop();
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
