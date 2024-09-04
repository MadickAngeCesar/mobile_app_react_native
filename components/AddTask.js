import React from 'react';
import { View, Alert } from 'react-native';
import tw from 'twrnc';

import Form from './Form';
import { fetchData } from './api';

export default function AddTask({ navigation }) {
    const handleSave = async (title, order, description) => {
        try {
            await fetchData('http://localhost:5000/api/task', 'POST', { title, priority: order, description });
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error saving task:', error);
            Alert.alert('Error', 'Failed to save task');
        }
    };

    return (
        <View style={tw`flex-1 bg-gray-100 p-4`}>
            <View style={tw`flex-1 bg-white p-4 rounded-lg shadow-md`}>
                <Form 
                    section="Add a Task" 
                    type="task" 
                    save={handleSave} 
                />
            </View>
        </View>
    );
}
