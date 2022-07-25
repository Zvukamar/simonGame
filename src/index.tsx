import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Text>asdasd</Text>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
