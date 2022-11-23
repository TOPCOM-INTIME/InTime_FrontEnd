import CommunityScreenAdd from './CommunityScreenAdd.js';
import CommunityScreenList from './CommunityScreenList.js';

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';

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
        const userList = ["mike", "bob"];
        setUserList(userList)
    }, [])
    return (
        <ScrollView style={{ width: '100%' }}>
            <View style={styles.tasksWrapper}>
                <View style={styles.header}>
                    <Text style={styles.sectionTitle}>친구</Text>
                    <Button title='추가' onPress={toggleRoute} />
                </View>
                {route === 'list' ? <CommunityScreenList userList={userList} /> : <CommunityScreenAdd />}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
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
    form: {
        marginTop: 80,
        width: '100%',
        paddingHorizontal: 16,
    },
    button: {
        flexDirection: 'row-reverse',
        margin: 15,
    },
});

export default CommunityScreen;
