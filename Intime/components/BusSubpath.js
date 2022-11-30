import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useUserContext} from '../contexts/UserContext';
const BusSubpath = props => {
  const subPath = props.data;

  function printEachPath(item) {
    if (item.trafficType === 3) {
      return (
        <>
          <View key={subPath.indexOf(item)} style={styles.walk}>
            <Icon name={'directions-walk'} size={27} color={'black'} />
            <Text style={styles.text}>{item.sectionTime}분</Text>
          </View>
        </>
      );
    }
    if (item.trafficType === 2) {
      return (
        <>
          <View key={subPath.indexOf(item)} style={styles.item}>
            <View>
              <Icon name={'directions-bus'} size={27} color={'black'} />
              <Text style={styles.text}>{item.lane[0].busNo}</Text>
              <Text style={styles.text}>{item.sectionTime}분</Text>
            </View>
            <View style={styles.boxForPathtype}>
              <Text style={styles.text}>{item.startName}</Text>
            </View>
            <View style={styles.pointView}>
              <Icon name={'arrow-forward'} size={20} color={'black'} />
            </View>
            <View style={styles.boxForPathDetail}>
              <Text style={styles.text}>{item.endName}</Text>
            </View>
          </View>
        </>
      );
    }
    if (item.trafficType === 1) {
      return (
        <>
          <View key={subPath.indexOf(item)} style={styles.item}>
            <View>
              <Icon name={'directions-subway'} size={27} color={'black'} />
              <Text style={styles.text}> {item.lane[0].name} </Text>
              <Text style={styles.text}>{item.sectionTime}분</Text>
            </View>
            <View style={styles.boxForPathtype}>
              <Text style={styles.text}> {item.startName}역</Text>
            </View>
            <View style={styles.pointView}>
              <Icon name={'arrow-forward'} size={20} color={'black'} />
            </View>
            <View style={styles.boxForPathDetail}>
              <Text style={styles.text}>{item.endName}역</Text>
            </View>
          </View>
        </>
      );
    }
  }
  return (
    <>
      {subPath.map(item => (
        <View key={subPath.indexOf(item)}>{printEachPath(item)}</View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  item: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 10,
  },
  text: {
    color: 'black',
  },
  titletext: {
    fontWeight: 'bold',
    color: 'black',
  },
  boxForPathtype: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  boxForPathDetail: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pointView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  walk: {
    marginBottom: 10,
    marginLeft: 10,
  },
});
export default BusSubpath;
