import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';


function FindButton({placeData,isFind,loading}){
  const navigation = useNavigation();
  const primaryTitle ='찾기';
  const secondaryTitle = '취소';  

  const onPrimaryButtonPress = () => {
    console.log("button",placeData.start, placeData.end)
    navigation.push('CarScreen',{
    start: placeData.start, end:placeData.end})
  };

  const onSecondaryButtonPress = () => {
      navigation.goBack();
  };

  
 return (
  <View style={styles.buttons}>
    <CustomButton style={styles.buttons} title={primaryTitle} hasMarginBottom onPress={onPrimaryButtonPress}/>
    <CustomButton
      title={secondaryTitle}
      theme="secondary"
      onPress={onSecondaryButtonPress}
    />
  </View>
);

}

const styles = StyleSheet.create({
    buttons: {
      flexDirection : 'column',
      marginTop: 64,
    },
    spinnerWrapper: {
      marginTop: 64,
      height: 104,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default FindButton