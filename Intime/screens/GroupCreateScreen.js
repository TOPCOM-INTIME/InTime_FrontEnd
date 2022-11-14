import React, {useContext, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
  Alert,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import {useNavigation} from '@react-navigation/native';
import Patterns from '../components/Patterns';

function GroupCreateScreen({navigation, route}) {
  const [patterns, setPatterns] = useState([
    {id: 1, title: '샤워', minute: 10, second: 30},
    {id: 2, title: '양치', minute: 3, second: 20},
    {id: 3, title: '면도', minute: 10, second: 45},
    {id: 4, title: '머리 말리기', minute: 10, second: 45},
    {id: 5, title: '옷 고르기', minute: 10, second: 45},
    {id: 6, title: '옷 입기', minute: 10, second: 45},
    {id: 7, title: '불 끄기', minute: 10, second: 45},
    {id: 8, title: '컴퓨터 끄기', minute: 10, second: 45},
    {id: 9, title: '손 씻기', minute: 10, second: 45},
    {id: 10, title: '세수', minute: 10, second: 45},
    {id: 11, title: '티비 끄기', minute: 10, second: 45},
    {id: 12, title: '가스 끄기', minute: 10, second: 45},
  ]);
  const [group, setGroup] = useState(route.params?.group.patterns || []);
  const log = route.params?.log;

  console.log('스크린', route.params);

  return (
    <>
      <View style={styles.block}>
        <View style={styles.container}>
          <View style={styles.text}>
            <Text style={styles.header}>패턴 목록</Text>
          </View>
          <Patterns
            patterns={patterns}
            setGroup={setGroup}
            isCreatingGroup={2}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.text}>
            <Text style={styles.header}>선택된 패턴</Text>
          </View>
          <Patterns patterns={group} setGroup={setGroup} isCreatingGroup={2} />
        </View>
      </View>
      <View style={styles.text}>
        <Text style={styles.caution}>
          그룹에 넣고 싶은 패턴을 순서대로 클릭하여 주세요.
        </Text>
      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={() => navigation.pop()}>
          <Text>뒤로</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.pop()}>
          <Text>저장</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    color: 'black',
  },
  groupBlock: {
    // flex: 1,
    height: '7%',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  patterns: {
    height: '80%',
    borderWidth: 3,
    borderColor: '#ee2f48',
    borderRadius: 10,
  },
  index: {
    height: '10%',
    width: '100%',
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    height: '20%',
  },
  container: {
    width: '50%',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  buttonView: {
    height: '7%',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 4,
    height: 48,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ee2f48',
    // marginBottom: 4,
  },
  press: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ee2f48',
    borderWidth: 2,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GroupCreateScreen;
