import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Box, IconButton} from '@react-native-material/core';
import {Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useLogContext} from '../contexts/LogContext';

function AdBanner({move}) {
  const [wait, setWait] = useState(true);
  const {setIsLoading} = useLogContext();
  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 3000);
  });

  const closeHandler = () => {
    setIsLoading(false);
    move();
  };

  return (
    <View style={styles.flex}>
      {wait ? (
        <ActivityIndicator size="large" color="white" style={styles.close} />
      ) : (
        <IconButton
          icon={props => <Icon name="close" {...props} />}
          color="white"
          onPress={closeHandler}
          style={styles.close}
        />
      )}
      <Image source={require('../assets/ad.png')} style={styles.img} />
    </View>
  );
}

export default AdBanner;

const styles = StyleSheet.create({
  flex: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10000, // works on ios
    width: '100%',
    height: '100%',
    // elevation: 3, // works on androids
  },
  img: {width: 320, height: 480, opacity: 1},
  close: {position: 'relative', left: 150},
});
