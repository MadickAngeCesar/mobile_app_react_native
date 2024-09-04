import React from 'react';
import { View, Text, Button } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Tail() {
  return (
    <StyledView className="flex-1 justify-center items-center bg-gray-100">
      <StyledText className="text-lg font-bold text-blue-600">Hello, Nativewind!</StyledText>
      <Button title="Press me" color="#3b82f6" onPress={() => alert('Button pressed!')} />
    </StyledView>
  );
}
