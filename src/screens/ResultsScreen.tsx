import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import GameOverModal from '../components/GameOverModal';
import HeaderText from '../components/HeaderText';
import HighScoreBoard from '../components/HighScoreBoard';
import { StackScreenProps } from '../navigation/types';
import { getCurrentScoreSelector } from '../store/globalSelectors';
import { resetGame } from '../store/globalSlice';
import { colors } from '../utils';

const ResultsScreen = ({ navigation, route }: StackScreenProps) => {
    const dispatch = useDispatch();
    const showModal = route.params?.showModal;
    const [isModalVisible, setIsModalVisible] = useState(!!showModal);

    const currentScore = useSelector(getCurrentScoreSelector);

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
                <HighScoreBoard />
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