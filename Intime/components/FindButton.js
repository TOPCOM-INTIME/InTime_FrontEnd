import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScheduleCustomButton from './ScheduleCustomButton';

function FindButton({data, date, setData}) {
  const navigation = useNavigation();
  const primaryTitle = '찾기';
  const secondaryTitle = '취소';

  const onPrimaryButtonPress = async () => {
    const startKey = [encodeURI(data.sourceName)];
    const endKey = [encodeURI(data.destName)];
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
    const dat = await response.json();
    startData.startX = dat.searchPoiInfo.pois.poi[0]['frontLon'];
    startData.startY = dat.searchPoiInfo.pois.poi[0]['frontLat'];

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

    fetch(
      'https://apis.openapi.sk.com/tmap/routes?version=1&callback=function',
      optionsTime,
    )
      .then(response3 => response3.json())
      .then(response3 => {
        setData('time')(response3.features[0]['properties'].totalTime);
        setData('startTime')(date.setSeconds(date.getSeconds() - data.time));
        console.log('시작 시간', data.startTime, data.time);
        navigation.push('CarScreen');
      })
      .catch(err => console.error(err));
  };

  return (
    <View style={styles.buttons}>
      <ScheduleCustomButton
        style={styles.buttons}
        title={primaryTitle}
        hasMarginBottom
        onPress={onPrimaryButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  spinnerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FindButton;
