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

function PasswordScreen({navigation}) {
  const {user} = useUserContext();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordChangeHandler = async () => {
    if (password === '') {
      Alert.alert('실패', '비밀 번호를 입력해주세요');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.put(
        `${API_URL}/password`,
        {newPwd: password},
        {
          headers: {Authorization: user},
        },
      );
      navigation.pop();
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  console.log(loading);
  return (
    <>
      <AppBar
        title="비밀번호 변경"
        centerTitle={true}
        color="#6c757d"
        titleStyle={{fontFamily: 'NanumSquareRoundEB'}}
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
              label="비밀번호"
              value={password}
              onChangeText={setPassword}
              color="#6c757d"
              secureTextEntry
            />
          </Box>
          <Box mh={'35%'} mt={20}>
            <Button
              title="변경"
              titleStyle={{fontSize: 20}}
              style={{padding: 5}}
              disabled={loading}
              color="#6c757d"
              onPress={passwordChangeHandler}
            />
          </Box>
        </VStack>
      </KeyboardAvoidingView>
    </>
  );
}

export default PasswordScreen;
