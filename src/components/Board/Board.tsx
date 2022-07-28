import React, { createRef, FC, RefObject, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { constants } from '../../utils';
import ColoredButton, { RefProps } from '../ColoredButton';
import { addCurrentScore } from '../../store/globalSlice';
import { MAIN_STACK_ROUTES } from '../../navigation/routes';
import { BoardProps } from './Board.types';
import { squaresData } from './Board.logic';

const Board: FC<BoardProps> = ({ isGameStarted }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isPlayingSequance, setIsPlayingSequance] = useState(false);
    const [levels, setLevels] = useState<number[]>([]);
    const [userInput, setUserInput] = useState<number[]>([]);
    const boxRefs = useRef<RefObject<RefProps>[]>([]);

    useEffect(() => {
        squaresData.forEach((_, index) => boxRefs.current[index] = createRef());
    }, []);

    useEffect(() => {
        isGameStarted && addNewLevel();
    }, [isGameStarted]);

    useEffect(() => {
        levels.forEach((level, index) => {
            setIsPlayingSequance(true);
            setTimeout(() => {
                boxRefs.current[level].current?.startAnimation();
                if (index === levels.length - 1) {
                    setTimeout(() => {
                        setIsPlayingSequance(false);
                    }, 1000);
                }
            }, index * 2 * constants.ANIMATION_DURATION);
        });
    }, [levels.length])

    const addNewLevel = () => {
        const newLevel = Math.floor((Math.random() * 100 % squaresData.length));
        setLevels([...levels, newLevel]);
    }

    const handleUserInput = (userChoiseIndex: number) => {
        const newUserInputState = [...userInput, userChoiseIndex];
        const currentIndex = newUserInputState.length - 1;
        if (levels[currentIndex] === newUserInputState[currentIndex]) {
            setUserInput(newUserInputState);
            if (currentIndex === levels.length - 1) {
                setTimeout(() => {
                    addNewLevel();
                    setUserInput([]);
                    dispatch(addCurrentScore());
                }, 500);
            }
        } else {
            setUserInput([]);
            setLevels([]);
            navigation.navigate(MAIN_STACK_ROUTES.RESULT_SCREEN, { showModal: true });
        }
    }

    return (
        <View style={styles.container}>
            {squaresData.map((square, index) => (
                <ColoredButton
                    disabled={!isGameStarted || isPlayingSequance}
                    key={square.color.toString()}
                    ref={boxRefs.current[index]}
                    color={square.color}
                    index={index}
                    onPress={handleUserInput}
                    soundPath={square.sound}
                />
            ))}
        </View>
    )
}

export default Board;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: constants.COLORED_BUTTON_SIZE * constants.AMOUNT_OF_COLUMNS,
    }
})