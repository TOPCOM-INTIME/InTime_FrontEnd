import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useReducer, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useLogContext} from '../contexts/LogContext';
import {useUserContext} from '../contexts/UserContext';
import TransparentCircleButton from './TransparentCircleButton';
import {API_URL} from '@env';
import {AppBar, HStack, IconButton} from '@react-native-material/core';

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
  const {patterns, setPatterns, setPatternGroups} = useLogContext();

  const [loading, setLoading] = useState(false);
  const onGoBack = () => {
    navigation.pop();
  };

  const onSave = async () => {
    if (title === '') {
      Alert.alert('실패', '이름을 입력해 주세요.');
      return;
    }
    if (minute === 0 && second === 0) {
      Alert.alert('실패', '시간을 입력해 주세요');
      return;
    }
    if (!isEditing) {
      const res = await axios.post(
        `${API_URL}/api/readypattern/`,
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
        `${API_URL}/api/readypattern/update-name-or-time/patternId=${id}`,
        {
          name: title,
          time: +minute * 60 + +second,
        },
        {
          headers: {Authorization: user},
        },
      );
    }
    const fetchedPattern = await axios.get(
      `${API_URL}/api/readypatterns/origin`,
      {
        headers: {Authorization: user},
      },
    );
    setPatterns(fetchedPattern.data);
    const fetchedGroup = await axios.get(
      `${API_URL}/api/groups-with-patterns/all`,
      {
        headers: {Authorization: user},
      },
    );
    setPatternGroups(fetchedGroup.data);
    navigation.pop();
  };

  return (
    <AppBar
      title={isEditing ? '패턴 수정 / 삭제' : '패턴 생성'}
      centerTitle={true}
      color="#6c757d"
      titleStyle={{fontFamily: 'NanumSquareRoundEB'}}
      leading={props => (
        <IconButton
          icon={props => <Icon name="chevron-left" {...props} />}
          color="white"
          onPress={onGoBack}
        />
      )}
      trailing={props => (
        <HStack>
          {isEditing && (
            <IconButton
              icon={props => <Icon name="delete-forever" {...props} />}
              color="red"
              onPress={onAskRemove}
            />
          )}
          <IconButton
            icon={props => <Icon name="check" {...props} />}
            color="green"
            onPress={onSave}
          />
        </HStack>
      )}
    />
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
