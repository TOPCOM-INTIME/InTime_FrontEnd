import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Button, TouchableOpacity, TextInput, Alert } from 'react-native';


function CommunityScreenRequestList() {
    const [list, setList] = useState([])

    const getList = () => {
        //통신 요청 리스트 가져옴
        const list = ["mike", "bob"]
        setList(list);
    }

    return (
        <View>
            {list.length > 0 ?
                <View>{list.map(user => <View key={user}>
                    <View>
                        <ScrollView>
                            <Text style={styles.listText}>{user}</Text>
                            <View style={{ margin: 5 }}>
                                <Button color='pink' title="수락" />
                            </View>
                            <View style={{ margin: 5 }}>
                                <Button color='pink' title="거절" />
                            </View>
                        </ScrollView>
                    </View>
                </View>)}

                </View> :
                <View><Text>받은요청이 없습니다.</Text></View>}
            <View><Button title="새로고침" onPress={getList}></Button></View>
        </View>
    );
}

const styles = StyleSheet.create({
    // button: {
    //     opacity: isSearch ? 0.1 : 0.7,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 5,
    //     flex: 1,
    //     backgroundColor: '#ff5c5c'
    // },
    buttonarea: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between'
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
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});

export default CommunityScreenRequestList;