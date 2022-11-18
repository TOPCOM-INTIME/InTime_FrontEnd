import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';

function ScheduleSubmitButton({onPress, title, hasMarginBottom, theme}) {
  const isPrimary = theme === 'primary';
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{color: isPrimary ? '#ffffff' : '#ee2f48'}}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

ScheduleSubmitButton.defaultProps = {
  theme: 'primary',
};
const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    height: 40,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  margin: {
    marginBottom: 8,
  },
  primaryWrapper: {
    backgroundColor: 'white',
  },
  primaryText: {
    color: 'black',
  },
  secondaryText: {
    color: 'black',
  },
});

export default ScheduleSubmitButton;
