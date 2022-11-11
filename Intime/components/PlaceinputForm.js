import React, {useRef, useState} from 'react';
import {Platform, Pressable, StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
// import { SearchBar } from 'react-native-elements';
import CustomSearchInput from './CustomSearchInput';
import DatePicker from "@react-native-community/datetimepicker"
import Icon from 'react-native-vector-icons/MaterialIcons';
import SwitchSelector from 'react-native-switch-selector';
import FindButton from '../components/FindButton';

function PlaceinputForm(){
  const start = useRef();
  const end = useRef();
  const [date, setDate]=useState(new Date());
  const [mode, setMode]=useState('date');
  const [show, setShow]=useState(false);
  const [isGroup, setGroup]=useState(false)

  const [placeData, setPlaceData] = useState({
    start: '',
    end: '',
  });

  const options=[
    {label: "개인", value: false},
    {label: "단체", value: true}
  ]

  const onChange =(event, selectedDate)=>{
    const currentDate = selectedDate || date;
    setShow(Platform.OS==='ios');
    setDate(currentDate);
  }
  
  const showMode=(currentMode)=>{
    setShow(true)
    setMode(currentMode)
  }


  return(
    <>
      <SwitchSelector
      options={options}
      initial={0}
      selectedColor={'white'}
      buttonColor={'#ED3648'}
      borderColor={'#ED3648'}
      borderWidth={1}
      hasPadding
      onPress={value=>setGroup(!value)}
      />

    <View style={styles.tasksWrapper}>

    <Text style={styles.sectionTitle}>날짜</Text>
    <View style={styles.item}>
      <View style={styles.itemLeft}>
          <Text style={styles.sectionTitle}>{date.getFullYear()}-{date.getMonth()}-{date.getDate()}</Text>

          <TouchableOpacity style={{marginLeft:10}}  onPress={()=>showMode('date')}>
            <Icon name={"calendar-today"} size={24} color={'black'}/>
          </TouchableOpacity>
          
      </View>

      <View style={styles.itemRight}>
          <Text style={styles.sectionTitle}>{date.getHours()}:{date.getMinutes()}</Text>
            <TouchableOpacity style={{marginLeft:10}} onPress={()=>showMode('time')}>
                  <Icon name={"access-time"} size={24} color={'black'}/>
              </TouchableOpacity>
      </View>
    </View>


    {show && (
      <DatePicker
      testID='dateTimePicker'
      value={date}
      mode={mode}
      is24Hour={true}
      display='default'
      onChange={onChange}
      />
    )}
    
    <Text style={styles.sectionTitle}>출발지 입력</Text>
    <CustomSearchInput
      placeholder="출발지"
      ref={start}
      keyboardType="text"
      returnKeyType="next"
      onChangeText={value=>setPlaceData.start(value)}
      hasMarginBottom
    />
      <Text style={styles.sectionTitle}>도착지 입력</Text>
    <CustomSearchInput
      placeholder="도착지"
      ref={end}
      returnKeyType="next"
      onChangeText={value=>setPlaceData.end(value)}
      hasMarginBottom
    />
    {!isGroup && (
    <>
      <Text style={styles.sectionTitle}>친구 추가</Text>
      <TouchableOpacity style={styles.friendBox}></TouchableOpacity>
    </>)}
    </View>

    <FindButton
        placeData={placeData}
      />
  </>
  );
}

const styles =StyleSheet.create({
  item:{
    marginTop: 10,
    backgroundColor:"white",
    padding: 15,
    paddingVertical:10,
    borderRadius:15,
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 15,
    borderColor: '#ED3648',
    borderWidth: 2,
  },
  tasksWrapper:{
    paddingTop:10,
    paddingHorizontal:20,
  },
  sectionTitle:{
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold'
  },
  itemLeft:{
    flex: 1,
    flexDirection:'row',
    flewWrap: 'wrap'
  },
  itemRight:{
    flex: 1,
    marginLeft:70,
    flexDirection:'row',
    flewWrap: 'wrap'
  },
  button:{
   flexDirection:'row',
   flex:1
  },
  friendBox: {
    borderColor: '#bdbdbd',
    paddingHorizontal: 16,
    borderRadius: 15,
    height: 48,
    backgroundColor: 'white',
    borderColor: '#ED3648',
    borderWidth: 2,
  },
})


export default PlaceinputForm;