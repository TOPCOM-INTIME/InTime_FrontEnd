import React from 'react';
import {FlatList, StyleSheet, View, Alert} from 'react-native';
import {useLogContext} from '../contexts/LogContext';
import PatternGroupListItem from './PatternGroupListItem';

function PatternGroups({ListHeaderComponent, setGroup}) {
  const {patternGroups, setPatternGroups} = useLogContext();
  return (
    <FlatList
      data={patternGroups}
      // style={styles.block}
      renderItem={({item}) => (
        <PatternGroupListItem log={item} setGroup={setGroup} />
      )}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View />}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, width: '100%'},
});

export default PatternGroups;
