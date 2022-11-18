import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

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


  const [location, setLocation] = useState(false);
  const [position, setPosition] = useState({
    latitude: 37.27995654097524,
    longitude: 127.04362949477017,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
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
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
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



  const rand1 = Math.random().toString(16);

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
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker title={new Date().toString()}
          coordinate={{
            latitude: position.latitude,
            longitude: position.longitude,
          }}>
        </Marker>
      </MapView>

      <Text style={{ color: 'green' }}>{new Date().toString()}</Text>
      <View
        style={{ marginTop: 10, padding: 10, borderRadius: 10, width: '40%' }}>
        <Button title="Get Location" onPress={getLocation} />
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
