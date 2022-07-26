import React, { createRef, FC, RefObject, useEffect, useRef, useState } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addCurrentScore } from '../store/globalSlice';
import { colors, constants } from '../utils';
import ColoredButton, { RefProps } from './ColoredButton';

interface BoardProps {
    isGameStarted: boolean;
}

const colorSquare: ColorValue[] = [colors.RED, colors.GREEN, colors.BLUE, colors.PURPLE];

const Board: FC<BoardProps> = ({ isGameStarted }) => {
    const dispatch = useDispatch();
    const [isPlayingSequance, setIsPlayingSequance] = useState(false);
    const [levels, setLevels] = useState<number[]>([]);
    const [userInput, setUserInput] = useState<number[]>([]);
    const boxRefs = useRef<RefObject<RefProps>[]>([]);

    useEffect(() => {
        colorSquare.forEach((_, index) => boxRefs.current[index] = createRef());
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
                    setIsPlayingSequance(false);
                }
            }, index * 2 * constants.ANIMATION_DURATION);
        });
    }, [levels.length])

    const addNewLevel = () => {
        const newLevel = Math.floor((Math.random() * 100 % colorSquare.length));
        setLevels([...levels, newLevel]);
    }

    const handleUserInput = (userChoiseIndex: number) => {
        const newUserInputState = [...userInput, userChoiseIndex];
        const currentIndex = newUserInputState.length - 1;
        if (levels[currentIndex] === newUserInputState[currentIndex]) {
            setUserInput(newUserInputState);
            if (currentIndex === levels.length - 1) {
                addNewLevel();
                setUserInput([]);
                dispatch(addCurrentScore());
            }
        } else {
            console.log('game over modal');
        }
    }

    return (
        <View style={styles.container}>
            {colorSquare.map((color, index) => (
                <ColoredButton
                    disabled={!isGameStarted || isPlayingSequance}
                    key={color.toString()}
                    ref={boxRefs.current[index]}
                    color={color}
                    index={index}
                    onPress={handleUserInput}
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