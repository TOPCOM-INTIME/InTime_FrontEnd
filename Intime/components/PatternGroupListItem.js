import React from 'react';
import {Platform, Pressable, StyleSheet, Text, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function PatternGroupListItem({log, isCreatingGroup, setGroup}) {
  const navigation = useNavigation();

  const onPress = () => {
    setGroup(log.patterns);
  };

  const time = log.patterns.reduce((a, b) => a + b.time, 0);

  return (
    <Pressable
      style={({pressed}) => [
        styles.block,
        Platform.OS === 'ios' && pressed && {backGroundColor: '#efefef'},
      ]}
      onPress={onPress}
      android_ripple={{color: '#ededed'}}>
      <Text style={styles.title}>{log.name}</Text>
      <Text style={styles.body}>
        {parseInt(time / 60)}분 {time % 60}초
      </Text>
    </Pressable>
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
