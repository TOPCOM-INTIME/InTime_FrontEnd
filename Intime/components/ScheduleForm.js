import React from 'react';
import {Platform, Pressable, StyleSheet, View, Text} from 'react-native';
import ScheduleAddButton from './ScheduleAddButton';
import ScheduleItem from './ScheduleItems';

function ScheduleForm(){
  return(
  <>
    <View style ={styles.container}>
      <View style={styles.tasksWrapper}>
         <Text style={styles.sectionTitle}>일정</Text>
          <ScheduleAddButton style={styles.button}/>
          <View style={styles.items}>
          <ScheduleItem Date={'10/17'} Time={'09:00'} Place={"학교(12:00)"}>
          </ScheduleItem>
          <ScheduleItem Date={'10/17'} Time={'09:00'} Place={"학교(12:00)"}>
          </ScheduleItem>
         </View>
      </View>
     </View>
    </>
  )
}
const styles =StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'white',
  },
  tasksWrapper:{
      paddingTop:20,
      paddingHorizontal:20,
  },
  sectionTitle:{
      fontSize: 24,
      color: 'black',
      fontWeight: 'bold'
  },
  form: {
      marginTop: 80,
      width: '100%',
      paddingHorizontal: 16,
  },
  button:{
    flexDirection:'row-reverse',
    margin: 15
  }
})

export default ScheduleForm;