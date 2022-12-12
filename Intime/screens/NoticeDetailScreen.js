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
import {useLogContext} from '../contexts/LogContext';

const NoticeDetailScreen = props => {
  console.log(props.route);
  const {user, setUser} = useUserContext();
  const navigation = useNavigation();
  const {isLoading, setIsLoading} = useLogContext();
  const [Notice, setNotice] = useState([]);
  let title = props.route.params.title;
  let content = props.route.params.content;
  let createDate = props.route.params.createDate;

  const printDate = date => {
    let tmp = new Date(date);
    return (
      <>
        <Text style={{marginTop: 10, marginLeft: 5}}>
          날짜: {tmp.getFullYear()}/
          {String(tmp.getMonth() + 1).padStart(2, '0')}/
          {String(tmp.getDate()).padStart(2, '0')}
        </Text>
      </>
    );
  };

  return (
    <>
      <AppBar
        title="공지사항"
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
      <View style={styles.container}>
        {printDate(createDate)}
        <Text style={styles.title}>제목:{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    borderBottomWidth: 2,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  content: {
    marginTop: 10,
    marginLeft: 10,
  },
  bottom: {
    backgroundColor: '#6c757d',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
  },
});
export default NoticeDetailScreen;
