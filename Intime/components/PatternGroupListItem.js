import React from 'react';
import {Platform, Pressable, StyleSheet, Text, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ListItem} from '@react-native-material/core';

function PatternGroupListItem({log, isCreatingGroup, setGroup, data, setData}) {
  const navigation = useNavigation();

  const onPress = () => {
    setGroup(log.patterns);
  };

  const time = log.patterns.reduce((a, b) => a + b.time, 0);

  return (
    <ListItem
      onPress={onPress}
      title={log.name}
      secondaryText={
        time >= 60
          ? `${parseInt(time / 60)}분 ${time % 60}초`
          : `${time % 60}초`
      }
    />
  );
}

const styles = StyleSheet.create({
  block: {
    backGroundColor: 'white',
    paddingHorizontal: 10,
    // paddingVertical: 24,
    borderColor: '#ee2f48',
    borderWidth: 2,
    marginHorizontal: '10%',
    marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    height: 40,
    width: '80%',
  },
  title: {
    color: '#263238',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    color: '#37474f',
    fontSize: 10,
    // lineHeight: 21,
  },
});

export default PatternGroupListItem;
