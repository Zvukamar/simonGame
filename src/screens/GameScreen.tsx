import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../components/Board';
import HeaderText from '../components/HeaderText';
import { getCurrentScoreSelector, isGameStartedSelector } from '../store/globalSelectors';
import { startGame } from '../store/globalSlice';
import { colors } from '../utils';

const GameScreen = () => {
    const dispatch = useDispatch();
    const isGameStarted = useSelector(isGameStartedSelector);
    const handleStartGame = () => dispatch(startGame());
    const currentScore = useSelector(getCurrentScoreSelector);

    return (
        <View style={styles.container}>
            <HeaderText text={`Score: ${currentScore}`} />
            <Board isGameStarted={isGameStarted} />
            {!isGameStarted && (
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={handleStartGame}
                        title='Start Game'
                    />
                </View>
            )}
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
    },
    buttonContainer: {
        marginVertical: 10
    }
})