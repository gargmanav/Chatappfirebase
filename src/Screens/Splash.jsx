import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Splash = () => {
  
    const navigation = useNavigation()
    useEffect(() => {
      setTimeout(() => {
        checkinglogin()
      }, 1000);
    }, [])
    
   const checkinglogin= async()=>{
     const id = await AsyncStorage.getItem("USERID")
     if(id == null){
      navigation.navigate("Login")
     }
     else {
      navigation.navigate("Main")
     }
   }
   
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"purple"}}>
      <Text style={{fontSize:24,fontWeight:"800"}}>Welcome To</Text>
      <Text style={{fontSize:24,fontWeight:"800"}}>Chat App</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})