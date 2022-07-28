import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MAIN_STACK_ROUTES } from './routes';
import { GameScreen, ResultsScreen } from '../screens';
import { MainStackProps } from './types';

const Stack = createNativeStackNavigator<MainStackProps>();

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            presentation: 'modal'
        }}>
            <Stack.Screen
                name={MAIN_STACK_ROUTES.GAME_SCREEN}
                component={GameScreen}
            />
            <Stack.Screen
                name={MAIN_STACK_ROUTES.RESULT_SCREEN}
                component={ResultsScreen}
            />
        </Stack.Navigator>
    );
}

export default MainStack;