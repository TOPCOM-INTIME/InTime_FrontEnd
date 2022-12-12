import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Box,
  IconButton,
  Pressable,
} from '@react-native-material/core';
import {Image, StyleSheet, View, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useLogContext} from '../contexts/LogContext';
import {API_URL} from '@env';
import axios from 'axios';
import {useUserContext} from '../contexts/UserContext';

function AdBanner({move}) {
  const [wait, setWait] = useState(true);
  const {setIsLoading} = useLogContext();
  const [adImage, setAdImage] = useState({});
  const {user} = useUserContext();
  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 3000);
    const fetchData = async () => {
      try {
        const ad = await axios.get(`${API_URL}/api/randomBanner`, {
          headers: {Authorization: user},
        });
        setAdImage(ad.data);
        console.log(ad.data);
      } catch (err) {
        console.log('adERROR');
      }
    };
    fetchData();
  }, [user]);

  const closeHandler = () => {
    setIsLoading(false);
    move();
  };

  const url = API_URL + adImage.fileUrl;
  console.log(url);

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
      {adImage?.fileUrl ? (
        <Pressable
          onPress={() => {
            Linking.openURL(adImage.url);
          }}>
          <Image
            source={{uri: `${API_URL}${adImage.fileUrl}`}}
            style={styles.img}
          />
        </Pressable>
      ) : (
        <View style={[styles.img, styles.white]} />
      )}
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
  white: {backgroundColor: 'white'},
});
