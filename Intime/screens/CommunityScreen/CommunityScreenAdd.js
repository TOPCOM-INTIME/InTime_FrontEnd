import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
<<<<<<< HEAD
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
=======
  TouchableOpacity,
  Alert,
  Keyboard,
>>>>>>> e2aad6bf6fd84dc301ebce9a215a7d02a931d9e3
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TransparentCircleButton from '../../components/TransparentCircleButton';
import RequestList from './CommunityScreenRequestList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {API_URL} from '@env';
import {useUserContext} from '../../contexts/UserContext';
<<<<<<< HEAD

function CommunityScreenAdd() {
=======
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
>>>>>>> e2aad6bf6fd84dc301ebce9a215a7d02a931d9e3
  const {user} = useUserContext();
  const [word, setWord] = useState('');
  const [isSearch, setisSearch] = useState(true);
  const [list, setList] = useState([]);
  const [phase, setPhase] = useState('init'); // init, loading, done
  const navigation = useNavigation();

<<<<<<< HEAD
  // 통신 word를 쏴줌 // try catch
  // const list = [
  //     { name: "몰라", id: '0' },
  //     { name: "치킨", id: '1' },
  //     { name: "피자", id: '2' },
  //     { name: "길담배맛", id: '3' },
  //     { name: "King", id: '4' },
  //     { name: "123", id: '5' }
  // ];
  // const list = []
  const onSubmit = async () => {
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
      // console.log(res.data);
      setList(res.data);
    } catch (err) {
      console.err(err);
    }
    // setList(list);
=======
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
>>>>>>> e2aad6bf6fd84dc301ebce9a215a7d02a931d9e3
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
<<<<<<< HEAD
      // console.log('res', res)
=======
      console.log('res', res);
>>>>>>> e2aad6bf6fd84dc301ebce9a215a7d02a931d9e3
      console.log('name :', name);
      Alert.alert('성공!', '상대방에게 친구 신청을 보냈어요.');
    } catch (err) {
      console.log('name', name);
      Alert.alert('실패', '이미 친구이거나 친구신청을 보냈어요.');
      console.error('err', err);
    }
<<<<<<< HEAD
    // Alert.alert("성공!", "상대방에게 친구 신청을 보냈어요.")
    // console.log('apiurl', API_URL)
  };

  //일단 ifelse로 구현하고 -> 하나의 리턴값으로 리팩토링 -> 컴포넌트화
  //리팩토링에 더 많은 시간 할당하기

  return (
    <View>
      <View style={styles.iconButton}>
        <TransparentCircleButton
          onPress={onGoBack}
          name="arrow-back"
          color="#000000"
        />
      </View>

      <View style={styles.buttonarea}>
        <View style={{flex: 1, margin: 5}}>
          <Button
            color="#ff5c5c"
            title="친구검색"
            disabled={isSearch}
            onPress={togglePage}
          />
          {/* <TouchableOpacity
                        disabled={isSearch}
                        //아래 스타일에서 불러오면 오류, 현재에서 처리해야함 -> 어떻게 깔끔하게 할까?
                        style={{
                            opacity: !isSearch ? 1.0 : 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            flex: 1,
                            backgroundColor: '#ff5c5c'
                        }}
                        onPress={togglePage}
                    >
                        <Text style={{ color: 'yellow' }}>친구검색</Text>
                    </TouchableOpacity> */}
        </View>
        <View style={{flex: 1, margin: 5}}>
          <Button
            color="#ff5c5c"
            title="받은요청"
            disabled={!isSearch}
            onPress={togglePage}
          />
          {/* <TouchableOpacity
                    //이걸로 띄울시 컴포넌트 전체가 비활성화되는 오류 있음
                        disabled={!isSearch}
                        style={{
                            opacity: isSearch ? 1.0 : 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            flex: 1,
                            backgroundColor: '#ff5c5c'
                        }}
                        onPress={togglePage}
                    >
                        <Text style={{ color: 'yellow' }}>받은요청</Text>
                    </TouchableOpacity> */}
        </View>
      </View>

      {isSearch ? (
        <View>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <View style={{flex: 5, margin: 1}}>
                <TextInput
                  style={{
                    borderWidth: 2,
                    margin: 3,
                    borderRadius: 5,
                    borderColor: 'pink',
                  }}
                  value={word}
                  onChangeText={onChangeInput}
                  placeholder="닉네임을 입력하세요."
                  placeholderTextColor="gray"
                />
              </View>
              <View style={{flex: 1, margin: 2}}>
                <Button
                  color="#ff5c5c"
                  title="닉네임 검색"
                  onPress={onSubmit}
                />
              </View>
            </View>
          </View>
          {list.length > 0 ? (
            <View>
              <ScrollView>
                {list.map(user => (
                  <View key={user.username}>
                    <View style={styles.addList}>
                      <Text style={styles.listText}>{user.username}</Text>
                      <View style={{margin: 5}}>
                        <Button
                          color="pink"
                          title="친구 추가"
                          onPress={() => onPressSend(user.username)}
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
=======
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
>>>>>>> e2aad6bf6fd84dc301ebce9a215a7d02a931d9e3
          ) : phase !== 'init' ? (
            <View style={{marginTop: '50%', alignItems: 'center'}}>
              <Text style={{color: 'gray', fontSize: 20, fontWeight: 'bold'}}>
                검색 결과가 없습니다.
              </Text>
            </View>
          ) : null}
<<<<<<< HEAD
        </View>
      ) : (
        <View>
          <RequestList />
        </View>
      )}
    </View>
=======
        </Box>
      ) : (
        <View>
          <RequestList setFriendInvite={setFriendInvite} />
        </View>
      )}
    </>
>>>>>>> e2aad6bf6fd84dc301ebce9a215a7d02a931d9e3
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
<<<<<<< HEAD
    // justifyContent: 'space-between'
=======
>>>>>>> e2aad6bf6fd84dc301ebce9a215a7d02a931d9e3
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
