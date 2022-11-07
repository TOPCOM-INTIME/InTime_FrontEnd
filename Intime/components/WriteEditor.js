import React, {useRef} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

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
    <View style={styles.block}>
      <TextInput
        placeholder="패턴 이름"
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={onChangeTitle}
        value={title}
        onSubmitEditing={() => {
          minuteRef.current.focus();
        }}
      />
      <TextInput
        placeholder="시간"
        style={styles.bodyInput}
        maxLength={2}
        returnKeyType="done"
        keyboardType="number-pad"
        textAlignVertical="top"
        onChangeText={onChangeMinute}
        value={minute}
        ref={minuteRef}
        onSubmitEditing={() => {
          secondRef.current.focus();
        }}
      />
      <TextInput
        placeholder="시간"
        style={styles.bodyInput}
        maxLength={2}
        returnKeyType="done"
        keyboardType="number-pad"
        textAlignVertical="top"
        onChangeText={onChangeSecond}
        value={second}
        ref={secondRef}
      />
      <Text>초</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center'},
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: '#263238',
    fontWeight: 'bold',
  },
  bodyInput: {
    fontSize: 16,
    paddingVertical: 0,
    color: '#263238',
  },
});

export default WriteEditor;
