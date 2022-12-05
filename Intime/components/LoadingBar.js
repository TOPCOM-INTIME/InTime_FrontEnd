import React from 'react';
import {ActivityIndicator, Box} from '@react-native-material/core';
import {StyleSheet, View} from 'react-native';

function LoadingBar() {
  return (
    <View style={styles.flex}>
      <ActivityIndicator style={{zIndex: 2, opacity: 1}} />
    </View>
  );
}

export default LoadingBar;

const styles = StyleSheet.create({
  flex: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 1, // works on ios
    width: '100%',
    height: '100%',
    // elevation: 3, // works on androids
  },
});
