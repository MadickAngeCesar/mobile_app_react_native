import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import tw from 'twrnc';

import Form from './Form';
import { fetchData } from './api';

export default function AddTask({ navigation }) {
    const handleSave = async (title, order, description) => {
        const priority = order;
        try {
            await fetchData('http://localhost:5000/api/task', 'POST', { title, priority, description });
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', 'Failed to save task');
        }
    };

    return (
        <View style={[styles.container, tw`flex-1 bg-gray-900 p-4 shadow-md`]}>
            <Form section="Add a Task" type="task" save={handleSave} />        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
