import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function GroupListItem({item, group, onPress}) {
  return (
    <Pressable
      style={[styles.block, group?.id === item.id && styles.active]}
      // style={styles.block, }
      // style={({pressed}) => [
      //   styles.block,
      //   Platform.OS === 'ios' && pressed && {backGroundColor: '#efefef'},
      //   group?.id === item.id ? styles.active : '',
      // ]}
      // android_ripple={{color: '#ededed'}}>
      onPress={() => onPress(item)}>
      <Text style={group?.id === item.id ? styles.activeTitle : styles.title}>
        {item.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    backGroundColor: '#777',
    // flex: 1,
    paddingHorizontal: 5,
    // paddingVertical: 24,
    borderColor: '#ee2f48',
    borderWidth: 1,
    // width: '100%',
    // borderRadius: 10,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    justifyContent: 'center',
    height: 40,
  },
  date: {
    fontSize: 12,
    color: '546e7a',
    marginBottom: 8,
  },
  activeTitle: {
    color: 'white',
  },
  title: {
    color: '#263238',
    fontSize: 13,
    // fontWeight: 'bold',
    // marginBottom: 8,
  },
  body: {
    color: '#37474f',
    fontSize: 16,
    lineHeight: 21,
  },
  active: {
    backgroundColor: '#ee2f48',
  },
});

export default GroupListItem;
