import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import ButtonComponent from '../Components/ButtonComponent';
import { Picker } from '@react-native-picker/picker';


const EditDestination = ({ route, navigation }) => {
  const { id, onUpdateDestination } = route.params; 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [favorites, setFavorites] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/destinations/${id}`)
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setDescription(data.description);
        setDifficulty(data.difficulty.toString());
        setFavorites(data.favorites.toString());
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleEditDestination = () => {
    const updatedDestination = {
      name,
      description,
      difficulty,
      favorites: parseInt(favorites)
    };

    fetch(`http://localhost:8000/destinations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDestination)
    })
      .then(response => response.json())
      .then(data => {
        if (onUpdateDestination) {
          onUpdateDestination(data);
        }
        navigation.goBack(); 
      })
      .catch(error => console.error(error));
  };
  
  const difficultyOptions = ['Fácil', 'Moderada', 'Difícil'];

  return (
    <View style={{ padding: 20 }}>
        <TextInput placeholder="Destination Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
        <Picker
            selectedValue={difficulty}
            onValueChange={(itemValue) => setDifficulty(itemValue)}
            style={styles.input}
        >
            {difficultyOptions.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
            ))}
        </Picker>
        <TextInput placeholder="Favorites" value={favorites} onChangeText={setFavorites} style={styles.input} />
        
        <ButtonComponent
            title={Platform.OS === 'android' ? 'Guardar Cambios' : 'Actualizar Destino'}
            onPress={handleEditDestination}
        />
    </View> 
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10
  }
});

export default EditDestination;
