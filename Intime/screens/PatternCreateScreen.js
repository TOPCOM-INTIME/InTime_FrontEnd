import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useUserContext} from '../contexts/UserContext';
import {useLogContext} from '../contexts/LogContext';
import {API_URL} from '@env';
import {AppBar, IconButton} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';

function WriteScreen({navigation, route}) {
  const log = route.params?.log;
  const {user, setUser, edited, setEdited} = useUserContext();
  const {patterns, setPatterns, setIsLoading} = useLogContext();
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
            setIsLoading(true);
            try {
              const dres = await axios.delete(
                `${API_URL}/api/readypattern/patternId=${log?.id}`,
                {
                  headers: {Authorization: user},
                },
              );
              if (dres.data.status === 424) {
                Alert.alert(
                  '실패',
                  '패턴 그룹에 존재하는 패턴은 삭제할 수 없습니다.',
                );
                setIsLoading(false);
                navigation.pop();
                return;
              }
              const res = await axios.get(
                `${API_URL}/api/readypatterns/origin`,
                {
                  headers: {Authorization: user},
                },
              );
              setPatterns(res.data);
            } catch (err) {
              console.error(err);
            }
            setIsLoading(false);
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
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'white'},
  avoidingView: {flex: 1},
});

export default WriteScreen;
