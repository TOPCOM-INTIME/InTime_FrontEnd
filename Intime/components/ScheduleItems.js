import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';

const ScheduleItem =(props)=>{
    const [isEnabled, setisEnabled]=useState(true);
    const toggleSwitch=()=>{
        setisEnabled(previousState => !previousState)
    }
    return(
        <View style={styles.item}>
            <View style={styles.itemDate}>
                <Text style={styles.itemMonthDay}>{props.Date}</Text>
                <Text style={styles.itemTime}>{props.Time}</Text>
            </View>

            <View style={styles.itemPlace}>
                <Text style={styles.itemName}>{props.Place}</Text>
                <TouchableOpacity style={styles.friendBox}></TouchableOpacity>
            </View>
            <View style={styles.itemDate}>
                <Switch 
                style={styles.toggleSwitch}
                trackColor={{false:'grey', true:'#ED3648'}}
                thumbColor={isEnabled ? '#f4fef4' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
                /> 
            </View>
        </View>
    )
}

const styles =StyleSheet.create({
    item:{
        marginTop: 20,
        background:"white",
        padding: 15,
        paddingVertical:20,
        borderRadius:15,
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 15,
        borderColor: '#ED3648',
        borderWidth: 4,
    },
    itemDate:{
        flex: 1,
        flexDirection:'column',
        flewWrap: 'wrap'
    },
    itemMonthDay:{  
        marginLeft: 10,
        color: 'black',
    },
    itemTime:{ 
        color: 'black',
        fontWeight: 'bold',
        fontSize: 24,
    },
    itemPlace:{
        flex: 1,
        flexDirection:'column',
        flewWrap: 'wrap',
        alignItems:'center'
    },
    itemName:{
        fontWeight: 'bold',
        marginBottom:5,
        color: 'black',
    },
    friendBox:{
       alignItems:'center',
       width:132,
       height:30,
       background:"white",
       borderColor: '#ED3648',
       borderWidth: 1,
       borderRadius:15,
    },
    toggleSwitch:{
        marginTop:15
    }




});
export default ScheduleItem;