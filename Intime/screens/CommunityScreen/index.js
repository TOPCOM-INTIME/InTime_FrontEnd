import CommunityScreenAdd from './CommunityScreenAdd.js';
import CommunityScreenList from './CommunityScreenList.js';
import TransparentCircleButton from '../../components/TransparentCircleButton';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ScrollView, View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { useUserContext } from '../../contexts/UserContext';

function CommunityScreen() {
    const { user } = useUserContext();
    const navigation = useNavigation();
    const [userList, setUserList] = useState([]);

    const onSubmit = () => {
        navigation.push('CommunityScreenAdd');
    };
    //추가된 이후 새로고침 안되는 현상 존재
    useEffect(() => {
        //API 호출
        const listcall = async () => {
            try {
                const res = await axios.get(`${API_URL}/friends`,
                    {
                        headers: { Authorization: user },
                    },
                );
                console.log('res', res.data);
                setUserList(res.data)
            } catch (err) {
                // Alert.alert('실패', '중복되는 닉네임 입니다.');
                console.error(err);
            }
        }
        listcall();
        //const userList = ["mike", "bob", "John", "Henderson", "1", "2", "3", "4", "5", "6", "7", "8"];
        const userList = [];
        // setUserList(userList)
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.tasksWrapper}>
                <View style={styles.header}>
                    <Text style={styles.sectionTitle}>친구</Text>
                    <TransparentCircleButton onPress={onSubmit} name="add" color="#424242" />
                </View>
            </View>
            <ScrollView style={{ width: '100%' }}>
                <View>
                    <CommunityScreenList userList={userList} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tasksWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default CommunityScreen;
