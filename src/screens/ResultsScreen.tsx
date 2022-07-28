import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import GameOverModal from '../components/GameOverModal';
import HeaderText from '../components/HeaderText';
import { StackScreenProps } from '../navigation/types';
import { getCurrentScoreSelector, getScoreTableSelector } from '../store/globalSelectors';
import { resetGame } from '../store/globalSlice';
import { colors } from '../utils';

const ResultsScreen = ({ navigation, route }: StackScreenProps) => {
    const dispatch = useDispatch();
    const showModal = route.params?.showModal;
    const [isModalVisible, setIsModalVisible] = useState(!!showModal);

    const currentScore = useSelector(getCurrentScoreSelector);
    const scoreTable = useSelector(getScoreTableSelector);

    const startAgain = () => {
        dispatch(resetGame());
        navigation.goBack();
    }

    const handleOnClose = () => setIsModalVisible(false);

    return (
        <View style={[styles.container, isModalVisible && { backgroundColor: '#00000050' }]}>
            <View style={styles.topContainer}>
                <HeaderText
                    customTextStyle={styles.customHeaderTitle}
                    text='Best Score Table'
                />
                <View style={styles.scoreBoardContainer}>
                    <View style={styles.scoreBoardHeader}>
                        <Text>Rank</Text>
                        <Text>Name</Text>
                        <Text>Score</Text>
                    </View>
                    <ScrollView style={styles.scoreBoardScrollview}>
                        {scoreTable.slice(0, 10).map((userScore, index) => (
                            <View key={userScore.gameId} style={styles.scoreBoardRow}>
                                <Text style={styles.scoreBoardText}>{index + 1}</Text>
                                <Text style={styles.scoreBoardText}>{userScore.name}</Text>
                                <Text style={styles.scoreBoardText}>{userScore.score}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={startAgain}
                    title='Close'
                />
            </View>
            <GameOverModal
                onClose={handleOnClose}
                isVisible={isModalVisible}
                currentScore={currentScore}
            />
        </View>
    );
}

export default ResultsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: colors.WHITE,
    },
    topContainer: {
        justifyContent: 'center'
    },
    scoreBoardContainer: {
        height: 400
    },
    scoreBoardHeader: {
        borderWidth: 1,
        paddingVertical: 8,
        flexDirection: 'row',
        backgroundColor: colors.RED,
        justifyContent: 'space-around'
    },
    scoreBoardScrollview: {
        borderWidth: 1,
        backgroundColor: colors.PINK
    },
    scoreBoardRow: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginVertical: 8
    },
    scoreBoardText: {
        flex: 1,
        textAlign: 'center'
    },
    buttonContainer: {
        marginVertical: 16
    },
    customHeaderTitle: {
        fontSize: 18,
        alignSelf: 'center',
        textDecorationLine: 'underline'
    },
    text: {
        color: colors.BLACK,
        fontSize: 22,
        marginVertical: 12
    }
})