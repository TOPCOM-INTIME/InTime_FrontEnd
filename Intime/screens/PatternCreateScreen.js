import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useUserContext} from '../contexts/UserContext';
import {useLogContext} from '../contexts/LogContext';

function WriteScreen({navigation, route}) {
  const log = route.params?.log;
  const {user, setUser, edited, setEdited} = useUserContext();
  const {patterns, setPatterns} = useLogContext();
  const [title, setTitle] = useState('');
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    if (log) {
      setTitle(log.name);
      setMinute(parseInt(log.time / 60, 10).toString());
      setSecond((log.time % 60).toString());
      // console.log('생성 페이지:', log);
    }
  }, [log]);

  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠어요?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          onPress: async () => {
            try {
              await axios.delete(
                `http://175.45.204.122:8000/api/readypattern/patternId=${log?.id}`,
                {
                  headers: {Authorization: user},
                },
              );
              const res = await axios.get(
                'http://175.45.204.122:8000/api/readypatterns/origin',
                {
                  headers: {Authorization: user},
                },
              );
              setPatterns(res.data);
            } catch (err) {
              console.error(err);
            }
            navigation.pop();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader
          isEditing={!!log}
          title={title}
          minute={minute}
          second={second}
          onAskRemove={onAskRemove}
          id={log?.id}
        />
        <WriteEditor
          title={title}
          minute={minute}
          second={second}
          onChangeTitle={setTitle}
          onChangeMinute={setMinute}
          onChangeSecond={value => {
            if (+value >= 60) {
              setSecond('59');
            } else {
              setSecond(value);
            }
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'white'},
  avoidingView: {flex: 1},
});

export default WriteScreen;
