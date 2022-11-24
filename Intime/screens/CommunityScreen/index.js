import CommunityScreenAdd from './CommunityScreenAdd.js';
import CommunityScreenList from './CommunityScreenList.js';
import TransparentCircleButton from '../../components/TransparentCircleButton';

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Button, Icon } from 'react-native';

function CommunityScreen() {
    const [route, setRoute] = useState("list") // list, add
    const [userList, setUserList] = useState([]);
    console.log('a')
    const toggleRoute = () => {
        if (route === "list") {
            setRoute("add")
        } else {
            setRoute("list")
        }
    }
    useEffect(() => {
        //API 호출
        const userList = ["mike", "bob", "John"];
        //const userList = [];
        setUserList(userList)
    }, [])
    return (
        <ScrollView style={{ width: '100%' }}>
            <View style={styles.tasksWrapper}>
                <View style={styles.header}>
                    <Text style={styles.sectionTitle}>친구</Text>
                    <TransparentCircleButton onPress={toggleRoute} name="add" color="#424242" />
                </View>
            </View>
            <View>
                {route === 'list' ? <CommunityScreenList userList={userList} /> : <CommunityScreenAdd />}
            </View>
        </ScrollView>
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
