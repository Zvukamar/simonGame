import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MAIN_STACK_ROUTES } from './routes';
import { GameScreen } from '../screens';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={MAIN_STACK_ROUTES.GAME_SCREEN}
                component={GameScreen}
            />
        </Stack.Navigator>
    );
}

export default MainStack;