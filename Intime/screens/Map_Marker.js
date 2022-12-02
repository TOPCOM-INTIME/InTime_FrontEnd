import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, PermissionsAndroid, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
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
    delay: 2000,
  },
};




const Map_Marker = () => {
  const { user, setUser } = useUserContext();
  const [location, setLocation] = useState(false);
  const [position, setPosition] = useState({
    latitude: 37.266833,
    longitude: 127.000019,
  });

  const getmyid = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/my-info`,
        {
          headers: {
            Authorization: user,
          }
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const postscheduleidx = async () => {
    const data = { gps_x: "37.5", gps_y: "127.2", useridx: 4 }
    try {
      const res = await axios.post(`${API_URL}/api/24/location`,
        {
          gps_x: data.gps_x,
          gps_y: data.gps_y,
          useridx: data.useridx
        },
        {
          headers: {
            Authorization: user,
          }
        }
      );
      console.log(res);
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log(data);
    }
  }

  const getscheduleidx = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/24/locations`,
        {
          headers: {
            Authorization: user,
          }
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
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

  const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

  const backpostservice = async taskDataArguments => {
    const { delay } = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(i);
        if (i === 10) {
          console.log("Hello 10 sec!")
          await BackgroundService.stop();
        }
        await sleep(delay);
      }
    });
  };


  // const sleep = time => new Promise((resolve) => setTimeout(() => resolve(), time));
  // const locationpostHandler = async taskDataArguments => {
  //   const { delay } = taskDataArguments;
  //   await new Promise(async (resolve) => {
  //     for (let i = 0; BackgroundService.isRunning(); i++) {
  //       const data = {
  //         gps_x: 0.0,
  //         gps_y: 0.0,
  //       };
  //       // console.log(i);
  //       console.log(' ', i % 10);
  //       if (i % 5 === 0) {
  //         const result = requestLocationPermission();
  //         result.then(res => {
  //           // console.log('res is:', res);
  //           if (res) {
  //             Geolocation.getCurrentPosition(
  //               async position => {
  //                 data.gps_x = position.coords.latitude;
  //                 data.gps_y = position.coords.longitude;
  //                 console.log('1', data);

  //                 const res = await axios.post(
  //                   `${API_URL}/api/location`,
  //                   {
  //                     body: data
  //                   },
  //                   {
  //                     headers: { Authorization: user },
  //                   },
  //                 );
  //                 console.log('data', data)
  //                 // console.log("location post");
  //                 console.log(res.data);
  //               },
  //               error => {
  //                 console.log(error.code, error.message);
  //                 console.log('data', data)
  //                 setLocation(false);
  //               },
  //               { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
  //             );
  //           }
  //         });
  //         // console.log('2', data);
  //         // const res = await axios.post(
  //         //   `http://175.45.204.122:8000/api/7/location`, data,
  //         //   {
  //         //     headers: { Authorization: user },
  //         //   },
  //         // );
  //         // console.log("location post");
  //         // console.log(res.data);

  //       }
  //       if (i === 1000) {
  //         await BackgroundService.stop();
  //       }
  //       await sleep(delay);
  //     }
  //   });
  // }

  const backgroundHandler = async () => {
    console.log('hi');
    await BackgroundService.start(backpostservice, options);
  };

  // let getdata = {
  //   latitude: 0.0,
  //   longitude: 0.0,
  // };

  const [getdata, setgetdata] = useState({
    latitude: 38.2,
    longitude: 127.0,
  });



  const locationgetHandler = async () => {
    const res = await axios.get(
      `${API_URL}/api/4/location`,
      {
        headers: { Authorization: user },
      },
    );
    if (res.data.gps_x == null) {
      getdata.latitude = 38.2;
      getdata.longitude = 127.0;
    } else {
      getdata.latitude = parseFloat(res.data.gps_x);
      getdata.longitude = parseFloat(res.data.gps_y);

    }

    console.log('res', res);
    console.log(getdata);
    console.log("location get");
    console.log(res.data);
  }

  const stopHandler = async () => {
    await BackgroundService.stop();
  };

  const functionCombine = () => {
    // getLocation();
    // locationgetHandler();
    getmyid();
    getscheduleidx();
  };

  // console.log('123123', getdata);

  return (
    < View style={{ flex: 1, padding: 10 }
    }>
      <Button title="post my location in background" color="orange" onPress={backgroundHandler()} />
      <Button title="stop post my location" color="green" onPress={stopHandler} />

      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}>
        <Marker
          id="0"
          title={"내 위치"}
          coordinate={{
            latitude: position.latitude,
            longitude: position.longitude,
          }}
        >
          <Image
            style={{ width: 26, height: 28 }}
            source={require('../img04.gif')} />
        </Marker>

        <Marker
          id="1"
          title={"파트너"}
          pinColor="blue"
          coordinate={{
            latitude: getdata.latitude,
            longitude: getdata.longitude,
          }}
        />
        {/* <Marker
          id="2"
          title={"강환희"}
          pinColor="green"
          coordinate={{
            latitude: (position.latitude + 0.001),
            longitude: (position.longitude - 0.001),
          }}
        />
        <Marker
          id="3"
          title={"조재성"}
          pinColor="yellow"
          coordinate={{
            latitude: (position.latitude - 0.001),
            longitude: (position.longitude - 0.001),
          }}
        />
        <Marker
          id="4"
          title={"신재혁"}
          pinColor="purple"

          coordinate={{
            latitude: (position.latitude - 0.001),
            longitude: (position.longitude + 0.001),
          }}
        /> */}
      </MapView>

      <Text style={{ color: 'green' }}>{new Date().toString()}</Text>
      <View>
        <Button title="postscheduleidx" onPress={() => postscheduleidx()}></Button>
        <Button title="location refresh" onPress={() => getLocation()} />
        {/* <Button title="Refresh Location" onPress={getLocation} />
        <Button title="get Location" onPress={locationgetHandler} /> */}
      </View>
      <Text style={styles.Text}>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text style={styles.Text}>Longitude: {location ? location.coords.longitude : null}</Text>
    </View >

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  Text: {
    color: '#EE2F48',
  },
});
export default Map_Marker;
