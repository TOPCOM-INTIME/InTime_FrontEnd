import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Platform,
  Text,
  StyleSheet,
  Keyboard,
} from 'react-native';
import ButtonCarTime from '../components/ButtonCarTime';
import Placeinput from './Placeinput';

function CarShowTime({route}) {
  const {start} = route.params;
  const {end} = route.params;
  const [totalTime, setTime] = useState(0);
  const showTime ={
    hour:0,
    leftmin:0,
    minute:0
  }
  useEffect(() => {
    async function amo() {
      const startKey = [encodeURI(start)];
      const endKey = [encodeURI(end)];
      const startData = {
        startX: 0,
        startY: 0,
      };

      const endData = {
        endX: 0,
        endY: 0,
      };

      const optionsStart = {
        method: 'GET',
        headers: {
          appKey: 'l7xx67fb6edf4df64a82a1a889e87430c919',
          Accept: 'application/json',
        },
      };

      const optionsEnd = {
        method: 'GET',
        headers: {
          appKey: 'l7xx67fb6edf4df64a82a1a889e87430c919',
          Accept: 'application/json',
        },
      };
      const response = await fetch(
        `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${startKey}&searchType=all&searchtypCd=A&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&page=1&count=20&multiPoint=N&poiGroupYn=N`,
        optionsStart,
      );
      const data = await response.json();
      startData.startX = data.searchPoiInfo.pois.poi[0]['frontLon'];
      startData.startY = data.searchPoiInfo.pois.poi[0]['frontLat'];

      const response2 = await fetch(
        `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${endKey}&searchType=all&searchtypCd=A&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&page=1&count=20&multiPoint=N&poiGroupYn=N`,
        optionsEnd,
      );
      const data2 = await response2.json();

      endData.endX = data2.searchPoiInfo.pois.poi[0]['frontLon'];
      endData.endY = data2.searchPoiInfo.pois.poi[0]['frontLat'];


      const optionsTime = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          appKey: 'l7xx67fb6edf4df64a82a1a889e87430c919',
        },
        body: JSON.stringify({
          tollgateFareOption: 16,
          roadType: 32,
          directionOption: 1,
          endX: endData.endX,
          endY: endData.endY,
          endRpFlag: 'G',
          reqCoordType: 'WGS84GEO',
          startX: startData.startX,
          startY: startData.startY,
          gpsTime: '20191125153000',
          speed: 10,
          uncetaintyP: 1,
          uncetaintyA: 1,
          uncetaintyAP: 1,
          carType: 0,
          detailPosFlag: '2',
          resCoordType: 'WGS84GEO',
          sort: 'index',
        }),
      };
      console.log(startData);
      console.log(endData);
      fetch(
        'https://apis.openapi.sk.com/tmap/routes?version=1&callback=function',
        optionsTime,
      )
        .then(response3 => response3.json())
        .then(response3 =>
          setTime(response3.features[0]['properties'].totalTime),
        )
        .catch(err => console.error(err));
    }
    amo();
  }, [end, start]);

  function Time(){
    showTime.hour=parseInt(totalTime/3600)
    showTime.leftmin=(totalTime%3600)
    showTime.min=parseInt(showTime.leftmin/60)
    if( showTime.hour>0){
      return  <Text style={styles.text}> {showTime.hour}시간 {showTime.min}분 걸림</Text>;
    }
    else{
      return <Text style={styles.text}>{showTime.min}분 걸림</Text>
    }
  }
  return (
    <>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.select({ios: 'padding'})}>
        <SafeAreaView style={styles.fullscreen}>
          <Text style={styles.text}>출발지: {start}</Text>
          <Text style={styles.text}>도착지: {end}</Text>
          {Time()} 
          <View style={styles.form}>
            <ButtonCarTime />
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
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default CarShowTime;
