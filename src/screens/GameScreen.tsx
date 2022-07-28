import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Board from '../components/Board';
import GameMenu from '../components/GameMenu';
import HeaderText from '../components/HeaderText';
import { getCurrentScoreSelector, isGameStartedSelector } from '../store/globalSelectors';
import { colors } from '../utils';

const GameScreen = () => {
    const isGameStarted = useSelector(isGameStartedSelector);
    const currentScore = useSelector(getCurrentScoreSelector);
    return (
        <View style={styles.container}>
            <HeaderText text={`Score: ${currentScore}`} />
            <Board isGameStarted={isGameStarted} />
            <GameMenu isGameStarted={isGameStarted} />
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