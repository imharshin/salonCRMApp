import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../src/components/Header';
import Scheduler from '../src/components/Scheduler';
import { theme } from '../src/styles/theme';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Scheduler />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
