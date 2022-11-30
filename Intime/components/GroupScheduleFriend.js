import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Platform,
  Text,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';
import {API_URL} from '@env';
const list = [{username: 'mike'}, {username: 'john'}, {username: 'john1'}];

function GroupScheduleFriend({friendList, setfriendList}) {
  const navigation = useNavigation();
  const {user, setUser} = useUserContext();
  const [allFriend, setAllFriend] = useState([]);
  let inviteList = [];

  const onPrimaryButtonPress = () => {
    setfriendList(inviteList);
    navigation.pop();
  };

  const onSecondaryButtonPress = () => {
    navigation.pop();
  };

  const getFriend = async () => {
    try {
      const res = await axios.get(`${API_URL}/friends`, {
        headers: {Authorization: user},
      });
      setAllFriend(res.data);
      console.log('GET함', res.data);
    } catch (e) {
      console.log(`[GET_FRIEND_ERROR]${e}`);
    }
  };

  onShortPress = item => {
    if (inviteList.includes(item)) {
      let tmp = inviteList.indexOf(item);
      inviteList.pop(tmp);
    } else {
      inviteList.push(item);
    }
    console.log(inviteList);
  };
  useEffect(() => {
    getFriend();
  }, []);

  return (
    <>
      <View>
        {allFriend.map(item => (
          <TouchableOpacity
            key={item.username}
            onPress={() => onShortPress(item)}>
            <Text style={{color: 'black'}}>{item.username}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <TouchableOpacity onPress={onPrimaryButtonPress}>
          <Text>초대</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onSecondaryButtonPress}>
          <Text>취소</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    // fontWeight: 'bold',
    color: 'black',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  button: {
    flexDirection: 'row-reverse',
    margin: 15,
  },
});

export default GroupScheduleFriend;
