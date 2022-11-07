import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GroupListItem from './GroupListItem';

function GroupList({groups, onScrolledToBottom, ListHeaderComponent, onPress}) {
  return (
    <FlatList
      data={groups}
      style={styles.block}
      renderItem={({item}) => (
        <GroupListItem group={item} onPress={onPress(item.id)} />
      )}
      keyExtractor={log => log.id}
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

export default GroupList;
