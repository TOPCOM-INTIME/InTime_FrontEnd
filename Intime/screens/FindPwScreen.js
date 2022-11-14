import React, { useState, useRef } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    SafeAreaView,
    View,
    Platform,
    Text,
    StyleSheet,
    Keyboard,
    Button,
} from 'react-native';
import SignButtons from '../components/SignButtons';
import SignUpForm from '../components/SignUpForm';
import axios from 'axios';
import authStorage from '../stroages/authStorage';
import { useUserContext } from '../contexts/UserContext';
import BorderedInput from '../components/BorderedInput';


function FindPwScreen({ navigation, route }) {
    const emailRef = useRef();
    const { user, setUser } = useUserContext();
    const [userData, setUserData] = useState({
        email: '',
    });
    const [loading, setLoading] = useState(false);

    const createChangeTextHandler = name => value => {
        setUserData({ ...userData, [name]: value });
    };

    const onSubmit = async () => {
        Keyboard.dismiss();
        // if (isSignUp && userData.password !== userData.confirmPassword) {
        //     Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
        //     return;
        // }
        // if (isSignUp) {
        //     const data = {
        //         // username: userData.username,
        //         //password: userData.password,
        //         email: userData.email,
        //     };
        //     console.log(data);
        //     setLoading(true);
        //     try {
        //         const res = await axios.post('http://175.45.204.122:8000/join', data);
        //         // const res = await axios.post('http://175.45.204.122:8000/join', null, {
        //         //   params: {...data},
        //         //   headers: {'Content-Type': 'application/json'},
        //         // });
        //         console.log('결과', res.data);
        //         navigation.pop();
        //     } catch (err) {
        //         console.log('에러');
        //         console.log(err.response.status);
        //         if (err.response.status === 500) {
        //             Alert.alert(
        //                 // 말그대로 Alert를 띄운다
        //                 '이메일 중복', // 첫번째 text: 타이틀 제목
        //                 '다른 이메일을 입력해주세요', // 두번째 text: 그 밑에 작은 제목
        //                 [
        //                     // 버튼 배열
        //                     { text: '확인' }, //버튼 제목
        //                     // 이벤트 발생시 로그를 찍는다
        //                 ],
        //                 { cancelable: false },
        //             );
        //         }
        //     } finally {
        //         setLoading(false);
        //     }
        // } else {
        const data = {
            email: userData.email,
        };
        setLoading(true);
        try {
            const res = await axios.post('http://175.45.204.122:8000/email?email=', data.email);
            console.log('결과', res.data);
            Alert.alert(
                '이메일 전송 성공'
            );
        } catch (err) {
            Alert.alert(
                '실패'
            );
            console.log(data.email);
            console.log('에러');
            console.error(err);
        } finally {
            setLoading(false);
        }

    };
    return (
        <>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.select({ ios: 'padding' })}>
                <SafeAreaView style={styles.fullscreen}>
                    <Text style={styles.text}>InTime</Text>
                    <Text>이메일을 입력해 주세요.</Text>
                    <View style={styles.form}>
                        <BorderedInput
                            placeholder="이메일"
                            ref={emailRef}
                            keyboardType="email-address"
                            returnKeyType="next"
                            onChangeText={createChangeTextHandler('email')}
                            // onSubmitEditing={() => passwordRef.current.focus()}
                            hasMarginBottom
                        />
                        <Button
                            title='비밀번호 전송하기'
                            onPress={onSubmit}
                            color='#ee2f48'
                        />
                        {/* <SignButtons
                            onSubmit={onSubmit}
                            isSignUp={isSignUp}
                            loading={loading}
                        /> */}
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    fullscreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        marginTop: 24,
        width: '100%',
        paddingHorizontal: 16,
    },
});

export default FindPwScreen;
