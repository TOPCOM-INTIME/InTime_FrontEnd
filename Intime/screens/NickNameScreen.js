import {
  Text,
  AppBar,
  IconButton,
  VStack,
  TextInput,
  Box,
  Button,
} from '@react-native-material/core';
import axios from 'axios';
import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {API_URL} from '@env';
import {useUserContext} from '../contexts/UserContext';

function NickNameScreen({navigation}) {
  const {user} = useUserContext();
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const nicknameChangeHandler = async () => {
    if (nickname === '') {
      Alert.alert('실패', '닉네임을 입력해주세요');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.put(
        `${API_URL}/username`,
        {username: nickname},
        {
          headers: {Authorization: user},
        },
      );
      navigation.pop();
    } catch (err) {
      Alert.alert('실패', '중복되는 닉네임 입니다.');
      setLoading(false);
      console.error(err);
    }
  };
  console.log(loading);
  return (
    <>
      <AppBar
        title="닉네임 변경"
        centerTitle={true}
        leading={props => (
          <IconButton
            icon={props => <Icon name="chevron-left" {...props} />}
            color="white"
            onPress={() => navigation.pop()}
            {...props}
          />
        )}
      />
      <KeyboardAvoidingView>
        <VStack mt={20}>
          <Box mh={40}>
            <TextInput
              label="닉네임"
              value={nickname}
              onChangeText={setNickname}
            />
          </Box>
          <Box mh={'35%'} mt={20}>
            <Button
              title="변경"
              titleStyle={{fontSize: 20}}
              style={{padding: 5}}
              disabled={loading}
              onPress={nicknameChangeHandler}
            />
          </Box>
        </VStack>
      </KeyboardAvoidingView>
    </>
  );
}

export default NickNameScreen;
