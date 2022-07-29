import React, { FC, useState } from 'react';
import { Alert, Button, Modal, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { gameOver } from '../store/globalSlice';
import { addNewRecord } from '../store/persistSlice';
import { colors } from '../utils';

interface GameOverModalProps {
    isVisible: boolean;
    currentScore: number;
    onClose: () => void;
}

const GameOverModal: FC<GameOverModalProps> = ({ currentScore, isVisible, onClose }) => {
    const dispatch = useDispatch();
    const [playerName, setPlayerName] = useState('');
    const handleOnSave = () => {
        if (!playerName) {
            return Alert.alert('Player name cannot be empty!');
        }
        onClose();
        dispatch(gameOver())
        dispatch(addNewRecord({ name: playerName, score: currentScore }))
    }
    return (
        <Modal transparent animationType='slide' visible={isVisible}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
                    <Text>Your score is {currentScore}</Text>
                    <Text>Please enter your name</Text>
                    <TextInput
                        value={playerName}
                        onChangeText={setPlayerName}
                        style={styles.textInput}
                        autoFocus
                    />
                    <Button
                        onPress={handleOnSave}
                        title='Save'
                    />
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default GameOverModal;

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        backgroundColor: colors.SKY,
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        alignSelf: 'center',
    },
    textInput: {
        paddingHorizontal: 8,
        marginVertical: 12,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: colors.WHITE,
        width: 200,
        paddingVertical: 12
    },
    text: {
        color: colors.WHITE,
        fontSize: 22,
        marginVertical: 12
    }
})