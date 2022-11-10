import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function GroupListItem({group, onPress}) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.block,
        Platform.OS === 'ios' && pressed && {backGroundColor: '#efefef'},
      ]}
      onPress={onPress}
      android_ripple={{color: '#ededed'}}>
      <Text style={styles.title}>{group.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    backGroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderColor: '#ee2f48',
    borderWidth: 3,
    marginHorizontal: 20,
    marginVertical: 5,

    borderRadius: 30,
  },
  date: {
    fontSize: 12,
    color: '546e7a',
    marginBottom: 8,
  },
  title: {
    color: '#263238',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    color: '#37474f',
    fontSize: 16,
    lineHeight: 21,
  },
});

export default GroupListItem;
