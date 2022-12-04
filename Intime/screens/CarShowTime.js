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
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ButtonCarTime from '../components/ButtonCarTime';
import SwitchSelector from 'react-native-switch-selector';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BusTimeItem from '../components/BusTimeItem';
import {AppBar, IconButton} from '@react-native-material/core';

function CarShowTime({
  data,
  setData,
  busTime,
  setBus,
  OdsayData,
  isCar,
  setisCar,
  CarTime,
  CarData,
}) {
  const {sourceName, destName} = data;
  console.log('쇼타임', CarData);
  // console.log('Find 버튼 누르고 받은 데이터', data);
  const [selectedItem, setselectedItem] = useState();
  const Switchoptions = [
    {
      value: false,
      label: '차',
      customIcon: <Icon name={'directions-car'} size={30} color={'black'} />,
    },
    {
      value: true,
      label: '대중 교통',
      customIcon: <Icon name={'directions-bus'} size={30} color={'black'} />,
    },
  ];

  const showTime = {
    hour: 0,
    leftmin: 0,
    minute: 0,
  };

  function setTime(date) {
    let totalTime = date;
    showTime.hour = parseInt(totalTime / 3600);
    showTime.leftmin = totalTime % 3600;
    showTime.min = parseInt(showTime.leftmin / 60);
  }

  function setDistance(distance) {
    return (distance / 1000).toFixed(2);
  }

  function PrintTime() {
    if (!isCar) {
      setTime(CarTime);
      if (showTime.hour > 0) {
        return (
          <>
            <View style={styles.item}>
              <Icon name={'directions-car'} size={35} color={'black'} />
              <Text style={styles.text}>총 거리</Text>
              <Text style={styles.text}>
                {setDistance(CarData.totalDistance)}km
              </Text>
            </View>
            <View style={styles.item}>
              <Icon name={'directions-car'} size={35} color={'black'} />
              <Text style={styles.text}>총 비용</Text>
              <Text style={styles.text}>{CarData.totalFare}원</Text>
            </View>
            <View style={styles.item}>
              <Icon name={'local-taxi'} size={35} color={'black'} />
              <Text style={styles.text}>택시 비용</Text>
              <Text style={styles.text}>{CarData.taxiFare}원</Text>
            </View>

            <View style={styles.item}>
              <Icon name={'timer'} size={35} color={'black'} />
              <Text style={styles.text}>소요 시간</Text>
              <Text style={styles.text}>
                {showTime.hour}시간 {showTime.min}분
              </Text>
            </View>
          </>
        );
      } else {
        return (
          <>
            <View style={styles.item}>
              <Icon name={'directions-car'} size={35} color={'black'} />
              <Text style={styles.text}>총 거리</Text>
              <Text style={styles.text}>
                {setDistance(CarData.totalDistance)}km
              </Text>
            </View>
            <View style={styles.item}>
              <Icon name={'directions-car'} size={35} color={'black'} />
              <Text style={styles.text}>총 비용</Text>
              <Text style={styles.text}>{CarData.totalFare}원</Text>
            </View>
            <View style={styles.item}>
              <Icon name={'local-taxi'} size={35} color={'black'} />
              <Text style={styles.text}>택시 비용</Text>
              <Text style={styles.text}>{CarData.taxiFare}원</Text>
            </View>

            <View style={styles.item}>
              <Icon name={'timer'} size={35} color={'black'} />
              <Text style={styles.text}>소요 시간</Text>
              <Text style={styles.text}>{showTime.min}분 </Text>
            </View>
          </>
        );
      }
    }
  }

  const selectItem = async item => {
    setselectedItem(OdsayData.indexOf(item));
    setBus(item.info.totalTime * 60);
  };
  useEffect(() => {
    setisCar(false);
  }, []);
  return (
    <>
      <AppBar
        title="교통수단 선택"
        titleStyle={{fontFamily: 'NanumSquareRoundEB'}}
        centerTitle={true}
        color="#6c757d"
        tintColor="white"
      />
      <View style={{backgroundColor: 'white'}}>
        <SwitchSelector
          options={Switchoptions}
          initial={0}
          value={0}
          selectedColor={'white'}
          selectedIconColor={'white'}
          borderRadius={2}
          buttonColor={'#6c757d'}
          borderColor={'#6c757d'}
          borderWidth={1}
          hasPadding
          onPress={value => setisCar(value)}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 24, color: 'black'}}>
            출발지: {sourceName}
          </Text>
          <Icon name={'arrow-forward'} size={24} color={'black'} />
          <Text style={{fontSize: 24, color: 'black'}}>도착지: {destName}</Text>
        </View>
      </View>

      <View style={{flex: 1, backgroundColor: 'white'}}>{PrintTime()}</View>
      {isCar && (
        <ScrollView>
          {OdsayData.map(item => (
            <View key={OdsayData.indexOf(item)} style={styles.container}>
              <TouchableOpacity onPress={() => selectItem(item)}>
                <BusTimeItem
                  key={OdsayData.indexOf(item)}
                  id={OdsayData.indexOf(item)}
                  Busdata={item}
                  busTime={busTime}
                  setBus={setBus}
                  data={data}
                  selectedItem={selectedItem}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      <View>
        <ButtonCarTime
          data={data}
          setData={setData}
          busTime={busTime}
          setBus={setBus}
          isCar={!isCar}
          CarTime={CarTime}
        />
      </View>
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
    // fontWeight: 'bold',
    color: 'black',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row-reverse',
    margin: 15,
  },
  item: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    height: 90,
    borderRadius: 15,
    flexDirection: 'row',
    borderColor: '#6c757d',
    borderWidth: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rightitem: {
    flex: 1,
    backgroundColor: 'blue',
  },
  leftitem: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default CarShowTime;
