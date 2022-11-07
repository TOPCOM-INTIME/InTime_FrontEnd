import React from 'react';
import {Platform, Pressable, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function PatternListItem({log}) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('write', {
      log,
    });
  };

  return (
    <Pressable
      style={({pressed}) => [
        styles.block,
        Platform.OS === 'ios' && pressed && {backGroundColor: '#efefef'},
      ]}
      onPress={onPress}
      android_ripple={{color: '#ededed'}}>
      <Text style={styles.title}>{log.title}</Text>
      <Text style={styles.body}>{log.time}분</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    backGroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
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

export default PatternListItem;
