import React from 'react';
import {StyleSheet, View, Pressable, Text, Platform} from 'react-native';
import TransparentCircleButton from './TransparentCircleButton';
import {useNavigation} from '@react-navigation/native';

function ScheduleAddButton() {
  const navigation = useNavigation();
  const onSubmit = () => {
    navigation.navigate('ScheduleScreen');
  };
  return (
    <View styles={styles.button}>
      <TransparentCircleButton onPress={onSubmit} name="add" color="#424242" />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
export default ScheduleAddButton;
