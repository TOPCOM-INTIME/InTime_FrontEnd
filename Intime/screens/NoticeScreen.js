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
  VStack,
} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useLogContext} from '../contexts/LogContext';
//campaign
function NoticeScreen() {
  const {user, setUser} = useUserContext();
  const navigation = useNavigation();
  const {isLoading, setIsLoading} = useLogContext();
  const [Notice, setNotice] = useState([]);

  const getNotice = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/notices`, {
        headers: {Authorization: user},
      });
      setNotice(res.data);
      //   console.log('GET_NOTICE', res.data);
    } catch (e) {
      console.log(`[GET_NOTICE_ERROR]${e}`);
    }
    setIsLoading(false);
  };

  const printDate = date => {
    let tmp = new Date(date);
    return (
      String(tmp.getFullYear()) +
      '/' +
      String(tmp.getMonth() + 1).padStart(2, '0') +
      '/' +
      String(tmp.getDate()).padStart(2, '0')
    );
  };

  const movetoDetail = item => {
    console.log(item, '클릭');
    navigation.push('NoticeDetailScreen', item);
  };

  const printNotice = () => {
    return (
      <>
        {isLoading && <LoadingBar />}
        <View style={styles.item}>
          {Notice.map(item => (
            <ListItem
              key={item.id}
              title={`${item.title}`}
              secondaryText={`${printDate(item.createDate)}`}
              onPress={() => movetoDetail(item)}
              trailing={props => <Icon name="chevron-right" {...props} />}
              leadingMode="icon"
              leading={<Icon name={'campaign'} size={24} color={'black'} />}
            />
          ))}
        </View>
      </>
    );
  };

  useEffect(() => {
    getNotice();
  }, []);
  return (
    <>
      {isLoading && <LoadingBar />}
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
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        {printNotice()}
      </ScrollView>
    </>
  );
}

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
    justifyContent: 'center',
    height: 50,
  },
});

export default NoticeScreen;
