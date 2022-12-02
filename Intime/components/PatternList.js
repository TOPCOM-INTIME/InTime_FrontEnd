import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PatternListItem from './PatternListItem';

function PatternList({logs, onScrolledToBottom, ListHeaderComponent}) {
  const navigation = useNavigation();

  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({item}) => <PatternListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
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

export default PatternList;
