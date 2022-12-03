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

function ScheduleCurrent({route}) {
  console.log('ID값', route.params);
  const {user, setUser} = useUserContext();
  const [AllFriend, setAllFriend] = useState([]);
  const navigation = useNavigation();
  const onPrimaryButtonPress = () => {};

  const onSecondaryButtonPress = () => {
    navigation.pop();
  };

  const getFriend = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/schedulePools=${route.params}/joined-members`,
        {
          headers: {Authorization: user},
        },
      );
      setAllFriend(res.data);
      console.log('GET함', res);
    } catch (e) {
      console.log(`[GET_FRIEND_ERROR]${e}`);
    }
  };

  const checkGroup = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/schedulePools=${route.params}/members`,
        {
          headers: {Authorization: user},
        },
      );
      console.log('SCHEDULEPOOL_SUCCESS!', res.data);
    } catch (e) {
      console.log(`[SCHEDULEPOOL_ERROR]${e}`);
    }
  };

  useEffect(() => {
    getFriend();
    checkGroup();
  }, []);

  return (
    <>
      <View>
        <TouchableOpacity onPress={onPrimaryButtonPress}>
          <Text>초대</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onSecondaryButtonPress}>
          <Text>뒤로 가기</Text>
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

export default ScheduleCurrent;
