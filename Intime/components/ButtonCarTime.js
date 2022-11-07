import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';
import CarShowTime from '../screens/CarShowTime';

function ButtonCarTime(isFind){
    const navigation = useNavigation();
    const primaryTitle = isFind ? '확인' : '취소';
    const secondaryTitle = isFind ? '취소' : '확인';

    const onSecondaryButtonPress = () => {
        if (isFind) {
          navigation.goBack();
        } 
      };

    return(
        <View style={styles.buttons}>
        <CustomButton 
          title={primaryTitle} hasMarginBottom/>
        <CustomButton
          title={secondaryTitle}
          theme="secondary"
          onPress={onSecondaryButtonPress}
        />
      </View>
    )

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

export default ButtonCarTime