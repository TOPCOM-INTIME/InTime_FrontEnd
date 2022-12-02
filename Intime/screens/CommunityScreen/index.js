import TransparentCircleButton from '../../components/TransparentCircleButton';
import React, {useState, useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
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
import {API_URL} from '@env';
import {useUserContext} from '../../contexts/UserContext';

function CommunityScreen() {
  const isFocused = useIsFocused();
  const {user} = useUserContext();
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);

  const onSubmit = () => {
    navigation.push('CommunityScreenAdd');
  };

  const listcall = async () => {
    try {
      const res = await axios.get(`${API_URL}/friends`, {
        headers: {Authorization: user},
      });
      console.log('res', res.data);
      setUserList(res.data);
    } catch (err) {
      Alert.alert('오류', '오류 입니다.');
      console.error(err);
    }
  };

  useEffect(() => {
    if (isFocused) console.log('화면 리로드');
    listcall();
  }, [isFocused]);

  const requestdel = async username => {
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
      {cancelable: false},
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.tasksWrapper}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>친구</Text>
          <TransparentCircleButton
            onPress={onSubmit}
            name="add"
            color="#424242"
          />
        </View>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View>
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
                <TouchableOpacity
                  style={styles.list}
                  key={user.username}
                  onLongPress={() => isDel(user.username)}>
                  <View>
                    <Text style={styles.titleText}>{user.username}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>
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
});

export default CommunityScreen;
