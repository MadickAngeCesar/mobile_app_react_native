import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from 'twrnc';

import Button from './Button';

export default function Card({ id, title, order, description, edit, onDelete }) {
    return (
        <View style={[tw`bg-white rounded-lg p-4 my-2 mx-4`, styles.card]}>
            <View style={tw`mb-4`}>
                <Text style={tw`text-lg font-bold text-gray-800`}>{title}</Text>
                <Text style={tw`text-sm text-gray-600 mb-1`}>{order}</Text>
                <Text style={tw`text-xs text-gray-500`}>{description}</Text>
            </View>
            <View style={tw`flex-row justify-between items-center`}>
                <Button
                    label="Edit"
                    theme="yellow"
                    onPress={edit}
                    style={tw`flex-1 mr-1`} // Flex 1 for equal width distribution and margin-right for spacing
                />
                <Button
                    label="Delete"
                    theme="red"
                    onPress={() => onDelete(id)} // Pass id to delete function
                    style={tw`flex-1 ml-1`} // Flex 1 for equal width distribution and margin-left for spacing
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        marginVertical: 8,
      },
});
