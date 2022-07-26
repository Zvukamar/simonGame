import React, { FC, useEffect, useRef, useState } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';
import { colors, constants } from '../utils';
import ColoredButton, { RefProps } from './ColoredButton';

interface BoardProps {
    isGameStarted: boolean;
}

const colorSquare: ColorValue[] = [colors.RED, colors.GREEN, colors.BLUE, colors.GRAY];

const Board: FC<BoardProps> = ({ isGameStarted }) => {
    const [levels, setLevels] = useState<number[]>([]);
    const [userInput, setUserInput] = useState<number[]>([]);
    const boxRefs = colorSquare.map(_ => useRef<RefProps>(null));

    useEffect(() => {
        addNewLevel();
    }, []);

    useEffect(() => {
        levels.forEach((level, index) => {
            setTimeout(() => {
                boxRefs[level].current?.startAnimation()
            }, index * 2 * constants.ANIMATION_DURATION);
        });
    }, [levels.length])

    const addNewLevel = () => {
        const newLevel = Math.floor((Math.random() * colorSquare.length));
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
            }
        } else {
            console.log('game over modal');
        }
    }

    return (
        <View style={styles.container}>
            {colorSquare.map((color, index) => (
                <ColoredButton
                    key={color.toString()}
                    ref={boxRefs[index]}
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