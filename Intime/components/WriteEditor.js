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
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>패턴 이름: </Text>
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
      <View style={styles.inputline}>
        <TextInput
          placeholder="분"
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
        <Text>분</Text>
      </View>
      <View style={styles.inputline}>
        <TextInput
          placeholder="초"
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
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center'},
  inputline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ee2f48',
    borderWidth: 3,
    borderRadius: 10,
    width: '30%',
    textAlign: 'center',
  },
  titleInput: {
    paddingVertical: 0,
    fontSize: 14,
    marginBottom: 16,
    color: '#263238',

    // borderColor: '#ee2f48',
    // borderWidth: 1,
    // height: 50,
  },
  bodyInput: {
    fontSize: 16,
    paddingVertical: 0,
    color: '#263238',
    // borderColor: '#ee2f48',
    // borderWidth: 1,
    // height: 50,
  },
});

export default WriteEditor;
