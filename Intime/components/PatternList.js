import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PatternListItem from './PatternListItem';

function PatternList({logs, onScrolledToBottom, ListHeaderComponent}) {
  const navigation = useNavigation();
  const onScroll = e => {
    if (!onScrolledToBottom) return;
    const {contentSize, layoutMeasurement, contentOffset} = e.nativeEvent;
    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (
      distanceFromBottom < 72 &&
      contentSize.height > layoutMeasurement.height
    ) {
      onScrolledToBottom(true);
    } else {
      onScrolledToBottom(false);
    }
  };

  const onPressFun = item => () => {
    navigation.navigate('write', {
      log: item,
    });
  };

  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({item}) => <PatternListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onScroll={onScroll}
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
