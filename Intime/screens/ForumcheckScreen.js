import React, {useRef, useEffect, useState} from 'react';
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
import LoadingBar from '../components/LoadingBar';
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
  TextInput,
  VStack,
} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useLogContext} from '../contexts/LogContext';
//campaign
const ForumcheckScreen = props => {
  // console.log(props.route.params.title);
  const {user, setUser} = useUserContext();
  const navigation = useNavigation();
  const {isLoading, setIsLoading} = useLogContext();
  const [Notice, setNotice] = useState([]);
  const value = useRef();
  const [title, settitle] = useState(props.route.params.title);
  const [content, setcontent] = useState(props.route.params.content);

  const onAddPress = () => {
    navigation.push('ForumWrite');
  };
  const putForum = async () => {
    const data = {
      content: content,
      title: title,
    };
    try {
      const res = await axios.put(
        `${API_URL}/api/forum=${props.route.params.id}`,
        data,
        {
          headers: {Authorization: user},
        },
      );
      console.log('PUT_FORUM_SUCCESS', data);
    } catch (e) {
      console.log(`[PUT_FORUM_ERROR]${e},SENT${data}`);
    }
  };

  const onSubmitPress = () => {
    Alert.alert('수정', '수정하시겠습니까?', [
      {
        text: '예',
        onPress: () => {
          console.log(title, content);
          navigation.push('ForumListScreen');
          putForum();
        },
      },
      {
        text: '아니오',
        onPress: () => {
          console.log(`nothing deleted`);
        },
      },
    ]);
  };

  return (
    <>
      {isLoading && <LoadingBar />}
      <AppBar
        title="문의 하기"
        titleStyle={{fontFamily: 'NanumSquareRoundEB'}}
        centerTitle={true}
        color="#6c757d"
        tintColor="white"
        leading={<></>}
        trailing={props => (
          <HStack>
            <IconButton
              icon={props => <Icon name="add" {...props} />}
              color="white"
              onPress={onAddPress}
            />
          </HStack>
        )}
      />
      <View style={{margin: 20}}>
        <TextInput
          label="제목"
          variant="outlined"
          returnKeyType="next"
          onChangeText={settitle}
          value={title}
          onSubmitEditing={() => {
            value.current.focus();
          }}
          color="#6c757d"
          backgroundColor="white"
        />
      </View>
      <ScrollView>
        <View style={{margin: 20}}>
          <TextInput
            label="내용"
            variant="outlined"
            returnKeyType="next"
            textAlignVertical="top"
            multiline
            numberOfLines={30}
            value={content}
            onChangeText={setcontent}
            onSubmitEditing={() => {
              value.current.focus();
            }}
            color="#6c757d"
            backgroundColor="white"
          />
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={{color: 'white'}}>뒤로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSubmitPress()}>
          <Text style={{color: 'white'}}>수정</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: 'red',
  },
  title: {
    flex: 1,
    flexDirection: 'column',
  },
  dateText: {
    fontSize: 14,
    marginLeft: 30,
  },
  titleText: {
    fontSize: 25,
    marginTop: 5,
    marginLeft: 30,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  bottom: {
    backgroundColor: '#6c757d',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
  },
  scroll: {
    backgroundColor: 'red',
  },
  isEmpty: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default ForumcheckScreen;
