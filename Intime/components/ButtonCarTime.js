import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';

function ButtonCarTime({start, end, startTime, endTime}) {
  const navigation = useNavigation();
  const primaryTitle = '확인';
  const secondaryTitle = '취소';

  const onPrimaryButtonPress = () => {
    console.log('받은 값', startTime, start, end);
    navigation.push('Placinputform', {
      startTime: startTime,
      endTime: endTime,
      sourceName: start,
      destName: end,
    });
  };
  const onSecondaryButtonPress = () => {
    navigation.goBack();
  };

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
