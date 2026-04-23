import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Header from '../../src/components/Header';
import Scheduler from '../../src/components/Scheduler';
import { theme } from '../../src/styles/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Scheduler />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
