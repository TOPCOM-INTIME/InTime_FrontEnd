import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from 'axios';
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


const Map_Marker = () => {
  const { user, setUser } = useUserContext();
  const [location, setLocation] = useState(false);
  const [position, setPosition] = useState({
    latitude: 37.27995654097524,
    longitude: 127.04362949477017,
  });

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

  const locationpostHandler = async taskDataArguments => {
    const { delay } = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        const data = {
          gps_x: 0.0,
          gps_y: 0.0,
        };
        console.log(i);
        console.log(' ', i % 10);
        if (i % 10 === 0) {
          const result = requestLocationPermission();

          result.then(res => {
            console.log('res is:', res);
            if (res) {
              Geolocation.getCurrentPosition(
                async position => {
                  data.gps_x = position.coords.latitude;
                  data.gps_y = position.coords.longitude;
                  console.log('1', data);

                  const res = await axios.post(
                    `http://175.45.204.122:8000/api/7/location`, data,
                    {
                      headers: { Authorization: user },
                    },
                  );
                  console.log("location post");
                  console.log(res.data);
                },
                error => {
                  console.log(error.code, error.message);
                  setLocation(false);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
              );
            }
          });
          // console.log('2', data);
          // const res = await axios.post(
          //   `http://175.45.204.122:8000/api/7/location`, data,
          //   {
          //     headers: { Authorization: user },
          //   },
          // );
          // console.log("location post");
          // console.log(res.data);

        }
        if (i === 100) {
          await BackgroundService.stop();
        }
        await sleep(delay);
      }
    });

  }

  const backgroundHandler = async () => {
    console.log('hi');
    await BackgroundService.start(locationpostHandler, options);
  };

  let getdata = {
    latitude: 0.0,
    longitude: 0.0,
  };

  const locationgetHandler = async () => {
    const res = await axios.get(
      `http://175.45.204.122:8000/api/6/location`,
      {
        headers: { Authorization: user },
      },
    );
    getdata.latitude = res.data.gps_x;
    getdata.longitude = res.data.gps_y;
    console.log(getdata);
    console.log("location get");
    console.log(res.data);
  }

  const functionCombine = () => {
    backgroundHandler();
    getLocation();
    locationgetHandler();
  };

  return (
    < View style={{ flex: 1, padding: 10 }
    }>
      <Text style={{ color: 'green' }}>Welcome!</Text>

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
          pinColor="red"
          coordinate={{
            latitude: position.latitude,
            longitude: position.longitude,
          }}
        />
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
        <Button title="post Location" onPress={() => functionCombine()} />
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
