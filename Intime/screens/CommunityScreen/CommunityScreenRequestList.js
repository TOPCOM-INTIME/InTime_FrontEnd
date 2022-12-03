import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';
import {useUserContext} from '../../contexts/UserContext';
import {
  Box,
  Text,
  HStack,
  ListItem,
  Button,
  VStack,
} from '@react-native-material/core';
import {useLogContext} from '../../contexts/LogContext';

function CommunityScreenRequestList() {
  const {user} = useUserContext();
  const {friendInvite, setFriendInvite} = useLogContext();

  const addPush = async userId => {
    //수락 통신 API
    try {
      const res = await axios.put(
        `${API_URL}/friends/request/${userId}`,
        {
          body: null,
        },
        {
          headers: {Authorization: user},
        },
      );
      const newList = friendInvite.filter(userObj => userObj.id !== userId);
      setFriendInvite(newList);
      Alert.alert('수락 완료', '친구 목록이 추가되었어요.');
      console.log('userid', userId);
      //요기서
    } catch (err) {
      Alert.alert('에러!', '에러가 발생 했어요.');
      console.err(err);
      console.log('userid', userId);
    }
  };

  const refusePush = async userId => {
    try {
      const res = await axios.delete(`${API_URL}/friends/request/${userId}`, {
        headers: {Authorization: user},
      });
      const newList = friendInvite.filter(userObj => userObj.id !== userId);
      setFriendInvite(newList);
      Alert.alert('거절 완료', '거절되었어요.');
      console.log('userid', userId);
    } catch (err) {
      Alert.alert('에러!', '에러가 발생 했어요.');
      console.err(err);
      console.log('userid', userId);
    }
  };

  console.log(friendInvite);
  return (
    <View>
      {friendInvite.length > 0 ? (
        <ScrollView>
          <VStack
            mt={4}
            divider={true}
            dividerStyle={{backgroundColor: '#343a40'}}>
            {friendInvite.map(user => (
              <Box
                key={user.id}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  height: 60,
                }}>
                <Text color="#212121" style={{fontSize: 18, marginLeft: 15}}>
                  {user.username}
                </Text>
                <HStack spacing={4} style={{marginRight: 15}}>
                  <Button
                    // style={{marginRight: 15}}
                    title="수락"
                    color="#6c757d"
                    onPress={() => {
                      addPush(user.id);
                    }}
                  />
                  <Button
                    // style={{marginRight: 15}}
                    title="거절"
                    color="#6c757d"
                    onPress={() => {
                      refusePush(user.id);
                    }}
                  />
                </HStack>
              </Box>
              // <Box key={user.id}>
              //   <View>
              //     <View style={styles.requestList}>
              //       <Text style={styles.listText}>{user.username}</Text>
              //       <View
              //         style={{
              //           justifyContent: 'flex-end',
              //           display: 'flex',
              //           flexDirection: 'row',
              //         }}>
              //         <View style={{marginHorizontal: 3, marginVertical: 5}}>
              //           <Button
              //             color="pink"
              //             title="수락"
              //             onPress={() => {
              //               addPush(user.id);
              //             }}
              //           />
              //         </View>
              //         <View style={{margin: 5}}>
              //           <Button
              //             color="pink"
              //             title="거절"
              //             onPress={() => {
              //               refusePush(user.id);
              //             }}
              //           />
              //         </View>
              //       </View>
              //     </View>
              //   </View>
              // </Box>
            ))}
          </VStack>
        </ScrollView>
      ) : (
        <View style={{marginTop: '50%', alignItems: 'center'}}>
          <Text style={{color: 'gray', fontSize: 20, fontWeight: 'bold'}}>
            받은 요청이 없습니다.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  requestList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ff5c5c',
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 7,
    marginVertical: 4,
  },
  iconButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  addList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    borderWidth: 1,
    margin: 2,
  },
  listText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default CommunityScreenRequestList;
