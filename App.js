
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Mainstack from './src/Navigation/Mainstack';

const App = () => {
  return (
    <NavigationContainer>
      <Mainstack/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})