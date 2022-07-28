import React, { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { getScoreTableSelector } from '../store/globalSelectors';
import { colors } from '../utils';

const HighScoreBoard: FC = () => {
    const scoreTable = useSelector(getScoreTableSelector);
    return (
        <View style={styles.container}>
            <View style={styles.boardHeader}>
                <Text style={styles.boardText}>Rank</Text>
                <Text style={styles.boardText}>Name</Text>
                <Text style={styles.boardText}>Score</Text>
            </View>
            <ScrollView style={styles.boardScrollview}>
                {scoreTable.slice(0, 10).map((userScore, index) => (
                    <View key={userScore.gameId} style={styles.boardRow}>
                        <Text style={styles.boardText}>{index + 1}</Text>
                        <Text style={styles.boardText}>{userScore.name}</Text>
                        <Text style={styles.boardText}>{userScore.score}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default HighScoreBoard;

const styles = StyleSheet.create({
    container: {
        height: 400
    },
    boardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.RED,
        borderWidth: 1,
        paddingVertical: 8,
    },
    boardScrollview: {
        borderWidth: 1,
        backgroundColor: colors.PINK
    },
    boardRow: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginVertical: 8
    },
    boardText: {
        flex: 1,
        textAlign: 'center'
    },
})