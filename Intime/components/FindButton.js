import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScheduleCustomButton from './ScheduleCustomButton';

function FindButton({placeData, enddate}) {
  const navigation = useNavigation();
  const primaryTitle = '찾기';
  const secondaryTitle = '취소';

  const onPrimaryButtonPress = () => {
    let tmpDate = new Date(enddate);
    console.log('button', placeData.start, placeData.end);
    navigation.push('CarScreen', {
      start: placeData.start,
      end: placeData.end,
      date: tmpDate,
    });
  };

  return (
    <View style={styles.buttons}>
      <ScheduleCustomButton
        style={styles.buttons}
        title={primaryTitle}
        hasMarginBottom
        onPress={onPrimaryButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  spinnerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FindButton;
