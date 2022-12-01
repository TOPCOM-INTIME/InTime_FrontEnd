import React, {useRef} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {TextInput, Text, VStack} from '@react-native-material/core';
import BorderedInput from './BorderedInput';

function WriteEditor({
  title,
  minute,
  second,
  onChangeTitle,
  onChangeMinute,
  onChangeSecond,
}) {
  const minuteRef = useRef();
  const secondRef = useRef();
  return (
    <>
      <VStack spacing={10} mt={15} mh={'5%'}>
        <TextInput
          label="패턴 이름"
          variant="outlined"
          returnKeyType="next"
          onChangeText={onChangeTitle}
          value={title}
          onSubmitEditing={() => {
            minuteRef.current.focus();
          }}
          color="#6c757d"
          backgroundColor="white"
        />
        <TextInput
          label="분"
          maxLength={2}
          variant="outlined"
          returnKeyType="next"
          keyboardType="number-pad"
          onChangeText={onChangeMinute}
          value={minute}
          ref={minuteRef}
          // hasMarginBottom
          onSubmitEditing={() => {
            secondRef.current.focus();
          }}
          color="#6c757d"
        />
        {/* </View>
        <View style={styles.inputline}> */}
        <TextInput
          label="초"
          maxLength={2}
          variant="outlined"
          returnKeyType="done"
          keyboardType="number-pad"
          onChangeText={onChangeSecond}
          value={second}
          ref={secondRef}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          color="#6c757d"
        />
      </VStack>
    </>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, justifyContent: 'center'},
  container: {
    height: 240,
    justifyContent: 'center',
    borderColor: '#ee2f48',
    borderWidth: 3,
    borderRadius: 10,
    position: 'relative',
    bottom: 40,
    marginHorizontal: 10,
    paddingVertical: 20,
  },
  inputline: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'black',
    width: '100%',
    // textAlign: 'center',
  },
  margin: {
    marginBottom: 20,
  },
  title: {
    width: '70%',
  },
  Input: {
    borderColor: '#ee2f48',
    borderWidth: 1,
    color: 'black',
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',

    // borderColor: '#ee2f48',
    // borderWidth: 1,
    // height: 50,
  },
  body: {
    width: '40%',
  },
  text: {fontSize: 20, fontWeight: 'bold', color: 'black'},
});

export default WriteEditor;
