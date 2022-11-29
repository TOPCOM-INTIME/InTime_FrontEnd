import React from 'react';
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';

function CommunityScreenList(props) {
  const { userList } = props;
  console.log(userList);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '5%',
      }}>
      {userList.length === 0 ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '65%',
          }}>
          <Text style={{ color: 'black' }}>등록된 친구가 없습니다.</Text>
        </View>
      ) : (
        userList.map(user => (
          <View style={styles.list} key={user.username}>
            <Text style={styles.titleText}>{user.username}</Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '85%',
    height: 50,
    borderColor: '#ED3648',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 10,
    // backgroundColor: '#FEE5E1'
  },
  titleText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default CommunityScreenList;
