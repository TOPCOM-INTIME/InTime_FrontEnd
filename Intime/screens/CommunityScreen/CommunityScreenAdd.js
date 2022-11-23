
import React from 'react';
import { StyleSheet, ScrollView, View, Text, Button } from 'react-native';

function CommunityScreenAdd() {
    return (
        <View>
            <Text>
                Add component
            </Text>
        </View>
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
    form: {
        marginTop: 80,
        width: '100%',
        paddingHorizontal: 16,
    },
    button: {
        flexDirection: 'row-reverse',
        margin: 15,
    },
});

export default CommunityScreenAdd;
