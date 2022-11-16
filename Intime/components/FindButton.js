import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScheduleCustomButton from './ScheduleCustomButton';

function FindButton({placeData, Date}) {
  const navigation = useNavigation();
  const primaryTitle = '찾기';
  const secondaryTitle = '취소';

  const onPrimaryButtonPress = () => {
    console.log('button', placeData.start, placeData.end);
    navigation.push('CarScreen', {
      start: placeData.start,
      end: placeData.end,
      date: Date,
    });
  };

  const onSecondaryButtonPress = () => {
    // navigation.navigate('Placeinput');
  };

  return (
    <View style={styles.buttons}>
      <ScheduleCustomButton
        style={styles.buttons}
        title={primaryTitle}
        hasMarginBottom
        onPress={onPrimaryButtonPress}
      />
      <ScheduleCustomButton
        title={secondaryTitle}
        theme="secondary"
        onPress={onSecondaryButtonPress}
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
