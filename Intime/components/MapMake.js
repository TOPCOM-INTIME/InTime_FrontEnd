import React from 'react';
import axios from 'axios';
import {View, Text} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

//api 호출 /api/google/{useridx}/location
// const res = await axios.get(
//     `http://175.45.204.122:8000/api/google/${headers}/location`,
//     {
//         headers: { Authorization: user },
//     },
// );

// console.log(res.data);

//api에서 받아온 데이터 파싱, 닉네임,위도,경도

//받아온 데이터를 변수에 저장 후 마커에 파싱

function MapMake() {
  const rand1 = Math.random();
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.27995654097524,
          longitude: 127.04362949477017,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {/* <Marker pinColor="yellow"
                    coordinate={{ latitude: 37.278591844806, longitude: 127.042588518927 }}
                    title="김석주"
                />

                <Marker pinColor="blue"
                    coordinate={{ latitude: 37.278591844806, longitude: 127.04479923875957 }}
                    title="아주대"
                /> */}
        <Text>{rand1}</Text>
      </MapView>
      <Text>{rand1}</Text>
    </View>
  );
}

export default MapMake;
