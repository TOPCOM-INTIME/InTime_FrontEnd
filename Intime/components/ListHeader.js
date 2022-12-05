import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useReducer} from 'react';
import {Pressable, StyleSheet, Text, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransparentCircleButton from './TransparentCircleButton';
import {useUserContext} from '../contexts/UserContext';
import {useLogContext} from '../contexts/LogContext';
import {API_URL} from '@env';
import {
  ActivityIndicator,
  AppBar,
  HStack,
  IconButton,
} from '@react-native-material/core';

function ListHeader({group, setGroup, isEmpty}) {
  const navigation = useNavigation();
  const {user, setUser} = useUserContext();
  const {setPatternGroups, isLoading, setIsLoading} = useLogContext();

  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠어요?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          onPress: async () => {
            try {
              setIsLoading(true);
              await axios.delete(
                `${API_URL}/api/patterngroup/groupId=${group.id}`,
                {
                  headers: {Authorization: user},
                },
              );
              const fetchedGroup = await axios.get(
                `${API_URL}/api/groups-with-patterns/all`,
                {
                  headers: {Authorization: user},
                },
              );
              setPatternGroups(fetchedGroup.data);
              setGroup(
                fetchedGroup.data.length > 0 ? fetchedGroup.data[0] : [],
              );
            } catch (error) {
              console.log(error);
            }
            setIsLoading(false);
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  console.log('리스트 헤더', group);

  const onEdit = () => {
    navigation.navigate('CreateGroup', {group});
  };

  return (
    <AppBar
      title="리스트"
      centerTitle={true}
      color="#6c757d"
      titleStyle={{fontFamily: 'NanumSquareRoundEB'}}
      leading={<></>}
      trailing={props =>
        isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <HStack>
            {!isEmpty && (
              <IconButton
                icon={props => <Icon name="edit" {...props} />}
                color="white"
                onPress={onEdit}
              />
            )}
            {!isEmpty && (
              <IconButton
                icon={props => <Icon name="delete" {...props} />}
                color="white"
                onPress={onAskRemove}
              />
            )}
            <IconButton
              icon={props => <Icon name="add" {...props} />}
              color="white"
              onPress={() => navigation.navigate('CreateGroup')}
            />
          </HStack>
        )
      }
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

export default ListHeader;
