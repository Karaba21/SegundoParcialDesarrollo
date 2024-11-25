import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const DestinationDetails = ({ route, navigation }) => {
  const { id } = route.params;
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/destinations/${id}`)
      .then(response => response.json())
      .then(data => setDestination(data))
      .catch(error => console.error('Error fetching destination details:', error));
  }, [id]);

  const handleDeleteDestination = () => {
    fetch(`http://localhost:8000/destinations/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        navigation.goBack(); 
      })
      .catch(error => console.error('Error al eliminar el destino:', error));
  };

  if (!destination) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{destination.name} Details:</Text>
      <Text style={styles.description}>Description: {destination.description}</Text>
      <Text style={styles.description}>Difficulty: {destination.difficulty}</Text>
      <Text style={styles.description}>Favorites: {destination.favorites}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditDestination', { id })}
          style={[styles.button, styles.editButton]}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteDestination} 
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DestinationDetails;
