import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import {useNavigation} from '@react-navigation/native';

function WriteScreen({route}) {
  const log = route.params?.log;
  const [title, setTitle] = useState('');
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    if (log) {
      setTitle(log.title);
      setMinute(log.minute.toString());
      setSecond(log.second.toString());
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
          minute={minute}
          second={second}
          onChangeTitle={setTitle}
          onChangeMinute={setMinute}
          onChangeSecond={setSecond}
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
