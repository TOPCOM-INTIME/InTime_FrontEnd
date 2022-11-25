
import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TransparentCircleButton from '../../components/TransparentCircleButton';

function CommunityScreenAdd() {
    const [word, setWord] = useState('')
    const [isSearch, setisSearch] = useState(true);
    const [list, setList] = useState([])
    const [phase, setPhase] = useState('init'); // init, loading, done
    const navigation = useNavigation();

    const onSubmit = () => {
        // 통신 word를 쏴줌 // try catch
        setPhase('loading')
        console.log('word', word)
        const list = [{ name: "mike", id: '123' }, { name: "john", id: '456' },]
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

    const onPressSend = (uId) => {
        // uId로 통신 try catch
        console.log('uId', uId)
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
                <Button title="검색목록" disabled={isSearch} onPress={togglePage} />
                <Button title="받은요청" disabled={!isSearch} onPress={togglePage} />
            </View>

            {isSearch ?
                <View>
                    <View>
                        <TextInput style={{ borderWidth: 1 }} value={word} onChangeText={onChangeInput} />
                        <Button title="검색" onPress={onSubmit} />
                    </View>
                    {list.length > 0 ?
                        <View>{list.map(user => <View key={user.id}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text>{user.name}</Text>
                                <Button title="send" onPress={() => onPressSend(user.id)} />
                            </View>
                        </View>)}</View> : phase !== "init" ? <View><Text style={{ color: "black" }}>결과가 없습니다.</Text></View> : null}
                </View>
                :
                <View>
                    <View><Text>받은요청이 없습니다.</Text></View>
                </View>}

        </View>
    );
}

const styles = StyleSheet.create({
    buttonarea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconButton: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },

});

export default CommunityScreenAdd;
