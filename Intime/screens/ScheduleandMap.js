import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Image,
    ScrollView,
    TouchableOpacity,
    Button,
    PermissionsAndroid,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapMarker from './MapMarker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { API_URL } from '@env';
import BackgroundService from 'react-native-background-actions';
import { useUserContext } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state',]);

const options = {
    taskName: '위치',
    taskTitle: '위치 전송기',
    taskDesc: '내 위치를 주기적으로 파트너에게 알려주는 중...',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'Intime://',
    parameters: {
        delay: 1000,
        //1000 for test, 3000 for real service
        //delay : 3000, 
    },
};

const ScheduleandMap = route => {
    const sid = route.route.params.ID;
    const initdate = route.route.params.startTime;
    const enddate = route.route.params.endTime;
    console.log('s_id', sid)
    console.log(initdate, enddate)
    const navigation = useNavigation();
    const { user, setUser } = useUserContext();
    const [location, setLocation] = useState(false); //do not modify this value
    const [myid, setmyid] = useState([]);

    const [position, setPosition] = useState({
        //default center view
        latitude: 37.266833,
        longitude: 127.000019,
    });

    const [markerlist, setmarkerlist] = useState([]);

    //delete all dummy and parse marker

    const getmyid = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/my-info`, {
                headers: {
                    Authorization: user,
                },
            });
            console.log(res.data);
            setmyid(res.data.id);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getmyid();
    }, [position]);

    const userlist = [
        { username: '코카콜라', id: '1' },
        { username: '테슬라', id: '2' },
        { username: '메타', id: '3' },
        { username: '스타벅스', id: '4' },
        { username: '알파벳', id: '5' },
        { username: '펩시', id: '6' },
    ];

    // const markerlist = [

    //     {
    //         id: '1',
    //         latitude: position.latitude + 0.001,
    //         longitude: position.longitude + 0.001,
    //         color: "green",
    //     },
    //     {
    //         id: '2',
    //         latitude: position.latitude + 0.001,
    //         longitude: position.longitude - 0.001,
    //         color: "green",
    //     },
    //     {
    //         id: '3',
    //         latitude: position.latitude - 0.001,
    //         longitude: position.longitude + 0.001,
    //         color: "green",
    //     },
    //     {
    //         id: '4',
    //         latitude: position.latitude - 0.001,
    //         longitude: position.longitude - 0.001,
    //         color: "green",
    //     },
    // ];

    const sleep = time =>
        new Promise(resolve => setTimeout(() => resolve(), time));

    const backgroundHandler = async () => {
        console.log('hi');
        await BackgroundService.start(backpostservice, options);
    };

    const backpostservice = async taskDataArguments => {
        const { delay } = taskDataArguments;
        await new Promise(async resolve => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                console.log(i);
                if (i % 5 === 0) {
                    console.log('Hello locationapi!');
                    getLocation();
                    console.log('Hello postapi!', BackgroundService.isRunning());
                    mylocationpost();
                    console.log(new Date());
                }
                if (enddate <= new Date()) {
                    console.log('Bye~time is over');
                    await BackgroundService.stop();
                }
                if (i >= 100000) {
                    Alert.alert('오류', '관리자에게 문의하세요 errorcode timeout_at_backgroundservice')
                    console.log('crazy time out')
                    await BackgroundService.stop();
                }
                await sleep(delay);
            }
        });
    };

    const stopHandler = async () => {
        await BackgroundService.stop();
    };

    const grouplocationpost = async () => {
        try {
            const res = await axios.post(
                `${API_URL}/api/${sid}/location`,
                {
                    gps_x: position.latitude,
                    gps_y: position.longitude,
                    id: myid,
                },
                {
                    headers: {
                        Authorization: user,
                    },
                },
            );
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const mylocationpost = async () => {
        try {
            const res = await axios.post(
                `${API_URL}/api/location`,
                {
                    gps_x: position.latitude,
                    gps_y: position.longitude,
                },
                {
                    headers: {
                        Authorization: user,
                    },
                },
            );
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getLocationfromapi = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/location`, {
                headers: {
                    Authorization: user,
                },
            });
            console.log(res.data);
            if (res.data) {
                setPosition({
                    latitude: parseFloat(res.data.gps_x),
                    longitude: parseFloat(res.data.gps_y),
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getgroupLocation = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/${sid}/locations`,
                {
                    headers: {
                        Authorization: user,
                    },
                });
            console.log(res.data);
            setmarkerlist(res.data);
            console.log('markerlist', markerlist)
        } catch (err) {
            console.error(err);
        }
    };

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            console.log('granted', granted);
            if (granted === 'granted') {
                console.log('You can use Geolocation');
                return true;
            } else {
                console.log('You cannot use Geolocation');
                return false;
            }
        } catch (err) {
            return false;
        }
    };

    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
            console.log('res is:', res);
            if (res) {
                Geolocation.getCurrentPosition(
                    position => {
                        console.log(position);
                        setLocation(position);
                        setPosition({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    error => {
                        console.log(error.code, error.message);
                        setLocation(false);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        });
        console.log(location);
    };

    const pressusername = username => {
        console.log(username, '의 위치 표시하기');
        console.log('myid', myid);
        console.log(new Date());
        console.log(terminatedate);
    };

    return (
        <>
            <View>
                <View style={styles.userlistwrapper}>
                    {userlist.length > 0 ? (
                        <View>
                            <ScrollView horizontal={true}>
                                {userlist.map(user => (
                                    <View key={user.id}>
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => pressusername(user.username)}>
                                                <Text style={styles.textlist}>{user.username}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.textlist}>친구 없는 경우</Text>
                        </View>
                    )}
                </View>
            </View>
            <View>
                {/* 아래 버튼은 자동화 구현 후 삭제 예정 */}
                <Button title="grouplocationpost" onPress={grouplocationpost}></Button>
                <Button title="getgroupLocation" onPress={getgroupLocation}></Button>
                <Button title="stopHandler" onPress={stopHandler}></Button>
                <Button title="backgroundHandler" onPress={backgroundHandler} />
                <Button title="getLocation" onPress={getLocation} />
                <Button title="getLocationfromapi" onPress={getLocationfromapi} />
                <Button title="뒤로가기" onPress={() => navigation.pop()} />
            </View>
            <View style={{ flex: 9 }}>
                <View style={{ flex: 1, padding: 10 }}>
                    <MapView
                        style={{ flex: 1 }}
                        provider={PROVIDER_GOOGLE}
                        region={{
                            latitude: position.latitude,
                            longitude: position.longitude,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.04,
                        }}>
                        {/* <Marker
                            id="0"
                            title={'내 위치'}
                            pinColor="red"
                            coordinate={{
                                latitude: position.latitude,
                                longitude: position.longitude,
                            }}>
                            <Image
                                style={{ width: 26, height: 28 }}
                                source={require('../img04.gif')}
                            />
                        </Marker> */}

                        {markerlist.map(marker => (
                            <Marker
                                key={marker.username}
                                title={marker.username}
                                coordinate={{
                                    latitude: marker.gps_x,
                                    longitude: marker.gps_y,
                                }}
                            >
                                <Image
                                    style={{ width: 26, height: 28 }}
                                    source={require('../img04.gif')}
                                />
                            </Marker>
                        ))}
                    </MapView>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    userlistwrapper: {
        borderRadius: 10,
        borderColor: 'pink',
        borderWidth: 3,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 1,
    },
    textlist: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 24,
        paddingHorizontal: 10,
    },
});

export default ScheduleandMap;
