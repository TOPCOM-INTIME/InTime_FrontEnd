import React, {useContext, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
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
import {API_URL} from '@env';
import {AppBar, TextInput, IconButton} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';

function GroupCreateScreen({navigation, route}) {
  const {user, setUser} = useUserContext();
  const {patterns, setPatterns, patternGroups, setPatternGroups} =
    useLogContext();
  const [group, setGroup] = useState(route.params?.group.patterns || []);
  const [name, setName] = useState(route.params?.group.name || '');
  const [loading, setLoading] = useState(false);

  const groupCreateHandler = async () => {
    if (group.length === 0) {
      Alert.alert('실패', '패턴을 등록해야 합니다.');
      return;
    }
    if (name === '') {
      Alert.alert('실패', '이름을 등록해야 합니다.');
      return;
    }
    setLoading(true);
    const groupPattern = group.map(item => item.id);
    console.log(groupPattern);
    try {
      if (route.params?.group) {
        await axios.put(
          `${API_URL}/api/update-group/groupId=${route.params.group.id}`,
          {name, patterns_Ids: groupPattern},
          {
            headers: {Authorization: user},
          },
        );
      } else {
        const res = await axios.post(
          `${API_URL}/api/patterngroup`,
          {name},
          {
            headers: {Authorization: user},
          },
        );
        console.log(res.data);
        const groupId = res.data.data;
        await axios.post(
          `${API_URL}/api/PatternsWithGroup/groupId=${groupId}`,
          {patterns_Ids: groupPattern},
          {
            headers: {Authorization: user},
          },
        );
      }
      const fetchedGroup = await axios.get(
        `${API_URL}/api/groups-with-patterns/all`,
        {
          headers: {Authorization: user},
        },
      );
      console.log(fetchedGroup.data);
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
      <AppBar
        title={route.params?.group ? '그룹 수정' : '그룹 생성'}
        titleStyle={{fontFamily: 'NanumSquareRoundEB'}}
        centerTitle={true}
        color="#6c757d"
        tintColor="white"
        leading={props => (
          <IconButton
            icon={props => <Icon name="chevron-left" {...props} />}
            color="white"
            onPress={() => navigation.pop()}
            {...props}
          />
        )}
        trailing={props =>
          loading ? (
            <></>
          ) : (
            <IconButton
              icon={props => <Icon name="check" {...props} />}
              color="green"
              onPress={groupCreateHandler}
            />
          )
        }
      />
      <TextInput
        onChangeText={setName}
        label="그룹 이름"
        color="#6c757d"
        value={name}
      />
      <View style={styles.text}>
        <Text style={styles.caution}>
          그룹에 넣고 싶은 패턴을 순서대로 클릭하여 주세요.
        </Text>
      </View>
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
    borderColor: '#6c757d',
    borderRightWidth: 1,
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
