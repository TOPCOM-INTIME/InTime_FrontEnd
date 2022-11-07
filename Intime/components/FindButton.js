import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';
import CarShowTime from '../screens/CarShowTime';


function FindButton({placeData,isFind,loading}){
  const navigation = useNavigation();
  const primaryTitle ='찾기';
  const secondaryTitle = '취소';  

  const onPrimaryButtonPress = () => {
    console.log("button",placeData.start, placeData.end, isFind)
    navigation.push('Placeinput');
    navigation.push('CarScreen',{
    start: placeData.start, end:placeData.end})
  };

  const onSecondaryButtonPress = () => {
    if (isFind) {
      navigation.goBack();
    } else {
      navigation.push('Placeinput', {isFind: true});
    }
  };

  
 return (
  <View style={styles.buttons}>
    <CustomButton title={primaryTitle} hasMarginBottom onPress={onPrimaryButtonPress}/>
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