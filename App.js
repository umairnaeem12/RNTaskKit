import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigation from './components/navigation/StackNavigator'
import { Provider } from 'react-redux';
import { store } from '../RNTaskKit/components/redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})