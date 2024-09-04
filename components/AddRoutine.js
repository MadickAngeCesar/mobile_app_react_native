import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import tw from 'twrnc';

import Form from './Form';
import { fetchData } from './api';

export default function AddRoutine({ navigation }) {
    const handleSave = async (title, start_time, end_time, description) => {
        try {
            await fetchData('http://localhost:5000/api/routine', 'POST', { title, start_time, end_time, description });
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', 'Failed to save routine');
        }
    };

    return (
        <View style={[styles.container, tw`flex-1 bg-gray-900 p-4 shadow-md`]}>
            <Form section="Add a Routine" type="routine" save={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});