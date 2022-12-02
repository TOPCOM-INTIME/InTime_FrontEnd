import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, PermissionsAndroid, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from 'axios';
import { API_URL } from '@env';
import BackgroundService from 'react-native-background-actions';
import { useUserContext } from '../contexts/UserContext';

function MapMarker() {
    const [position, setPosition] = useState({
        latitude: 37.266833,
        longitude: 127.000019,
    });

    const latlongplus = () => {
        console.log("plus!")
    };

    const list = [
        {
            id: '0',
            latitude: position.latitude,
            longitude: position.longitude,
        },
        {
            id: '1',
            latitude: position.latitude + 0.001,
            longitude: position.longitude + 0.001,
        },
        {
            id: '2',
            latitude: position.latitude + 0.001,
            longitude: position.longitude - 0.001,
        },
        {
            id: '3',
            latitude: position.latitude - 0.001,
            longitude: position.longitude + 0.001,
        },
        {
            id: '4',
            latitude: position.latitude - 0.001,
            longitude: position.longitude - 0.001,
        },
    ];

    return (
        
        <View style={{ flex: 1, padding: 10 }} >
            <Button title='Plus' onPress={latlongplus()} />
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: 37.266833,
                    longitude: 127.000019,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                }}>

                {list.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.id}
                    />
                ))}
            </MapView>
        </ View>
    );
}

export default MapMarker;