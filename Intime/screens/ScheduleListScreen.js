import React, {useState} from 'react';
import {
  StyleSheet,
  Keyboard,
} from 'react-native';
import ScheduleForm from '../components/ScheduleForm';

function ScheduleList(){
    return(
    <>
     <ScheduleForm/>
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
    }

});

export default ScheduleList;