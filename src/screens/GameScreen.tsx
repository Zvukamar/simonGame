import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../components/Board';
import { isGameStartedSelector } from '../store/globalSelectors';
import { startGame } from '../store/globalSlice';
import { colors } from '../utils';

const GameScreen = () => {
    const dispatch = useDispatch();
    const isGameStarted = useSelector(isGameStartedSelector);
    const handleStartGame = () => dispatch(startGame());
    return (
        <View style={styles.container}>
            <Board isGameStarted={isGameStarted} />
            {!isGameStarted && <Button onPress={handleStartGame} title='Start Game' />}
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    }
})