import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Button, TouchableOpacity, TextInput, Alert } from 'react-native';


function CommunityScreenRequestList() {
    const [list, setList] = useState([])

    const getList = () => {
        //통신 요청 리스트 가져옴
        const list = ["mike", "bob", "Kim"]
        setList(list);
    }

    const addPush = () => {
        //수락 post
        Alert.alert('수락 완료', '친구 목록이 추가되었어요.')
    }

    const refusePush = () => {
        //거절 post
        Alert.alert('거절', '거절되었어요.')
    }

    //최초에 API불러와야함..
    return (
        <View>
            {list.length > 0 ?
                <View>{list.map(user => <View key={user}>
                    <View>
                        <ScrollView>
                            <View style={styles.requestList}>
                                <Text style={styles.listText}>{user}</Text>
                                <View style={{
                                    justifyContent: 'flex-end',
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                    <View style={{ marginHorizontal: 3, marginVertical: 5, }}>
                                        <Button color='pink' title="수락" onPress={addPush} />
                                    </View>
                                    <View style={{ margin: 5 }}>
                                        <Button color='pink' title="거절" onPress={refusePush} />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>)}

                </View> :
                <View><Text>받은요청이 없습니다.</Text></View>}
            <View style={{}}>
                <Button title="새로고침" onPress={getList}></Button>
            </View>
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