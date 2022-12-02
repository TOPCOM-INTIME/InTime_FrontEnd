import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ListItem} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';

function GroupListItem({item, group, onPress}) {
  console.log('그룹리스트아이템', item);
  console.log('그룹', group);
  console.log('같음?', group?.id === item?.id);
  const time = item.patterns.reduce((a, b) => a + b.time, 0);
  return (
    <ListItem
      onPress={() => onPress(item)}
      title={item.name}
      secondaryText={
        time >= 60
          ? `${parseInt(time / 60)}분 ${time % 60}초`
          : `${time % 60}초`
      }
      trailing={props => {
        if (group?.id === item?.id) {
          return <Icon name="chevron-right" {...props} />;
        } else {
          return <></>;
        }
      }}
    />
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
