
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DestinationViews from './src/Pages/DestinationViews';
import EditDestination from './src/Pages/EditDestination';
import DestinationDetails from './src/Pages/DestinationDetails';
import AddDestination from './src/Pages/AddDestination';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DestinationViews">
      <Stack.Screen
          name="DestinationViews"
          component={DestinationViews}
          options={{ title: 'Destinations' }}
        />
        <Stack.Screen
          name="DestinationDetails"
          component={DestinationDetails}
          options={{ title: 'Destination Details' }}
        />
        <Stack.Screen
          name="EditDestination"
          component={EditDestination}
          options={{ title: 'Edit Destination' }}
        />
        <Stack.Screen
          name="AddDestination"
          component={AddDestination}
          options={{ title: 'Add Destination' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

