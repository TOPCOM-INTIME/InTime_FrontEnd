import TransparentCircleButton from '../../components/TransparentCircleButton';
import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { useUserContext } from '../../contexts/UserContext';
import {
  AppBar,
  ListItem,
  IconButton,
  HStack,
  Badge,
  ListItemText,
} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useLogContext } from '../../contexts/LogContext';
import LoadingBar from '../../components/LoadingBar';
function CommunityScreen() {
  const isFocused = useIsFocused();
  const { user } = useUserContext();
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);
  const { friendInvite, isLoading, setIsLoading } = useLogContext();

  const onSubmit = () => {
    navigation.push('CommunityScreenAdd');
  };

  useEffect(() => {
    const listcall = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_URL}/friends`, {
          headers: { Authorization: user },
        });
        console.log('res', res.data);
        setUserList(res.data);
      } catch (err) {
        Alert.alert('오류', '오류 입니다.');
        console.error(err);
      }
      setIsLoading(false);
    };
    if (isFocused) {
      console.log('화면 리로드');
    }
    listcall();
  }, [isFocused, user, setIsLoading]);

  const requestdel = async username => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/friends`, {
        data: {
          username: username,
        },
        headers: {
          Authorization: user,
        },
      });
      const newList = userList.filter(userObj => userObj.username !== username);
      setUserList(newList);
      Alert.alert('삭제 완료', res.data);
    } catch (err) {
      console.error('err', err);
    }
    setIsLoading(false);
  };

  const isDel = async username => {
    Alert.alert(
      '친구 삭제',
      '정말 삭제하시겠습니까?',
      [
        {
          text: '예',
          onPress: () => {
            requestdel(username);
            console.log('삭제됌');
          },
        },
        {
          text: '아니요',
          onPress: () => console.log('삭제 안됌'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <>
      <AppBar
        title="친구"
        titleStyle={{ fontFamily: 'NanumSquareRoundEB' }}
        centerTitle={true}
        color="#6c757d"
        tintColor="white"
        leading={<></>}
        trailing={props => (
          <HStack>
            <IconButton
              icon={props => <Icon name="add" {...props} />}
              color="white"
              onPress={onSubmit}
            />
            <Badge
              label={friendInvite.length}
              showZero={false}
              tintColor="white"
              color="red"
              style={{ position: 'absolute', left: 30 }}
            />
          </HStack>
        )}
      />
      {isLoading && <LoadingBar />}
      {userList.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>등록된 친구가 없습니다.</Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          {userList.map(user => (
            <>
              <ListItem
                key={user.username}
                onLongPress={() => isDel(user.username)}
                title={user.username}
                value={user.lateCount}
              />
              <Text style={{ color: 'black', alignItems: 'flex-end' }}>지각 횟수 : {user.lateCount ? user.lateCount : '없음'}</Text>
            </>
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '85%',
    height: 50,
    borderColor: '#ED3648',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 10,
    // backgroundColor: '#FEE5E1'
  },
  titleText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
});

export default CommunityScreen;
