import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import tw from 'twrnc';

import Form from './Form';
import { fetchData } from './api';

const UpdateRoutine = ({ route, navigation }) => {
    const { itemId } = route.params;
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchRoutine = async () => {
            try {
                const data = await fetchData(`http://localhost:5000/api/routine/${itemId}`);
                setInitialData({
                    title: data.title,
                    start_time: data.start_time,
                    end_time: data.end_time,
                    description: data.description,
                });
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch routine');
            }
        };
        fetchRoutine();
    }, [itemId]);

    const handleSave = async (title, start_time, end_time, description) => {
        try {
            await fetchData(`http://localhost:5000/api/routine/${itemId}`, 'PUT', { title, start_time, end_time, description });
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', 'Failed to update routine');
        }
    };

    return (
        <View style={[styles.container, tw`flex-1 bg-gray-900 p-4 shadow-md`]}>
            {initialData && (
                <Form
                    section="Update Routine"
                    type="routine"
                    save={handleSave}
                    initialData={initialData}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UpdateRoutine;
