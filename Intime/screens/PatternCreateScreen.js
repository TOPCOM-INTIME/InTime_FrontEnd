import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import {useNavigation} from '@react-navigation/native';

function WriteScreen({route}) {
  const log = route.params?.log;
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (log) {
      setTitle(log.title);
      setTime(log.time.toString());
    }
  }, [log]);

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader isEditing={!!log} />
        <WriteEditor
          title={title}
          time={time}
          onChangeTitle={setTitle}
          onChangeTime={setTime}
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
