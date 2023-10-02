import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import Splash from '../Screens/Splash';
import Main from '../Screens/Main';
import Chat from '../Screens/Chat';
import Settings from '../Tabs/Settings';
 
const Stack = createStackNavigator();
const Mainstack = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
    <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
    <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
    <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
    <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
    <Stack.Screen name='Main' component={Main} options={{headerShown:false}}/>
    <Stack.Screen name='Chat' component={Chat} options={{headerShown:true}}/>
    <Stack.Screen name='Setting' component={Settings} options={{headerShown:true}} />
    </Stack.Navigator>
  )
}

export default Mainstack

const styles = StyleSheet.create({})