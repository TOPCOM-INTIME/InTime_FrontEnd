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

function InvitationScreen() {
  const navigation = useNavigation();
  const {user, setUser} = useUserContext();
  const [allInvitaion, setAllInvitaion] = useState([]);
  const getInvitation = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/schedule-invitations`, {
        headers: {Authorization: user},
      });
      console.log(res.data);
      setAllInvitaion(res.data);
    } catch (e) {
      console.log(`[CHECK_ERROR]${e}`);
    }
  };

  const test = item => {
    console.log(item);
    return <Text>도착지:{item.destName}</Text>;
  };

  const PrintInvite = () => {
    {
      allInvitaion.map(item => () => test(item));
    }
  };

  const OnPrimaryPress = item => {
    navigation.push('ScheduleScreen', item);
  };

  const onSecondaryButtonPress = () => {
    navigation.pop();
  };

  useEffect(() => {
    getInvitation();
  }, []);
  return (
    <>
      <View>
        {allInvitaion.map(item => (
          <TouchableOpacity
            key={item.schedulePoolId}
            onPress={() => OnPrimaryPress(item)}>
            <Text>보낸 사람:{item.invitorName}</Text>
            <Text>도착지:{item.destName}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={onSecondaryButtonPress}>
          <Text>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});

export default InvitationScreen;
