import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Platform,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';
import {API_URL} from '@env';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Text,
  VStack,
  HStack,
  Button,
} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useLogContext} from '../contexts/LogContext';

function InvitationScreen() {
  const navigation = useNavigation();
  const {user, setUser} = useUserContext();
  const {scheduleInvite, setScheduleInvite} = useLogContext();

  const OnPrimaryPress = item => {
    navigation.push('ScheduleScreen', item);
  };

  const onSecondaryButtonPress = () => {
    navigation.pop();
  };

  let content = (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>초대받은 일정이 없습니다.</Text>
    </View>
  );
  if (scheduleInvite.length > 0) {
    content = (
      <ScrollView>
        <VStack
          mt={4}
          divider={true}
          dividerStyle={{backgroundColor: '#343a40'}}>
          {scheduleInvite.map(item => (
            <Box
              key={item.schedulePoolId}
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                height: 60,
              }}>
              {console.log(new Date(item.endTime).toISOString())}
              <VStack style={{marginLeft: 10}}>
                <Text>보낸 사람:{item.invitorName}</Text>
                <Text>도착지:{item.destName}</Text>
                <Text>약속 시간:{new Date(item.endTime).toLocaleString()}</Text>
              </VStack>
              <HStack spacing={4} style={{marginRight: 15}}>
                <Button
                  // style={{marginRight: 15}}
                  title="수락"
                  color="#6c757d"
                  onPress={() => OnPrimaryPress(item)}
                />
                <Button
                  // style={{marginRight: 15}}
                  title="거절"
                  color="#6c757d"
                  onPress={() => {
                    Alert.alert('실패', '거절은 안 됩니다.');
                  }}
                />
              </HStack>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    );
  }

  return (
    <>
      <AppBar
        title="단체 일정 초대함"
        centerTitle={true}
        color="#6c757d"
        titleStyle={{fontFamily: 'NanumSquareRoundEB'}}
        leading={props => (
          <IconButton
            icon={props => <Icon name="chevron-left" {...props} />}
            color="white"
            onPress={() => navigation.pop()}
            {...props}
          />
        )}
      />
      {content}
    </>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InvitationScreen;
