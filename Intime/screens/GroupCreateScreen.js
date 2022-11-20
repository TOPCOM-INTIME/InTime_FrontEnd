import React, {useContext, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WriteHeader from '../components/WriteHeader';
import WriteEditor from '../components/WriteEditor';
import {useNavigation} from '@react-navigation/native';
import Patterns from '../components/Patterns';
import {useLogContext} from '../contexts/LogContext';
import axios from 'axios';
import {useUserContext} from '../contexts/UserContext';

function GroupCreateScreen({navigation, route}) {
  const {user, setUser} = useUserContext();
  const {patterns, setPatterns, patternGroups, setPatternGroups} =
    useLogContext();
  const [group, setGroup] = useState(route.params?.group.patterns || []);
  const [name, setName] = useState(route.params?.group.name || '');
  const [loading, setLoading] = useState(false);

  console.log('스크린', group);
  console.log('name', name);
  const groupCreateHandler = async () => {
    setLoading(true);
    const groupPattern = group.map((item, index) => {
      return {name: item.name, orderInGroup: index + 1, time: item.time};
    });
    try {
      if (route.params?.group) {
        await axios.put(
          `http://175.45.204.122:8000/api/update-group-name/groupId=${route.params.group.id}`,
          {name},
          {
            headers: {Authorization: user},
          },
        );
        // await axios.put(
        //   `http://175.45.204.122:8000//api/update-group/groupId=${route.params.group.id}`,
        //   groupPattern,
        //   {
        //     headers: {Authorization: user},
        //   },
        // );
      } else {
        console.log(1);
        const res = await axios.post(
          'http://175.45.204.122:8000/api/patterngroup',
          {name},
          {
            headers: {Authorization: user},
          },
        );
        console.log(res.data);
        const groupId = res.data.data;
        await axios.post(
          `http://175.45.204.122:8000/api/PatternsWithGroup/groupId=${groupId}`,
          groupPattern,
          {
            headers: {Authorization: user},
          },
        );
      }
      const fetchedGroup = await axios.get(
        'http://175.45.204.122:8000/api/groups-with-patterns/all',
        {
          headers: {Authorization: user},
        },
      );
      setPatternGroups(fetchedGroup.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    navigation.pop();
  };

  console.log(name);
  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        placeholder="그룹 이름"
        value={name}
      />
      <View style={styles.block}>
        <View style={styles.container}>
          <View style={styles.text}>
            <Text style={styles.header}>패턴 목록</Text>
          </View>
          <Patterns
            patterns={patterns}
            setGroup={setGroup}
            isCreatingGroup={2}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.text}>
            <Text style={styles.header}>선택된 패턴</Text>
          </View>
          <Patterns patterns={group} setGroup={setGroup} isCreatingGroup={2} />
        </View>
      </View>
      <View style={styles.text}>
        <Text style={styles.caution}>
          그룹에 넣고 싶은 패턴을 순서대로 클릭하여 주세요.
        </Text>
      </View>
      {loading ? (
        <View style={styles.buttonView} />
      ) : (
        <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={() => navigation.pop()}>
            <Text style={styles.caution}>뒤로</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={groupCreateHandler}>
            <Text style={styles.caution}>저장</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    color: 'black',
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
    width: '50%',
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
  input: {
    borderColor: '#ee2f48',
    borderWidth: 1,
    color: 'black',
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
    placeholderTextColor: 'black',
  },
  caution: {
    color: 'gray',
  },
});

export default GroupCreateScreen;
