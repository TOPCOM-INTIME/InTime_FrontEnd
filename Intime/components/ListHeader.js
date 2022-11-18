import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useReducer} from 'react';
import {Pressable, StyleSheet, Text, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransparentCircleButton from './TransparentCircleButton';
import {useUserContext} from '../contexts/UserContext';
import {useLogContext} from '../contexts/LogContext';

function ListHeader({group, setGroup, isEmpty}) {
  const navigation = useNavigation();
  const {user, setUser} = useUserContext();
  const {setPatternGroups} = useLogContext();

  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠어요?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          onPress: async () => {
            await axios.delete(
              `http://175.45.204.122:8000/api/patterngroup/groupId=${group.id}`,
              {
                headers: {Authorization: user},
              },
            );
            const fetchedGroup = await axios.get(
              'http://175.45.204.122:8000/api/groups-with-patterns/all',
              {
                headers: {Authorization: user},
              },
            );
            // console.log(fetchedGroup.data);
            setPatternGroups(fetchedGroup.data);
            setGroup(fetchedGroup.data.length > 0 ? fetchedGroup.data[0] : []);
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
    <View style={styles.block}>
      <View style={styles.iconButtonWrapper}>
        {/* <TransparentCircleButton
          onPress={onPress}
          name="arrow-back"
          color="#424242"
        /> */}
      </View>
      <View style={styles.buttons}>
        {!isEmpty && (
          <>
            <View style={[styles.iconButtonWrapper, styles.marginRight]}>
              <TransparentCircleButton
                name="edit"
                color="blue"
                hasMarginRight
                onPress={onEdit}
              />
            </View>

            <View style={[styles.iconButtonWrapper, styles.marginRight]}>
              <TransparentCircleButton
                name="delete-forever"
                color="#ef5350"
                hasMarginRight
                onPress={onAskRemove}
              />
            </View>
          </>
        )}
        <View style={styles.iconButtonWrapper}>
          <TransparentCircleButton
            name="add-circle-outline"
            color="#009688"
            onPress={() => navigation.navigate('CreateGroup')}
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

export default ListHeader;
