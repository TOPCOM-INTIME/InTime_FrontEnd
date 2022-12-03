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
import {useLogContext} from '../contexts/LogContext';
import {AppBar, IconButton} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';

function PatternScreen({navigation, route}) {
  const {patterns, setPatterns} = useLogContext();
  const [hidden, setHidden] = useState(false);

  const onScrolledToBottom = isBottom => {
    if (hidden != isBottom) {
      setHidden(isBottom);
    }
  };

  let content = <Text style={styles.emptyText}>저장된 패턴이 없습니다.</Text>;
  if (patterns.length > 0) {
    content = (
      <PatternList logs={patterns} onScrolledToBottom={onScrolledToBottom} />
    );
  }

  return (
    <>
      <AppBar
        title="패턴"
        titleStyle={{fontFamily: 'NanumSquareRoundEB'}}
        centerTitle={true}
        color="#6c757d"
        tintColor="white"
        leading={<></>}
        trailing={props => (
          <IconButton
            icon={props => <Icon name="add" {...props} />}
            color="white"
            onPress={() => navigation.navigate('write')}
          />
        )}
      />
      <View style={patterns.length > 0 ? styles.block : styles.empty}>
        {content}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  emptyText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
});

export default PatternScreen;
