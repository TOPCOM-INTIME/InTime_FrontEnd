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

function CarShowTime({
  data,
  setData,
  busTime,
  setBus,
  OdsayData,
  isCar,
  setisCar,
  CarTime,
}) {
  const {sourceName, destName} = data;
  // console.log('쇼타임', OdsayData);
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

  function PrintTime() {
    if (!isCar) {
      setTime(CarTime);
      if (showTime.hour > 0) {
        return (
          <Text style={styles.text}>
            {showTime.hour}시간 {showTime.min}분 걸림
          </Text>
        );
      } else {
        return <Text style={styles.text}>{showTime.min}분 걸림</Text>;
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
      <View style={{backgroundColor: 'white'}}>
        <SwitchSelector
          options={Switchoptions}
          initial={0}
          value={0}
          selectedColor={'white'}
          selectedIconColor={'white'}
          buttonColor={'#ED3648'}
          borderColor={'#ED3648'}
          borderWidth={1}
          hasPadding
          onPress={value => setisCar(value)}
        />

        <Text style={styles.text}>출발지: {sourceName}</Text>
        <Text style={styles.text}>도착지: {destName}</Text>
      </View>
      <View style={{backgroundColor: 'white'}}>{PrintTime()}</View>
      <ScrollView style={{width: '100%'}}>
        {isCar &&
          OdsayData.map(item => (
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
      <View style={styles.buttons}>
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
});

export default CarShowTime;
