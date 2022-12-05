import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';
import {useUserContext} from '../../contexts/UserContext';
import {ListItem} from '@react-native-material/core';
import {useLogContext} from '../../contexts/LogContext';

function CommunityScreenList(props) {
  const {user} = useUserContext();
  const {userList} = props;
  const {isLoading, setIsLoading} = useLogContext();
  console.log(userList);

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
      Alert.alert('삭제 완료');
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
          text: '아니요',
          onPress: () => console.log('삭제 안됌'),
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => {
            requestdel(username);
            console.log('삭제됌');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '5%',
      }}>
      {userList.length === 0 ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '65%',
          }}>
          <Text style={{color: 'black'}}>등록된 친구가 없습니다.</Text>
        </View>
      ) : (
        userList.map(user => (
          <ListItem
            key={user.username}
            onLongPress={() => isDel(user.username)}
            title={user.username}
          />
        ))
      )}
    </View>
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
  },
  titleText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default CommunityScreenList;
