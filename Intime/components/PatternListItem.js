import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function PatternListItem({log, onPress}) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.block,
        Platform.OS === 'ios' && pressed && {backGroundColor: '#efefef'},
      ]}
      onPress={onPress}
      android_ripple={{color: '#ededed'}}>
      <Text style={styles.title}>{log.title}</Text>
      <Text style={styles.body}>
        {log.minute}분 {log.second}초
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    backGroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 24,
    borderColor: '#ee2f48',
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
  },
  title: {
    color: '#263238',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    color: '#37474f',
    fontSize: 16,
    lineHeight: 21,
  },
});

export default PatternListItem;
