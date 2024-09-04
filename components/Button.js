import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import tw from 'twrnc';

export default function Button({ label, theme, onPress, style }) {
  const buttonStyles = [styles.button, tw`py-2 px-4 rounded`, buttonThemes[theme], style];
  
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const buttonThemes = {
  blue: tw`bg-blue-500`,
  red: tw`bg-red-500`,
  yellow: tw`bg-yellow-500`,
  grey: tw`bg-gray-500`,
  // Add more themes as needed
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50, // Set a consistent height
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
