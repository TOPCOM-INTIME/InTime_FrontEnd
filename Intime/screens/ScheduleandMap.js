import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Map_Marker from './Map_Marker';
import Icon from 'react-native-vector-icons/MaterialIcons';

function ScheduleandMap() {
    return (
        <>
            <View style={styles.container}>
                <View >
                    <View >
                        <Text style={styles.sectionTitle}>일정</Text>
                        <View
                            style={{
                                borderRadius: 10,
                                borderColor: '#ED3648',
                                borderWidth: 3,
                                justifyContent: 'flex-start',
                                flexDirection: 'row',
                            }}
                        >
                            <Icon name="face" size={36} />
                            <Icon name="face" size={36} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flex: 7 }}>
                <Map_Marker></Map_Marker>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
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
});

export default ScheduleandMap;
