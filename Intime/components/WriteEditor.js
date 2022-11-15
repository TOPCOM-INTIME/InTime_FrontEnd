import React, {useRef} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
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
    <View style={styles.block}>
      <View style={styles.container}>
        <View style={[styles.inputline, styles.margin]}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>패턴 이름: </Text>
          <TextInput
            placeholder="패턴 이름"
            style={[styles.Input, styles.title]}
            returnKeyType="next"
            onChangeText={onChangeTitle}
            value={title}
            hasMarginBottom
            onSubmitEditing={() => {
              minuteRef.current.focus();
            }}
          />
        </View>
        <View style={styles.inputline}>
          <TextInput
            placeholder="분"
            style={[styles.Input, styles.body]}
            maxLength={2}
            returnKeyType="done"
            keyboardType="number-pad"
            textAlignVertical="top"
            onChangeText={onChangeMinute}
            value={minute}
            ref={minuteRef}
            // hasMarginBottom
            onSubmitEditing={() => {
              secondRef.current.focus();
            }}
          />
          <Text>분</Text>
          {/* </View>
        <View style={styles.inputline}> */}
          <TextInput
            placeholder="초"
            style={[styles.Input, styles.body]}
            // style={{width: '90%'}}
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
    </View>
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
});

export default WriteEditor;
