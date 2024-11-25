import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

const ButtonComponent = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        style,
        Platform.OS === 'android' ? styles.androidButton : styles.iosButton,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          Platform.OS === 'android' ? styles.androidButtonText : styles.iosButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  androidButton: {
    backgroundColor: '#0000FF', 
    alignSelf: 'flex-start', 
  },
  iosButton: {
    backgroundColor: '#008000', 
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  androidButtonText: {
    color: '#000000', 
  },
  iosButtonText: {
    color: '#FFFFFF', 
  },
});

export default ButtonComponent;
