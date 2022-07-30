import React, { createRef, FC, RefObject, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { constants } from '../../utils';
import ColoredButton, { RefProps } from '../ColoredButton';
import { addCurrentScore } from '../../store/globalSlice';
import { BoardProps } from './Board.types';
import { getRandomNumber, squaresData } from './Board.logic';
import { navigateToResultScreen } from '../../navigation/actions';

const Board: FC<BoardProps> = ({ isGameStarted }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isPlayingSequance, setIsPlayingSequance] = useState(true);
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
            setTimeout(() => {
                boxRefs.current[level].current?.startAnimation();
                if (index === levels.length - 1) {
                    setTimeout(() => setIsPlayingSequance(false), constants.LAST_SQUARE_ANIMATOIN_DELAY);
                }
            }, index * 2 * constants.ANIMATION_DURATION);
        });
    }, [levels.length])

    const addNewLevel = () => {
        const newLevel = getRandomNumber();
        setLevels([...levels, newLevel]);
    }

    const handleWrongUserInput = () => {
        setUserInput([]);
        setLevels([]);
        navigation.dispatch(navigateToResultScreen({ showModal: true }))
    }

    const renderNextLevel = () => {
        addNewLevel();
        setUserInput([]);
        dispatch(addCurrentScore());
    }

    const handleUserInput = (userChoiseIndex: number) => {
        const newUserInputState = [...userInput, userChoiseIndex];
        const currentIndex = newUserInputState.length - 1;
        if (levels[currentIndex] === newUserInputState[currentIndex]) {
            setUserInput(newUserInputState);
            if (currentIndex === levels.length - 1) {
                setIsPlayingSequance(true);
                setTimeout(() => renderNextLevel(), constants.LAST_SQUARE_ANIMATOIN_DELAY);
            }
        } else {
            handleWrongUserInput();
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
        width: (constants.COLORED_BUTTON_SIZE + (2 * constants.MARGIN_OF_SQUARE)) * constants.AMOUNT_OF_COLUMNS,
    }
})