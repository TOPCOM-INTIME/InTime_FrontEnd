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
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { API_URL } from '@env';
import BackgroundService from 'react-native-background-actions';
import { useUserContext } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { AppBar, IconButton, Box, ListItem } from '@react-native-material/core';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

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
    delay: 12000,
    //1000 for test, 3000 for real service
    //delay : 3000,
  },
};

const ScheduleandMap = route => {
  console.log('back', BackgroundService.isRunning());
  const sid = route.route.params.ID;
  const initdate = route.route.params.startTime;
  const enddate = route.route.params.endTime;
  const endX = route.route.params.endY;
  const endY = route.route.params.endX;
  // console.log('s_id', sid)
  // console.log(initdate, enddate)
  console.log('종료 좌표!!', endX, endY);
  const navigation = useNavigation();
  const { user, setUser } = useUserContext();
  const [location, setLocation] = useState(false); //do not modify this value
  const [myid, setmyid] = useState([]);

  const [position, setPosition] = useState({
    latitude: 37.266833,
    longitude: 127.000019,
  });

  const [localdata, setlocaldata] = useState([]);

  const [markerlist, setmarkerlist] = useState([]);
  const [userlist, setuserlist] = useState([]);

  // console.log('마커에 정보가 있나', userlist)
  const checkGroup = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/schedulePools=${sid}/joined-members`,
        {
          headers: { Authorization: user },
        },
      );
      setuserlist(res.data);
    } catch (e) {
      console.log(`[SCHEDULEPOOL_ERROR]${e}`);
    }
  };

  // const test = async () => {
  //     try {
  //         const res = await axios.get(`${API_URL}/api/schedulePools=${sid}/joined-members`,
  //             {
  //                 headers: { Authorization: user },
  //             },
  //         );
  //         console.log('최신', res.data)
  //     } catch (e) {
  //         console.log(`[SCHEDULEPOOL_ERROR]${e}`);
  //     }
  // };


  const getmyid = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/my-info`, {
        headers: {
          Authorization: user,
        },
      });
      // console.log(res.data);
      setmyid(res.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const initfunction = () => {
    checkGroup();
    getmyid();
    getgroupLocation();
  };

  useEffect(() => {
    initfunction();
    if (enddate >= new Date()) {
      if (!BackgroundService.isRunning()) {
        backgroundHandler();
        console.log('initdate', initdate);
      }
    } else {
      NotInTimedata();
      console.log('종료시간 넘김 결과보기중')
    }
  }, []);

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
          console.log('position', position);
          setTimeout(() => {
            getLocation();
          }, 100);
        }

        if (enddate <= new Date()) {
          console.log('Bye~time is over');
          await BackgroundService.stop();
        }
        if (i === 5000) {
          // Alert.alert('오류', '관리자에게 문의하세요 errorcode timeout_at_backgroundservice')
          console.log('time out');
          await BackgroundService.stop();
        }
        await sleep(delay);
      }
    });
  };

  const stopHandler = async () => {
    await BackgroundService.stop();
  };

  const grouplocationpost = async latlng => {
    // console.log('my location 잘 나오냐3', latlng);
    try {
      const res = await axios.post(
        `${API_URL}/api/${sid}/location`,
        {
          gps_x: latlng.latitude,
          gps_y: latlng.longitude,
          id: myid,
        },
        {
          headers: {
            Authorization: user,
          },
        },
      );

      // console.log('my location 잘 나오냐4', latlng);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const mylocationpost = async latlng => {
    // console.log('my location 잘 나오냐1', latlng);
    if (latlng) {
      try {
        const res = await axios.post(
          `${API_URL}/api/location`,
          {
            gps_x: latlng.latitude,
            gps_y: latlng.longitude,
          },
          {
            headers: {
              Authorization: user,
            },
          },
        );
        // console.log('my location 잘 나오냐2', latlng);
        grouplocationpost(latlng);
      } catch (err) {
        console.error(err);
      }
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
    // console.log('값 날려라', markerlist);
    try {
      const res = await axios.get(`${API_URL}/api/${sid}/locations`, {
        headers: {
          Authorization: user,
        },
      });
      // console.log('res data from get group location', res.data);

      const filteredArr = res.data.reduce((acc, current) => {
        const x = acc.find(item => item.useridx === current.useridx);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      console.log('필터링', filteredArr);
      setmarkerlist(filteredArr);
      AsyncStorageset();
      console.log('markerlist', markerlist);
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
            // console.log('position 123 123', position);
            setLocation(position);
            // console.log(location)
            // 화면 중심부 변환
            // setPosition({
            //     latitude: position.coords.latitude,
            //     longitude: position.coords.longitude,
            // });
            // setsenddata({
            //     latitude: position.coords.latitude,
            //     longitude: position.coords.longitude,
            // });
            mylocationpost(position.coords);
            // console.log('getlocation 직후 데이터', senddata)
          },
          error => {
            console.log(error.code, error.message);
            setLocation(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
      // console.log('senddata', senddata);
    });
  };




  const pressuserlog = param => {
    console.log(param.id, '의 위치 표시하기');
    getgroupLocation();
    AsyncStorageset();
    console.log('개인화면에서 마커 리스트', markerlist);
    console.log('');
    const mainview = markerlist.filter(marker => marker.useridx === param.id);
    if (mainview[0]) {
      setPosition({
        latitude: parseFloat(mainview[0].gps_x),
        longitude: parseFloat(mainview[0].gps_y),
      });
    }
    getLocation();
  };

  const AsyncStorageset = () => {
    if (markerlist[0]) {
      console.log("markerlist에 값이 있으면 데이터 저장")
      AsyncStorage.setItem(toString(sid), JSON.stringify({ markerlist }), () => {
        console.log('저장')
      });
    }
  };

  // const AsyncStorageget = () => {
  // }


  const NotInTimedata = () => {
    AsyncStorage.getItem(toString(sid), (err, result) => {
      const asyncdata = JSON.parse(result);
      console.log('내장된 데이터 가져옴', asyncdata.markerlist);
      setlocaldata(asyncdata.markerlist);
    });

  }

  // console.log(localdata);

  // const AsyncStoragedel = () => {
  //   AsyncStorage.removeItem(toString(sid))
  // }

  return (
    <>
      <AppBar
        title={enddate <= new Date() ? (title = "결과확인") : (title = "위치확인")}
        centerTitle={true}
        color="#6c757d"
        //   style={{flex: 4}}
        titleStyle={{ fontFamily: 'NanumSquareRoundEB' }}
        leading={props => (
          <IconButton
            icon={props => <Icon name="chevron-left" {...props} />}
            color="white"
            onPress={() => navigation.pop()}
            {...props}
          />
        )}
      />
      <View style={{ flex: 1 }}>
        {enddate <= new Date() ? (
          <View>
            <View style={styles.userlistwrapper_dup}>
              <ScrollView>
                {localdata.map(user => (
                  <View style={{
                    borderWidth: 2.5,
                    borderColor: 'gray',
                    borderRadius: 5,
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                    key={user.useridx}>
                    <Text style={styles.textlist_dup}>{user.username}</Text>
                    <Text style={styles.textlist_dup}>
                      {Math.sqrt(Math.abs((user.gps_x - endX) * (user.gps_x - endX)) + Math.abs((user.gps_y - endY) * (user.gps_y - endY))) <= 0.02 ? 'In Time' : '지각!!'}
                      {/* 약 600미터 반경 안에 */}
                    </Text>
                    {console.log('무슨일이지?', Math.sqrt(Math.abs((user.gps_x - endX) * (user.gps_x - endX)) + Math.abs((user.gps_y - endY) * (user.gps_y - endY))))}
                    {/* {localdata.map(function (user) {
                      const c_gps_x = user.gps_x - endX;
                      const c_gps_y = user.gps_y - endY;
                      const dist = Math.sqrt(Math.abs(c_gps_x * c_gps_x) + Math.abs(c_gps_y * c_gps_y));
                      console.log('거?리', dist)

                    })} */}
                    {/* <Text style={styles.textlist_dup}>In Time</Text>
                    <Text style={styles.textlist_dup}>지각!!</Text> */}
                  </View>
                ))}

              </ScrollView>
            </View>
          </View>
        ) : (
          <>
            <View>
              <View style={styles.userlistwrapper}>
                {userlist.length > 0 ? (
                  <View>
                    <ScrollView horizontal={true}>
                      {userlist.map(user => (
                        <View key={user.id}>
                          <View
                            style={{
                              borderWidth: 2.5,
                              borderColor: 'gray',
                              borderRadius: 5,
                              marginRight: 10,
                            }}>
                            <TouchableOpacity onPress={() => pressuserlog(user)}>
                              <Text style={styles.textlist}>{user.email}</Text>
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
            <View style={{ flex: 1 }}>
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
                    {markerlist.map(marker => (
                      <Marker
                        key={marker.useridx}
                        title={marker.username}
                        coordinate={{
                          latitude: parseFloat(marker.gps_x),
                          longitude: parseFloat(marker.gps_y),
                        }}>
                        <Image
                          style={{ width: 26, height: 28 }}
                          source={require('../img04.gif')}
                        />
                      </Marker>
                    ))}
                  </MapView>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  userlistwrapper: {
    borderRadius: 10,
    borderColor: 'darkgray',
    borderWidth: 3,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 1,
  },
  userlistwrapper_dup: {
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
  textlist_dup: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'flex-end'
  },
});

export default ScheduleandMap;
