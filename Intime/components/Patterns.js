import React from 'react';
import {FlatList, StyleSheet, View, Alert} from 'react-native';
import PatternListItem from './PatternListItem';

function Patterns({patterns, ListHeaderComponent, isCreatingGroup, setGroup}) {
  return (
    <FlatList
      data={patterns}
      // style={styles.block}
      renderItem={({item}) => (
        <PatternListItem
          log={item}
          isCreatingGroup={isCreatingGroup}
          setGroup={setGroup}
        />
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

export default Patterns;
