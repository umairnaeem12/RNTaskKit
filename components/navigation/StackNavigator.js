import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlatlistData from '../screens/FlatlistData';
import AudioPlayer from '../screens/AudioPlayer';
import ImageUpload from '../screens/ImageUpload';
import UserList from '../screens/UserList';
import Welcome from '../screens/Welcome';

const StackNavigation  = () => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="FlatlistData" component={FlatlistData} />
                <Stack.Screen name="AudioPlayer" component={AudioPlayer} />
                <Stack.Screen name="ImageUpload" component={ImageUpload} />
                <Stack.Screen name="UserList" component={UserList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigation;