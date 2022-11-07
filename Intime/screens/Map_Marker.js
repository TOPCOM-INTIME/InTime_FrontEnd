import React from "react";
import { View, Text } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE } from "react-native-maps";

const pinclr = '#000000';

function Map_Marker() {
  return (
    <>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.27995654097524,
            longitude: 127.04362949477017,
            latitudeDelta: 0.0100,
            longitudeDelta: 0.0100,
          }}>
        <Marker ImageSource = {'./marker_intime.png'}
          coordinate={{latitude:  37.278591844806, longitude: 127.042588518927}}
          title="김석주"
        />
        
        <Marker pinColor="blue"
          coordinate={{latitude:  37.278591844806, longitude: 127.04479923875957}}
          title="아주대"
        />
        </MapView>
      </View>
    </>
  );
}

export default Map_Marker;
