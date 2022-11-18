import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function GroupListItem({item, group, onPress}) {
  console.log('그룹리스트아이템', item);
  const time = item.patterns.reduce((a, b) => a + b.time, 0);
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
      <Text
        style={[
          group?.id === item.id ? styles.activeTitle : styles.title,
          styles.name,
        ]}>
        {item.name}
      </Text>
      <Text style={[group?.id === item.id && styles.activeTitle, styles.date]}>
        {parseInt(time / 60)}분 {time % 60}초
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  name: {
    fontSize: 15,
  },
  date: {
    fontSize: 12,
    color: 'black',
  },
  activeTitle: {
    color: 'white',
  },
  title: {
    color: '#263238',
    // fontSize: 13,
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
