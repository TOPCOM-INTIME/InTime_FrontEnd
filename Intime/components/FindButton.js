import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {StyleSheet, View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScheduleCustomButton from './ScheduleCustomButton';
import {useUserContext} from '../contexts/UserContext';
import {API_URL} from '@env';

function FindButton({data, setData, busTime, setBus, OdsayData, setOdsayData}) {
  const navigation = useNavigation();
  const primaryTitle = '찾기';
  const secondaryTitle = '취소';
  const {user, setUser} = useUserContext();
  const [BusData, setBusData] = useState([]);
  const currentDate = new Date();
  const PlaceAlert = item => {
    Alert.alert('오류', '출발지 혹은 도착지를 찾을 수 없습니다');
  };

  const TimeAlert = item => {
    Alert.alert('오류', '지난 날짜는 설정할 수 없습니다');
  };

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
    try {
      const response = await fetch(
        `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${startKey}&searchType=all&searchtypCd=A&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&page=1&count=20&multiPoint=N&poiGroupYn=N`,
        optionsStart,
      );
      const dat = await response.json();
      startData.startX = dat.searchPoiInfo.pois.poi[0]['frontLon'];
      startData.startY = dat.searchPoiInfo.pois.poi[0]['frontLat'];
    } catch (e) {}

    try {
      const response2 = await fetch(
        `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${endKey}&searchType=all&searchtypCd=A&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&page=1&count=20&multiPoint=N&poiGroupYn=N`,
        optionsEnd,
      );
      const data2 = await response2.json();
      endData.endX = data2.searchPoiInfo.pois.poi[0]['frontLon'];
      endData.endY = data2.searchPoiInfo.pois.poi[0]['frontLat'];
    } catch (e) {}

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

    try {
      const response3 = await fetch(
        'https://apis.openapi.sk.com/tmap/routes?version=1&callback=function',
        optionsTime,
      );
      const data3 = await response3.json();
      let totalTime = data3.features[0]['properties'].totalTime;
      // console.log('계산된 시간', totalTime, '설정된 시간', data.time);
      let tmpTime = new Date(data.endTime);
      tmpTime.setSeconds(tmpTime.getSeconds() - totalTime);
      setData('startTime')(tmpTime);
    } catch (e) {}

    const odsayData = {
      ex: endData.endX,
      ey: endData.endY,
      sx: startData.startX,
      sy: startData.startY,
    };
    try {
      // console.log('설정된 도착시간:', data.endTime);
      // console.log('현재 시간:', currentDate);
      // console.log(odsayData);
      if (data.endTime < currentDate) {
        throw 3;
      }
      const res = await axios.post(`${API_URL}/api/odsay`, odsayData, {
        headers: {Authorization: user},
      });
      console.log('ODsay SUCCESS!', res.data.result.path[0].info.totalTime);
      // console.log('ODsay path:', res.data.result.path[0].info);
      // res.data.result.path.map(item => console.log(item));
      setOdsayData(res.data.result.path);
      navigation.push('CarScreen', BusData);
    } catch (e) {
      if (e === 3) {
        TimeAlert();
      } else {
        PlaceAlert();
      }
      console.log(`[ODsay ERROR]${e} SENT${res.data.result.path}`);
    }
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
