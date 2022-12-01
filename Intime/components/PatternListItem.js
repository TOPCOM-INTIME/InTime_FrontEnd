import React from 'react';
import {Platform, Pressable, StyleSheet, Text, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ListItem} from '@react-native-material/core';

function PatternListItem({log, isCreatingGroup, setGroup}) {
  const navigation = useNavigation();
  const onLongPress = () => {
    navigation.navigate('write', {log});
  };

  const onPress = () => {
    setGroup(group => {
      if (group.find(el => el.id === log.id)) {
        return group.filter(el => el.id !== log.id);
      }
      return group.concat(log);
    });
  };

  if (isCreatingGroup === 1) {
    return (
      <ListItem
        // style={({pressed}) => [
        //   styles.block,
        //   Platform.OS === 'ios' && pressed && {backGroundColor: '#efefef'},
        // ]}
        android_ripple={{color: '#ededed'}}
        title={log.name}
        secondaryText={
          log.time >= 60
            ? `${parseInt(log.time / 60)}분 ${log.time % 60}초`
            : `${log.time % 60}초`
        }
      />
    );
  } else if (isCreatingGroup === 2) {
    return (
      <ListItem
        // style={({pressed}) => [
        //   styles.block,
        //   Platform.OS === 'ios' && pressed && {backGroundColor: '#efefef'},
        // ]}
        onPress={onPress}
        android_ripple={{color: '#ededed'}}
        title={log.name}
        secondaryText={
          log.time >= 60
            ? `${parseInt(log.time / 60)}분 ${log.time % 60}초`
            : `${log.time % 60}초`
        }
      />
    );
  }
  return (
    <ListItem
      // style={({pressed}) => [
      //   styles.block,
      //   Platform.OS === 'ios' && pressed && {backGroundColor: '#efefef'},
      // ]}
      onLongPress={onLongPress}
      android_ripple={{color: '#ededed'}}
      title={log.name}
      secondaryText={
        log.time >= 60
          ? `${parseInt(log.time / 60)}분 ${log.time % 60}초`
          : `${log.time % 60}초`
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
  },
  body: {
    color: '#37474f',
    fontSize: 10,
    // lineHeight: 21,
  },
});

export default PatternListItem;
