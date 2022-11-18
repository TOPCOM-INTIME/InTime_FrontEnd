import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';

function ButtonCarTime({setData}) {
  const navigation = useNavigation();
  const primaryTitle = '확인';
  const secondaryTitle = '취소';

  const onPrimaryButtonPress = () => {
    navigation.pop();
  };
  const onSecondaryButtonPress = () => {
    navigation.pop();
    setData('time')(0);
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
