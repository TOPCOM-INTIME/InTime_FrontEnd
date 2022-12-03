import React from 'react';
import {StyleSheet, View, Pressable, Text, Platform} from 'react-native';

function ScheduleCustomButton({onPress, title, hasMarginBottom, theme}) {
  const isPrimary = theme === 'primary';
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{color: isPrimary ? '#ffffff' : '#6c757d'}}>
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

ScheduleCustomButton.defaultProps = {
  theme: 'primary',
};
const styles = StyleSheet.create({
  wrapper: {
    borderColor: '#6c757d',
    borderRadius: 20,
    height: 40,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  margin: {
    marginBottom: 8,
  },
  primaryWrapper: {
    backgroundColor: '#6c757d',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#6c757d',
  },
});

export default ScheduleCustomButton;
