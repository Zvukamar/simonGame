import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MAIN_STACK_ROUTES } from './routes';
import { HomeScreen } from '../screens';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={MAIN_STACK_ROUTES.HOME_SCREEN}
                component={HomeScreen}
            />
        </Stack.Navigator>
    );
}

export default MainStack;