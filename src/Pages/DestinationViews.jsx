import React, { useCallback, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import ButtonComponent from '../Components/ButtonComponent';
import { useFocusEffect } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const DestinationViews = ({ navigation }) => {
  const [destinations, setDestinations] = useState([]);

useFocusEffect(
    useCallback(() => {
        fetch('http://localhost:8000/destinations', {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => b.favorites - a.favorites);
                setDestinations(sortedData);
            })
            .catch(error => console.error('Error fetching destinations:', error));
    }, [])
);

    const getDifficultyTag = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'fácil':
                return styles.easyTag;
            case 'moderada':
                return styles.moderateTag;
            case 'difícil':
                return styles.hardTag;
            default:
                return styles.defaultTag;
        }
    };

return (
    <View style={styles.container}>
        <Text style={styles.title}>Viajes UCU</Text>
        <View style={styles.buttonContainer}>
            <ButtonComponent
                title={Platform.OS === 'android' ? 'Nuevo Destino' : 'Crear Destino'}
                onPress={() => navigation.navigate('AddDestination')}
                style={[styles.addButtonBase, Platform.OS === 'android' ? styles.androidAddButton : styles.iosAddButton]}
            />
        </View>
        <FlatList
            data={destinations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DestinationDetails', { id: item.id })}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={getDifficultyTag(item.difficulty)}>{item.difficulty}</Text>
                </TouchableOpacity>
            )}
            contentContainerStyle={styles.list}
        />
    </View>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    margin: 20,
    maxWidth: screenWidth * 0.85, 
    alignSelf: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  androidAddButton: {
    backgroundColor: '#0000FF', 
    alignSelf: 'flex-start', 
  },
  iosAddButton: {
    backgroundColor: '#008000', 
    alignSelf: 'flex-end', 
  },
  orderButton: {
    backgroundColor: '#33B5FF',
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
  },
  buttonSpacer: {
    width: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  defaultTag: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
},
easyTag: {
    backgroundColor: 'green',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
},
moderateTag: {
    backgroundColor: 'yellow',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
},
hardTag: {
    backgroundColor: 'violet',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
},
});

export default DestinationViews;
