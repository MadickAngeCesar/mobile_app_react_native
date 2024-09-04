import React, { useState, useEffect } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';

import Form from './Form';
import { fetchData } from './api';

export default function UpdateTask({ route, navigation }) {
    const { itemId } = route.params; // Get the taskId passed from the previous screen
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTask = async () => {
            try {
                const response = await fetchData(`http://localhost:5000/api/task/${itemId}`, 'GET');
                setInitialData({
                    title: response.title,
                    order: response.priority, // Adjusted key based on previous code
                    description: response.description,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching task data:', error);
                Alert.alert('Error', 'Failed to load task');
                setLoading(false);
            }
        };
        loadTask();
    }, [itemId]);

    const handleSave = async (title, order, description) => {
        try {
            await fetchData(`http://localhost:5000/api/task/${itemId}`, 'PUT', { title, priority: order, description });
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error updating task:', error);
            Alert.alert('Error', 'Failed to update task');
        }
    };

    if (loading) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={tw`flex-1 bg-gray-100 p-4`}>
            <View style={tw`flex-1 bg-white p-4 rounded-lg shadow-md`}>
                <Form 
                    section="Update Task" 
                    type="task" 
                    save={handleSave} 
                    initialData={initialData}
                />
            </View>
        </View>
    );
}
