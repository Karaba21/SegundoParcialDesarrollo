import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const DestinationCard = ({ destination, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ padding: 20 }}>
      <Text>{destination.name}</Text>
    </View>
  </TouchableOpacity>
);

export default DestinationCard;
