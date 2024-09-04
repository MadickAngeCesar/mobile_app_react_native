import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

import Button from './Button';
import Title from './Title';

export default function Form({ section, type, save, initialData }) {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [order, setOrder] = useState('');
  const [start_time, setStartTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      // Populate form fields with initial data for update
      setTitle(initialData.title || '');
      setOrder(initialData.order || '');
      setStartTime(initialData.start_time || '');
      setEndTime(initialData.end_time || '');
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!title || !description || (type === 'routine' && (!start_time || !end_time)) || (type !== 'routine' && !order)) {
        Alert.alert('Error', 'All fields are required');
        return;
    }

    try {
      // Determine if we are adding or updating
      if (initialData) {
        // Update operation
        await save(title, start_time, end_time, description, order); // Update
      } else {
        // Add operation
        await save(title, start_time, end_time, description, order); // Add
      }
      Alert.alert('Success', `Routine ${initialData ? 'updated' : 'added'} successfully!`);
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', `Failed to ${initialData ? 'update' : 'add'} routine`);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={tw`flex-1 p-4 bg-white rounded-lg shadow-md p-4 my-2 mx-4`}
    >
      <ScrollView style={tw`flex-1`}>
        <Title txt={section} />
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-semibold text-gray-800`}>Title</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-2 mt-1`}
            placeholder="Enter your title"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {type === 'routine' && (
          <View style={tw`mb-4`}>
            <Text style={tw`text-lg font-semibold text-gray-800`}>Start Time</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-2 mt-1`}
              placeholder="HH:MM"
              value={start_time}
              onChangeText={setStartTime}
            />
            <Text style={tw`text-lg font-semibold text-gray-800`}>End Time</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-2 mt-1`}
              placeholder="HH:MM"
              value={end_time}
              onChangeText={setEndTime}
            />
          </View>
        )}

        {type !== 'routine' && (
          <View style={tw`mb-4`}>
            <Text style={tw`text-lg font-semibold text-gray-800`}>Order</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-2 mt-1`}
              placeholder="Enter your order"
              value={order}
              onChangeText={setOrder}
            />
          </View>
        )}

        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-semibold text-gray-800`}>Description</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-2 mt-1`}
            placeholder="Enter your description"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={tw`my-2`} />

        <View style={tw`flex-1 justify-end`}>
          <Button label="Save" theme="blue" onPress={handleSubmit} />
          <View style={tw`my-2`} /> {/* Spacer between Save and Cancel buttons */}
          <Button label="Cancel" theme="grey" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
