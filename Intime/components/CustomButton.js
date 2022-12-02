import {Button} from '@react-native-material/core';
import React from 'react';
import {StyleSheet, View, Pressable, Text, Platform} from 'react-native';

function CustomButton({onPress, title, hasMarginBottom, theme}) {
  const isPrimary = theme === 'primary';

  return (
    <View style={[styles.block, hasMarginBottom && styles.margin]}>
      <Button
        onPress={onPress}
        title={title}
        color={isPrimary ? '#6c757d' : '#ffffff'}
        tintColor={isPrimary ? '#ffffff' : '#6c757d'}
        android_ripple={{color: isPrimary ? '#ffffff' : '#6c757d'}}
        pressableContainerStyle={{paddingVertical: 8}}
      />
    </View>
  );
}

CustomButton.defaultProps = {
  theme: 'primary',
};

const styles = StyleSheet.create({
  overflow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#6200ee',
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
    backgroundColor: '#adb5bd',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#adb5bd',
  },
});

export default CustomButton;
