import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useReducer} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useLogContext} from '../contexts/LogContext';
import {useUserContext} from '../contexts/UserContext';
import TransparentCircleButton from './TransparentCircleButton';

function WriteHeader({
  // onSave,
  onAskRemove,
  isEditing,
  title,
  minute,
  second,
  id,
}) {
  const navigation = useNavigation();
  const {user, setUser, edited, setEdited} = useUserContext();
  const {patterns, setPatterns} = useLogContext();

  const onGoBack = () => {
    navigation.pop();
  };

  const onSave = async () => {
    if (minute === '') minute = 0;
    if (second === '') second = 0;
    if (!isEditing) {
      const res = await axios.post(
        'http://175.45.204.122:8000/api/readypattern/',
        {
          name: title,
          time: +minute * 60 + +second,
        },
        {
          headers: {Authorization: user},
        },
      );
    } else {
      const res = await axios.put(
        `http://175.45.204.122:8000/api/readypattern/update-name-or-time/patternId=${id}`,
        {
          name: title,
          time: +minute * 60 + +second,
        },
        {
          headers: {Authorization: user},
        },
      );
    }
    const res = await axios.get(
      'http://175.45.204.122:8000/api/readypatterns/origin',
      {
        headers: {Authorization: user},
      },
    );
    setPatterns(res.data);
    navigation.pop();
  };

  return (
    <View style={styles.block}>
      <View style={styles.iconButtonWrapper}>
        <TransparentCircleButton
          onPress={onGoBack}
          name="arrow-back"
          color="#424242"
        />
      </View>
      <View style={styles.buttons}>
        <View style={[styles.iconButtonWrapper, styles.marginRight]}>
          {isEditing && (
            <TransparentCircleButton
              name="delete-forever"
              color="#ef5350"
              hasMarginRight
              onPress={onAskRemove}
            />
          )}
        </View>
        <View style={styles.iconButtonWrapper}>
          <TransparentCircleButton
            name="check"
            color="#009688"
            onPress={onSave}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButtonWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
});

export default WriteHeader;
