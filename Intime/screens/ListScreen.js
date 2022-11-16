import React, {useState} from 'react';
import {Text, View, StyleSheet, Pressable, Modal, Alert} from 'react-native';
import Patterns from '../components/Patterns';
import ListHeader from '../components/ListHeader';
import GroupList from '../components/GroupList';
import {SafeAreaView} from 'react-native-safe-area-context';

function ListScreen({navigation}) {
  const [patterns, setPatterns] = useState([
    {id: 1, title: '샤워', minute: 10, second: 30},
    {id: 2, title: '양치', minute: 3, second: 20},
    {id: 3, title: '면도', minute: 10, second: 45},
    {id: 4, title: '머리 말리기', minute: 10, second: 45},
    {id: 5, title: '옷 고르기', minute: 10, second: 45},
    {id: 6, title: '옷 입기', minute: 10, second: 45},
    {id: 7, title: '불 끄기', minute: 10, second: 45},
    {id: 8, title: '컴퓨터 끄기', minute: 10, second: 45},
    {id: 9, title: '손 씻기', minute: 10, second: 45},
    {id: 10, title: '세수', minute: 10, second: 45},
    {id: 11, title: '티비 끄기', minute: 10, second: 45},
    {id: 12, title: '가스 끄기', minute: 10, second: 45},
    {id: 13, title: '컴퓨터 끄기', minute: 10, second: 45},
    {id: 14, title: '손 씻기', minute: 10, second: 45},
    {id: 15, title: '세수', minute: 10, second: 45},
    {id: 16, title: '티비 끄기', minute: 10, second: 45},
    {id: 17, title: '가스 끄기', minute: 10, second: 45},
  ]);
  const [groups, setGroups] = useState([
    {
      id: 1,
      title: '그룹 1',
      patterns: [
        {id: 1, title: '샤워', minute: 10, second: 30},
        {id: 2, title: '양치', minute: 3, second: 20},
      ],
    },
    {
      id: 2,
      title: '그룹 2',
      patterns: [
        {id: 3, title: '면도', minute: 10, second: 45},
        {id: 4, title: '머리 말리기', minute: 10, second: 45},
        {id: 5, title: '옷 고르기', minute: 10, second: 45},
      ],
    },
    {
      id: 3,
      title: '그룹 3',
      patterns: [
        {id: 2, title: '양치', minute: 3, second: 20},
        {id: 3, title: '면도', minute: 10, second: 45},
        {id: 4, title: '머리 말리기', minute: 10, second: 45},
        {id: 5, title: '옷 고르기', minute: 10, second: 45},
        {id: 6, title: '옷 입기', minute: 10, second: 45},
        {id: 7, title: '불 끄기', minute: 10, second: 45},
        {id: 8, title: '컴퓨터 끄기', minute: 10, second: 45},
        {id: 9, title: '손 씻기', minute: 10, second: 45},
        {id: 10, title: '세수', minute: 10, second: 45},
        {id: 11, title: '티비 끄기', minute: 10, second: 45},
      ],
    },
    {
      id: 4,
      title: '그룹 4',
      patterns: [
        {id: 8, title: '컴퓨터 끄기', minute: 10, second: 45},
        {id: 9, title: '손 씻기', minute: 10, second: 45},
        {id: 10, title: '세수', minute: 10, second: 45},
        {id: 11, title: '티비 끄기', minute: 10, second: 45},
        {id: 12, title: '가스 끄기', minute: 10, second: 45},
      ],
    },
  ]);
  const [group, setGroup] = useState(groups.length > 0 ? groups[0] : []);

  const onPressGroupCreate = () => {
    navigation.navigate('CreateGroup');
  };

  // if (!group) {
  //   return (
  //     <View style={styles.block}>
  //       <View style={styles.container}>
  //         <GroupList
  //           groups={groups}
  //           group={group}
  //           style={styles.index}
  //           onPress={setGroup}
  //         />
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <>
      {/* <ListHeader isEditing={isEditing} onPress={onPress} /> */}
      <ListHeader group={group} />
      <View style={styles.block}>
        <View style={styles.leftContainer}>
          {/* <View style={styles.groupBlock}> */}
          <GroupList
            groups={groups}
            group={group}
            style={styles.index}
            onPress={setGroup}
          />
          {/* <Pressable style={styles.press} onPress={onPressGroupCreate}>
              <Text>+</Text>
            </Pressable> */}
          {/* </View> */}
          {/* <View style={styles.patterns}>
            <Patterns patterns={group.patterns} onPress={setGroup} />
          </View> */}
        </View>
        <View style={styles.rightContainer}>
          {/* <View style={styles.groupBlock}>
            <Pressable
              style={styles.press}
              onPress={() => navigation.navigate('write')}>
              <Text>+</Text>
            </Pressable>
          </View> */}
          {/* <View style={styles.patterns}> */}
          <Patterns
            patterns={group.patterns}
            onPress={setGroup}
            isCreatingGroup={1}
          />
          {/* </View> */}
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
});
