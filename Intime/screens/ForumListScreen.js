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
function ForumWrite() {
  const {user, setUser} = useUserContext();
  const navigation = useNavigation();
  const {isLoading, setIsLoading} = useLogContext();
  const [Notice, setNotice] = useState([]);

  const getNotice = async () => {
    setIsLoading(true);
    console.log('CAME');
    try {
      const res = await axios.get(`${API_URL}/api/myforums`, {
        headers: {Authorization: user},
      });
      setNotice(res.data);
      //   console.log(Notice);
    } catch (e) {
      console.log(`[GET_FORUM_ERROR]${e}`);
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
    navigation.push('ForumcheckScreen', item);
  };

  const onAddPress = () => {
    navigation.push('ForumWrite');
  };

  const printNotice = () => {
    if (Notice.length === 0) {
      return (
        <View style={styles.isEmpty}>
          <Text>문의함이 비어있습니다.</Text>
        </View>
      );
    }

    return (
      <>
        <ScrollView style={styles.scroll}>
          <View style={styles.item}>
            {Notice.map(item => (
              <ListItem
                key={item.id}
                title={`${item.title}`}
                secondaryText={`${printDate(item.createDate)}`}
                onPress={() => movetoDetail(item)}
                trailing={props => <Icon name="chevron-right" {...props} />}
                leadingMode="icon"
                leading={
                  <Icon name={'mail-outline'} size={24} color={'black'} />
                }
              />
            ))}
          </View>
        </ScrollView>
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
        title="문의함"
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

      <View style={{flex: 1}}>{printNotice()}</View>

      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MainTab', {screen: 'InfoScreen'})
          }>
          <Text style={{color: 'white'}}>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: 'white',
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
  scroll: {
    backgroundColor: 'white',
  },
  isEmpty: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default ForumWrite;
