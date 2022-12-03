import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Platform,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';
import {API_URL} from '@env';
import {
  AppBar,
  Box,
  Button,
  HStack,
  IconButton,
  ListItem,
  Pressable,
  Text,
  VStack,
} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';

function GroupScheduleFriend({
  friendList,
  setfriendList,
  friendtoken,
  setfriendtoken,
  usernameList,
  setusernameList,
}) {
  const navigation = useNavigation();
  const {user, setUser} = useUserContext();
  const [allFriend, setAllFriend] = useState([]);
  console.log(allFriend);

  const onPrimaryButtonPress = () => {
    navigation.pop();
  };

  const onSecondaryButtonPress = () => {
    setfriendList([]);
    setfriendtoken([]);
    setusernameList([]);
    navigation.pop();
  };

  const onShortPress = item => {
    setfriendList(friendList => {
      if (friendList.includes(item.id)) {
        return friendList.filter(friend => friend !== item.id);
      } else {
        return [...friendList, item.id];
      }
    });
    setfriendtoken(tokenList => {
      if (tokenList.includes(item.deviceToken)) {
        return tokenList.filter(token => token !== item.deviceToken);
      } else {
        return [...tokenList, item.deviceToken];
      }
    });
    setusernameList(nameList => {
      if (nameList.includes(item.username)) {
        return nameList.filter(name => name !== item.username);
      } else {
        return [...nameList, item.username];
      }
    });
  };
  useEffect(() => {
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
    getFriend();
  }, [user]);

  return (
    <>
      <AppBar
        title="초대할 친구 선택"
        centerTitle={true}
        color="#6c757d"
        titleStyle={{fontFamily: 'NanumSquareRoundEB'}}
        leading={props => (
          <IconButton
            icon={props => <Icon name="chevron-left" {...props} />}
            color="white"
            onPress={onSecondaryButtonPress}
          />
        )}
        trailing={props => (
          <IconButton
            icon={props => <Icon name="check" {...props} />}
            color="green"
            onPress={onPrimaryButtonPress}
          />
        )}
      />
      <ScrollView>
        {allFriend.map(item => (
          <ListItem
            key={item.username}
            onPress={() => onShortPress(item)}
            title={item.username}
            leading={
              friendList.includes(item.id) ? (
                <Icon name="check-box" size={24} />
              ) : (
                <Icon name="check-box-outline-blank" size={24} />
              )
            }
          />
        ))}
      </ScrollView>
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
