import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Text, Platform } from 'react-native';
import ButtonComponent from '../Components/ButtonComponent';
import { Picker } from '@react-native-picker/picker';


const AddDestination = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [favorites, setFavorites] = useState('');

  const handleAddDestination = () => {
    const newDestination = {
      name: name.trim(),
      description: description.trim(),
      difficulty,
      favorites: parseInt(favorites) || 0,
    };

    fetch('http://localhost:8000/destinations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDestination),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar el destino');
        }
        return response.json();
      })
      .then(() => {
        navigation.navigate('DestinationsView'); 
      })
      .catch(error => console.error('Error al agregar el destino:', error));
  };

  const difficultyOptions = ['Fácil', 'Moderada', 'Difícil'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Destination Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Picker
            selectedValue={difficulty}
            onValueChange={(itemValue) => setDifficulty(itemValue)}
            style={styles.input}
        >
            {difficultyOptions.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
            ))}
        </Picker>
      <TextInput
        placeholder="Favorites"
        value={favorites}
        onChangeText={setFavorites}
        style={styles.input}
        keyboardType="numeric"
      />
      
      <TouchableOpacity onPress={handleAddDestination} style={styles.addButton}>
        <Text style={styles.buttonText}>Agregar Destino</Text>
      </TouchableOpacity>
        
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AddDestination;
