import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Platform,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import SignButtons from '../components/SignButtons';
import SignUpForm from '../components/SignUpForm';
import axios from 'axios';
import authStorage from '../stroages/authStorage';
import {useUserContext} from '../contexts/UserContext';
import FloatingWriteButton from '../components/FloatingWriteButton';
import PatternList from '../components/PatternList';

function PatternScreen({navigate, route}) {
  const [logs, setLogs] = useState([
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
  const [hidden, setHidden] = useState(false);

  const onScrolledToBottom = isBottom => {
    if (hidden != isBottom) {
      setHidden(isBottom);
    }
  };

  console.log('패턴스크린', logs);
  // if (logs.length === 0) {
  //   return (
  //     <View style={styles.block}>
  //       <Text style={styles.text}>패턴이 없습니다.</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.block}>
      <PatternList logs={logs} onScrolledToBottom={onScrolledToBottom} />
      <FloatingWriteButton setLogs={setLogs} hidden={hidden} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default PatternScreen;
