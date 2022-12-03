import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TransparentCircleButton from '../../components/TransparentCircleButton';
import RequestList from './CommunityScreenRequestList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {API_URL} from '@env';
import {useUserContext} from '../../contexts/UserContext';
import {
  AppBar,
  IconButton,
  HStack,
  Button,
  TextInput,
  Text,
  Box,
  VStack,
} from '@react-native-material/core';

function CommunityScreenAdd({setFriendInvite}) {
  const {user} = useUserContext();
  const [word, setWord] = useState('');
  const [isSearch, setisSearch] = useState(true);
  const [list, setList] = useState([]);
  const [phase, setPhase] = useState('init'); // init, loading, done
  const navigation = useNavigation();

  const onSubmit = async () => {
    Keyboard.dismiss();
    if (word === '') {
      Alert.alert('실패', '닉네임을 입력해주세요');
      return;
    }
    setPhase('loading');
    console.log('onsubmit word', word);
    try {
      const res = await axios.post(
        `${API_URL}/user`,
        {
          username: word,
        },
        {
          headers: {
            Authorization: user,
          },
        },
      );
      console.log(res.data);
      setList(res.data);
    } catch (err) {
      console.err(err);
    }
    setPhase('done');
  };

  const togglePage = () => {
    setisSearch(prev => !prev);
    console.log('isSearch', isSearch);
  };

  const onChangeInput = text => {
    setWord(text);
  };

  const onGoBack = () => {
    navigation.pop();
  };

  const onPressSend = async name => {
    try {
      const res = await axios.post(
        `${API_URL}/friends/request?username=${name}`,
        {
          body: null,
        },
        {
          headers: {
            Authorization: user,
          },
        },
      );
      await axios.post(
        `${API_URL}/api/fcm/friend`,
        {userName: name},
        {
          headers: {
            Authorization: user,
          },
        },
      );
      console.log('res', res);
      console.log('name :', name);
      Alert.alert('성공!', '상대방에게 친구 신청을 보냈어요.');
    } catch (err) {
      console.log('name', name);
      Alert.alert('실패', '이미 친구이거나 친구신청을 보냈어요.');
      console.error('err', err);
    }
  };

  return (
    <>
      <AppBar
        title="친구 추가"
        centerTitle={true}
        color="#6c757d"
        titleStyle={{fontFamily: 'NanumSquareRoundEB'}}
        leading={props => (
          <IconButton
            icon={props => <Icon name="chevron-left" {...props} />}
            color="white"
            onPress={onGoBack}
          />
        )}
      />
      <HStack m={'2%'} spacing={'2%'} justify="center">
        <Button
          title="친구검색"
          color={isSearch ? '#6c757d' : '#E0E0E0'}
          style={{width: '48%', height: 40, justifyContent: 'center'}}
          onPress={() => setisSearch(true)}
        />
        <Button
          title="받은요청"
          color={!isSearch ? '#6c757d' : '#E0E0E0'}
          style={{width: '48%', height: 40, justifyContent: 'center'}}
          onPress={() => setisSearch(false)}
        />
      </HStack>
      {isSearch ? (
        <Box>
          <HStack mh={'2%'} spacing={'2%'} h={54}>
            <TextInput
              style={{
                width: '80%',
              }}
              inputContainerStyle={{height: '100%'}}
              value={word}
              onChangeText={onChangeInput}
              label="닉네임"
              color="#6c757d"
              placeholderTextColor="gray"
              variant="outlined"
            />

            <Button
              color="#6c757d"
              title="검색"
              style={{justifyContent: 'center', height: '100%'}}
              onPress={onSubmit}
            />
          </HStack>

          {list.length > 0 ? (
            <ScrollView>
              <VStack
                mt={4}
                spacing={1}
                divider={true}
                dividerStyle={{backgroundColor: '#343a40'}}>
                {list.map(user => (
                  <Box
                    key={user.username}
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      height: 60,
                    }}>
                    <Text
                      color="#212121"
                      style={{fontSize: 18, marginLeft: 15}}>
                      {user.username}
                    </Text>
                    <Button
                      style={{marginRight: 15}}
                      title="친구 추가"
                      color="#6c757d"
                      onPress={() => onPressSend(user.username)}
                    />
                  </Box>
                  // <View key={user.username}>
                  //   <View>
                  //     <Text style={styles.listText}>{user.username}</Text>
                  //     <View style={{margin: 5}}>
                  //       <Button
                  //         color="pink"
                  //         title="친구 추가"
                  //         onPress={() => onPressSend(user.username)}
                  //       />
                  //     </View>
                  //   </View>
                  // </View>
                ))}
              </VStack>
            </ScrollView>
          ) : phase !== 'init' ? (
            <View style={{marginTop: '50%', alignItems: 'center'}}>
              <Text style={{color: 'gray', fontSize: 20, fontWeight: 'bold'}}>
                검색 결과가 없습니다.
              </Text>
            </View>
          ) : null}
        </Box>
      ) : (
        <View>
          <RequestList setFriendInvite={setFriendInvite} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  // button: {
  //     opacity: isSearch ? 0.1 : 0.7,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     borderRadius: 5,
  //     flex: 1,
  //     backgroundColor: '#ff5c5c'
  // },
  buttonarea: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  addList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ff5c5c',
    borderRadius: 6,
    borderWidth: 1,
    margin: 2,
  },
  listText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default CommunityScreenAdd;

//리팩토링시 데이터 흐름, 기능에 따라 컴포넌트 별로 나누기, import 구분, 에러처리 확실하게
