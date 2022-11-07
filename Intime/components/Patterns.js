import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PatternListItem from './PatternListItem';

function Patterns({patterns, ListHeaderComponent, onPress}) {
  const pressHandler = item => () => {
    // console.log(item);
    onPress(group => {
      console.log('함수 내부', group);
      if (group.find(pattern => pattern.id === item.id)) {
        return group.filter(pattern => pattern.id !== item.id);
      } else {
        return group.concat(item);
      }
    });
  };

  return (
    <FlatList
      data={patterns}
      style={styles.block}
      renderItem={({item}) => (
        <PatternListItem log={item} onPress={pressHandler(item)} />
      )}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View />}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});

export default Patterns;
