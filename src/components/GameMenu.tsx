import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { MAIN_STACK_ROUTES } from '../navigation/routes';
import { startGame } from '../store/globalSlice';

interface GameMenuProps {
    isGameStarted: boolean;
}

const GameMenu: FC<GameMenuProps> = ({ isGameStarted }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const handleStartGame = () => dispatch(startGame());
    const navigateToHighScore = () => navigation.navigate(MAIN_STACK_ROUTES.RESULT_SCREEN);
    if (isGameStarted) return null;
    return (
        <View style={styles.buttonContainer}>
            <Button
                onPress={handleStartGame}
                title='Start Game'
            />
            <Button
                onPress={navigateToHighScore}
                title='High Score'
            />
        </View>
    );
}

export default GameMenu;

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 10
    }
})