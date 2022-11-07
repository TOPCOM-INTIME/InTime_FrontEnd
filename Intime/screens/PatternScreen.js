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
    {id: 1, title: '샤워', time: 10},
    {id: 2, title: '양치', time: 3},
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
