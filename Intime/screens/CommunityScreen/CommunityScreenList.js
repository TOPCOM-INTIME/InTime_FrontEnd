import React from 'react';
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';

function CommunityScreenList(props) {
    const { userList } = props;
    console.log(userList)
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '80%',
            }}>
            {userList.length === 0 ? <Text style={{ color: 'black' }}>등록된 친구가 없습니다.</Text> :
                userList.map(user => <View key={user}><Text>{user}</Text></View>)
            }

        </View>
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

export default CommunityScreenList;
