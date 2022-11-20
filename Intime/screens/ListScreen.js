import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable, Modal, Alert} from 'react-native';
import Patterns from '../components/Patterns';
import ListHeader from '../components/ListHeader';
import GroupList from '../components/GroupList';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {useUserContext} from '../contexts/UserContext';
import {useLogContext} from '../contexts/LogContext';

function ListScreen({navigation}) {
  // const [patterns, setPatterns] = useState([]);
  // const [groups, setGroups] = useState([]);
  const {user, setUser} = useUserContext();

  const {patterns, setPatterns, patternGroups, setPatternGroups} =
    useLogContext();
  const [group, setGroup] = useState([]);
  //   patternGroups.length > 0 ? patternGroups[0] : [],
  // );

  useEffect(() => {
    if (patternGroups.length > 0) {
      setGroup(patternGroups[0]);
    }
  }, [patternGroups]);

  if (patternGroups.length === 0) {
    return (
      <>
        <ListHeader group={group} isEmpty={true} />
        <View style={styles.empty}>
          <Text style={styles.emptyText}>그룹이 없습니다.</Text>
        </View>
      </>
    );
  }
  return (
    <>
      <ListHeader group={group} setGroup={setGroup} />
      <View style={styles.block}>
        <View style={styles.leftContainer}>
          <GroupList
            groups={patternGroups}
            group={group}
            style={styles.index}
            onPress={setGroup}
          />
        </View>
        <View style={styles.rightContainer}>
          <Patterns
            patterns={group?.patterns}
            onPress={setGroup}
            isCreatingGroup={1}
          />
        </View>
      </View>
    </>
  );
}

export default ListScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: 'row',
  },
  groupBlock: {
    // flex: 1,
    height: '7%',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  patterns: {
    height: '80%',
    borderWidth: 3,
    borderColor: '#ee2f48',
    borderRadius: 10,
  },
  index: {
    height: '10%',
    width: '100%',
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    height: '20%',
  },
  container: {
    width: '100%',
  },
  leftContainer: {
    width: '30%',
    borderRightColor: '#ee2f48',
    borderRightWidth: 1,
  },
  rightContainer: {
    width: '70%',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  buttonView: {
    height: '7%',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 4,
    height: 48,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ee2f48',
    // marginBottom: 4,
  },
  press: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ee2f48',
    borderWidth: 2,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
});
