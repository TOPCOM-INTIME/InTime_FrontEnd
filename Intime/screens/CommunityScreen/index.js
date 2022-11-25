import CommunityScreenAdd from './CommunityScreenAdd.js';
import CommunityScreenList from './CommunityScreenList.js';
import TransparentCircleButton from '../../components/TransparentCircleButton';

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ScrollView, View, Text, Button, Icon } from 'react-native';

function CommunityScreen() {
    const navigation = useNavigation();

    const [userList, setUserList] = useState([]);

    const onSubmit = () => {
        navigation.push('CommunityScreenAdd');
    };

    useEffect(() => {
        //API 호출
        const userList = ["mike", "bob", "John", "Henderson", "1", "2", "3", "4", "5", "6", "7", "8"];
        //const userList = [];
        setUserList(userList)
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
