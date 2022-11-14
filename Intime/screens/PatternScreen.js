import React, {useContext, useEffect, useState} from 'react';
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
  const {user, setUser, edited, setEdited} = useUserContext();
  const [logs, setLogs] = useState([]);
  const [hidden, setHidden] = useState(false);

  const onScrolledToBottom = isBottom => {
    if (hidden != isBottom) {
      setHidden(isBottom);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://175.45.204.122:8000/api/readypatterns/all',
          {
            headers: {Authorization: user},
          },
        );
        console.log(res.data);
        if (JSON.stringify(logs) !== JSON.stringify(res.data)) {
          setLogs(res.data);
        }
      } catch (err) {
        console.error(err);
      }
      setEdited(false);
    };
    if (edited) {
      fetchData();
    }
  }, [edited, logs, setEdited, user]);
  // if (logs.length === 0) {
  //   return (
  //     <View style={styles.block}>
  //       <Text style={styles.text}>패턴이 없습니다.</Text>
  //     </View>
  //   );
  // }

  let content = <Text>저장된 패턴이 없습니다.</Text>;
  if (logs.length > 0) {
    content = (
      <PatternList logs={logs} onScrolledToBottom={onScrolledToBottom} />
    );
  }

  return (
    <View style={styles.block}>
      {content}
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
