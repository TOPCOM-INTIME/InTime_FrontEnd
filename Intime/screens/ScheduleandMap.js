import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    ScrollView,
    TouchableOpacity,
    Button,
    PermissionsAndroid,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import MapMarker from './MapMarker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { API_URL } from '@env';
import BackgroundService from 'react-native-background-actions';
import { useUserContext } from '../contexts/UserContext';

const options = {
    taskName: '위치',
    taskTitle: '위치 전송기',
    taskDesc: '내 위치를 주기적으로 파트너에게 알려주는 중...',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'Intime://', // See Deep Linking for more info
    parameters: {
        delay: 1000,
    },
};

function ScheduleandMap() {
    const { user, setUser } = useUserContext();
    const [location, setLocation] = useState(false);
    const [position, setPosition] = useState({
        latitude: 37.266833,
        longitude: 127.000019,
    });

    const userlist = [{ username: "KSJ" }, { username: "김치" }, { username: "가죽" }]

    const markerlist = [

        {
            id: '1',
            latitude: position.latitude + 0.001,
            longitude: position.longitude + 0.001,
            color: "green",
        },
        {
            id: '2',
            latitude: position.latitude + 0.001,
            longitude: position.longitude - 0.001,
            color: "green",
        },
        {
            id: '3',
            latitude: position.latitude - 0.001,
            longitude: position.longitude + 0.001,
            color: "green",
        },
        {
            id: '4',
            latitude: position.latitude - 0.001,
            longitude: position.longitude - 0.001,
            color: "green",
        },
    ];

    const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

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
                    console.log("Hello locationapi!")
                    getLocation();
                    console.log("Hello postapi!", BackgroundService.isRunning())
                    mylocationpost();
                }
                if (i === 100) {
                    console.log("Bye~")
                    await BackgroundService.stop();
                }
                await sleep(delay);
            }
        });
    };

    const stopHandler = async () => {
        await BackgroundService.stop();
    };

    const mylocationpost = async () => {
        try {
            const res = await axios.post(`${API_URL}/api/location`,
                {
                    gps_x: position.latitude,
                    gps_y: position.longitude,
                },
                {
                    headers: {
                        Authorization: user,
                    }
                }
            );
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    }

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

    const latlongplus = () => {
        setPosition(
            position.latitude + 0.001,
            position.longitude + 0.001,
        )
        console.log(position)
    };




    return (
        <>
            <View style={styles.container}>
                <View >
                    <View >
                        <Text style={{ color: 'black' }}>뒤로가기 버튼 만들기</Text>
                        <View
                            style={styles.userlistwrapper}>
                            {userlist.length > 0 ?
                                <View>
                                    <ScrollView horizontal={true}>
                                        {userlist.map(user => <View key={user.username}>
                                            <View >
                                                <TouchableOpacity>
                                                    <Text style={styles.textlist}>{user.username}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>)}
                                    </ScrollView>
                                </View>
                                : <View><Text style={styles.textlist}>친구 없는 경우</Text></View>}
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Button title="stopHandler" onPress={stopHandler}></Button>
                <Button title='Background' onPress={backgroundHandler} />
                <Button title='Plus' onPress={getLocation} />
            </View>
            <View style={{ flex: 9 }}>
                <View style={{ flex: 1, padding: 10 }} >
                    <MapView
                        style={{ flex: 1 }}
                        provider={PROVIDER_GOOGLE}
                        region={{
                            latitude: position.latitude,
                            longitude: position.longitude,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.04,
                        }}>

                        {markerlist.map(marker => (
                            <Marker
                                key={marker.id}
                                pinColor={marker.color}
                                title={marker.id}
                                coordinate={{
                                    latitude: marker.latitude,
                                    longitude: marker.longitude,
                                }}
                            />
                        ))}

                    </MapView>
                </ View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    userlistwrapper: {
        borderRadius: 10,
        borderColor: '#ED3648',
        borderWidth: 3,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 20,
        margin: 1,
    },
    textlist: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 24,
        paddingHorizontal: 10,
    }
});

export default ScheduleandMap;
