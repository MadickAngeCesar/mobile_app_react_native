import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';

import { fetchData } from './api';
import Title from './Title';
import Button from './Button';
import Card from './Card';

export default function HomeScreen({ navigation }) {
    const [routines, setRoutines] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchRoutines();
        fetchTasks();
    }, []);

    const fetchRoutines = async () => {
        try {
            const data = await fetchData('http://localhost:5000/api/routines');
            setRoutines(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch routines');
        }
    };

    const fetchTasks = async () => {
        try {
            const data = await fetchData('http://localhost:5000/api/tasks');
            setTasks(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch tasks');
        }
    };

    const deleteItem = async (type, id) => {
        try {
            await fetchData(`http://localhost:5000/api/${type}/${id}`, 'DELETE');
            type === 'routine' ? fetchRoutines() : fetchTasks(); // Refresh list
        } catch (error) {
            Alert.alert('Error', `Failed to delete ${type}`);
        }
    };

    return (
        <View style={[styles.container, tw`bg-gray-900`]}>
            <ScrollView contentContainerStyle={tw`px-4 py-6`}>
                <Title txt="Daily Routine" />
                <Button
                    label="Add a Routine"
                    theme="blue"
                    onPress={() => navigation.navigate('AddRoutine')}
                    style={tw`mb-4`}
                />
                {routines.map(routine => (
                    <Card
                        key={routine.id}
                        id={routine.id}
                        title={routine.title}
                        order={`${routine.start_time} - ${routine.end_time}`}
                        description={routine.description}
                        edit={() => navigation.navigate('UpdateRoutine', { itemId: routine.id })}
                        onDelete={() => deleteItem('routine', routine.id)}
                    />
                ))}

                <View style={tw`my-2`} /> 

                <Title txt="Day's Task" />
                <Button
                    label="Add a Task"
                    theme="blue"
                    onPress={() => navigation.navigate('AddTask')}
                    style={tw`mb-4`}
                />
                {tasks.map(task => (
                    <Card
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        order={task.priority}
                        description={task.description}
                        edit={() => navigation.navigate('UpdateTask', { itemId: task.id })}
                        onDelete={() => deleteItem('task', task.id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});