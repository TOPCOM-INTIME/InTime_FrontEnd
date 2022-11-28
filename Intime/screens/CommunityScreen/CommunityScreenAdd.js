
import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TransparentCircleButton from '../../components/TransparentCircleButton';
import RequestList from './CommunityScreenRequestList';
import Icon from 'react-native-vector-icons';
import axios from 'axios';
import { API_URL } from '@env';
import { useUserContext } from '../../contexts/UserContext';

function CommunityScreenAdd() {
    const { user } = useUserContext();
    const [word, setWord] = useState('')
    const [isSearch, setisSearch] = useState(true);
    const [list, setList] = useState([])
    const [phase, setPhase] = useState('init'); // init, loading, done
    const navigation = useNavigation();

    const onSubmit = () => {
        // 통신 word를 쏴줌 // try catch
        setPhase('loading')
        console.log('word', word)
        const list = [{ name: "치킨", id: '1' }, { name: "피자", id: '2' }]
        // const list = []
        setList(list);
        setPhase('done')
    }

    const togglePage = () => {
        setisSearch(prev => !prev)
        console.log('isSearch', isSearch)
    }

    const onChangeInput = (text) => {
        setWord(text)
    }

    const onGoBack = () => {
        navigation.pop();
    };

    const onPressSend = (name) => {
        // uId로 통신 try catch
        // const data = { username: "치킨" }
        try {
            const res = axios.post(`${API_URL}/friends/request`, name,
                {
                    headers: { Authorization: user }
                }
            );
            console.log('res', res)
            Alert.alert("성공!", "상대방에게 친구 신청을 보냈어요.")
        } catch (err) {
            Alert.alert('실패', '친구 신청 실패.');
            console.error('err', err);
            throw err
        }
        // Alert.alert("성공!", "상대방에게 친구 신청을 보냈어요.")
        console.log('apiurl', API_URL)
        console.log('data', name)
    }


    //일단 ifelse로 구현하고 -> 하나의 리턴값으로 리팩토링 -> 컴포넌트화
    //리팩토링에 더 많은 시간 할당하기

    return (
        <View>
            <View style={styles.iconButton}>
                <TransparentCircleButton
                    onPress={onGoBack}
                    name="arrow-back"
                    color="#000000"
                />
            </View>

            <View style={styles.buttonarea}>
                <View style={{ flex: 1, margin: 5 }}>
                    <Button color="#ff5c5c" title="친구검색" disabled={isSearch} onPress={togglePage} />
                    {/* <TouchableOpacity
                        disabled={isSearch}
                        //아래 스타일에서 불러오면 오류, 현재에서 처리해야함 -> 어떻게 깔끔하게 할까?
                        style={{
                            opacity: !isSearch ? 1.0 : 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            flex: 1,
                            backgroundColor: '#ff5c5c'
                        }}
                        onPress={togglePage}
                    >
                        <Text style={{ color: 'yellow' }}>친구검색</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={{ flex: 1, margin: 5 }}>
                    <Button color="#ff5c5c" title="받은요청" disabled={!isSearch} onPress={togglePage} />
                    {/* <TouchableOpacity
                    //이걸로 띄울시 컴포넌트 전체가 비활성화되는 오류 있음
                        disabled={!isSearch}
                        style={{
                            opacity: isSearch ? 1.0 : 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            flex: 1,
                            backgroundColor: '#ff5c5c'
                        }}
                        onPress={togglePage}
                    >
                        <Text style={{ color: 'yellow' }}>받은요청</Text>
                    </TouchableOpacity> */}
                </View>
            </View>

            {
                isSearch ?
                    <View>
                        <View>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <View style={{ flex: 5, margin: 1 }}>
                                    <TextInput
                                        style={{ borderWidth: 2, margin: 3, borderRadius: 5, borderColor: 'pink' }}
                                        value={word}
                                        onChangeText={onChangeInput}
                                        placeholder="닉네임을 입력하세요."
                                        placeholderTextColor='gray'
                                    />
                                </View>
                                <View style={{ flex: 1, margin: 2 }}>
                                    <Button color="#ff5c5c" title="닉네임 검색" onPress={onSubmit} />
                                </View>
                            </View>
                        </View>
                        {list.length > 0 ?
                            <View><ScrollView>{list.map(user => <View key={user.id}>
                                <View style={styles.addList}>
                                    <Text style={styles.listText}>{user.name}</Text>
                                    <View style={{ margin: 5 }}>
                                        <Button color='pink' title="친구 추가" onPress={() => onPressSend(user.name)} />
                                    </View>
                                </View>
                            </View>)}</ScrollView></View> : phase !== "init" ?
                                <View style={{ marginTop: '50%', alignItems: 'center' }}>
                                    <Text style={{ color: "gray", fontSize: 20, fontWeight: 'bold' }}>
                                        검색 결과가 없습니다.
                                    </Text>
                                </View> : null}
                    </View>
                    :
                    <View>
                        <RequestList />
                    </View>
            }

        </View >
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
        borderColor: '#ff5c5c',
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

export default CommunityScreenAdd;
