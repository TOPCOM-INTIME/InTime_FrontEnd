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

function PasswordChangeScreen({navigation}) {
  const {user} = useUserContext();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const nicknameChangeHandler = async () => {
    if (email === '') {
      Alert.alert('실패', '이메일을 입력해주세요');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/email?email=${email}`);
      console.log(res);
      navigation.pop();
    } catch (err) {
      if (err.response.status === 405) {
        Alert.alert('실패', '등록되지 않은 이메일입니다.');
      } else {
        Alert.alert('실패', '이메일을 제대로 입력해주세요.');
      }
      setLoading(false);
    }
  };
  return (
    <>
      <AppBar
        title="비밀번호 변경"
        centerTitle={true}
        color="#6c757d"
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
              label="이메일"
              value={email}
              onChangeText={setEmail}
              color="black"
              helperText="입력한 이메일로 임시 비밀번호를 전송합니다."
            />
          </Box>
          <Box mh={'35%'} mt={20}>
            <Button
              title="전송"
              titleStyle={{fontSize: 20}}
              style={{padding: 5}}
              color="#6c757d"
              disabled={loading}
              onPress={nicknameChangeHandler}
            />
          </Box>
        </VStack>
      </KeyboardAvoidingView>
    </>
  );
}

export default PasswordChangeScreen;
