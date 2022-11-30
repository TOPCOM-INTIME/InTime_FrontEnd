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

function Invitation() {
  const navigation = useNavigation();
  const {user, setUser} = useUserContext();
  const [allFriend, setAllFriend] = useState([]);
  const getInvitation = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/schedule-invitations`, {
        headers: {Authorization: user},
      });
      // console.log('GET한 data:', res.data);
      console.log(res.data);
      // console.log('GET함');
    } catch (e) {
      console.log(`[CHECK_ERROR]${e}`);
    }
  };

  const OnPrimaryPress = () => {
    navigation.pop();
  };

  useEffect(() => {
    getInvitation();
  }, []);
  return (
    <>
      <View>
        <TouchableOpacity onPress={OnPrimaryPress}>
          <Text>HI</Text>
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

export default Invitation;
