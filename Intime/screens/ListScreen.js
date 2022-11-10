import React, {useState} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import Patterns from '../components/Patterns';
import ListHeader from '../components/ListHeader';
import GroupList from '../components/GroupList';

function ListScreen() {
  const [patterns, setPatterns] = useState([
    {id: 1, title: '샤워', time: 10},
    {id: 2, title: '양치', time: 3},
    {id: 3, title: '면도', time: 10},
    {id: 4, title: '머리 말리기', time: 3},
    {id: 5, title: '옷 고르기', time: 10},
    {id: 6, title: '옷 입기', time: 3},
    {id: 7, title: '불 끄기', time: 10},
    {id: 8, title: '컴퓨터 끄기', time: 3},
    {id: 9, title: '손 씻기', time: 10},
    {id: 10, title: '세수', time: 3},
    {id: 11, title: '티비 끄기', time: 10},
    {id: 12, title: '가스 끄기', time: 3},
  ]);
  const [groups, setGroups] = useState([
    {
      id: 1,
      title: '그룹 1',
      patterns: [
        {id: 1, title: '샤워', time: 10},
        {id: 2, title: '양치', time: 3},
      ],
    },
    {
      id: 2,
      title: '그룹 2',
      patterns: [
        {id: 3, title: '면도', time: 10},
        {id: 4, title: '머리 말리기', time: 3},
        {id: 5, title: '옷 고르기', time: 10},
        {id: 6, title: '옷 입기', time: 3},
      ],
    },
  ]);
  const [group, setGroup] = useState([]);
  const [making, setMaking] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  console.log('그룹', group);
  const onPress = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setMaking(false);
    }
    setGroup([]);
  };

  const onEdit = id => () => {
    setIsEditing(true);
    const selectedGroup = groups.find(el => el.id === id);
    if (selectedGroup) {
      setGroup(selectedGroup.patterns);
    }
  };

  return (
    <>
      {making || isEditing ? (
        <>
          <ListHeader isEditing={isEditing} onPress={onPress} />
          <View style={styles.block}>
            <View style={styles.container}>
              <Patterns patterns={group} onPress={setGroup} />
            </View>
            <View style={styles.container}>
              <Patterns patterns={patterns} onPress={setGroup} />
            </View>
          </View>
        </>
      ) : (
        <View style={styles.list}>
          <GroupList groups={groups} onPress={onEdit} />
          <Pressable style={styles.button} onPress={() => setMaking(true)}>
            <Text>생성</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

export default ListScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: 'row',
  },
  list: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    width: '50%',
  },
  button: {
    borderRadius: 4,
    height: 48,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ee2f48',
    marginBottom: 4,
  },
});
