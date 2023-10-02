import { View, Text ,TextInput,TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Loader from '../Components/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
 export default function Login() {
   
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [visible, setvisible] = useState(false)
  const loginUser = async () => {
    setvisible(true)
    try {
        const res = await firestore()
            .collection("users")
            .where("email", "==", email)
            .get();
            
        if (res.docs) {
          console.log(res.docs[0].exists);
            setvisible(false)
            gotonext(
              res.docs[0].data().name,
              res.docs[0].data().email,
              res.docs[0].data().userid,
            )
        } else {
          Alert.alert("No user found")

        }
    } catch (err) {
      setvisible(false)
        console.error(err);
        Alert.alert("No user found")
    }
};


  const gotonext=async(name,email,userid)=>{
    await AsyncStorage.setItem("NAME",name)
    await AsyncStorage.setItem("EMAIL",email)
    await AsyncStorage.setItem("USERID",userid)
    navigation.navigate("Main")
  }

    const navigation = useNavigation()
  return (
    <View style={{flex:1,backgroundColor:"purple"}}>
        <Text style={{paddingTop:50,alignSelf:"center",fontSize:24,fontWeight:"800",color:"#fff"}}>Login</Text>
      <View style={{padding:20,marginTop:50,backgroundColor:"#fff",flex:1,borderTopStartRadius:20,borderTopRightRadius:20}}>

        <TextInput placeholder='Email' style={{borderWidth:1,marginBottom:10,borderRadius:10,paddingLeft:10,fontSize:20,color:"#000"}} value={email} onChangeText={setemail} placeholderTextColor="#000"/>
        <TextInput placeholder='Password' style={{borderWidth:1,marginBottom:10,borderRadius:10,paddingLeft:10,fontSize:20,color:"#000"}} value={password} onChangeText={setpassword} placeholderTextColor="#000"/>
     
        <TouchableOpacity style={{backgroundColor:"purple",padding:10,marginTop:20,borderRadius:15}} onPress={()=>loginUser()}>
            <Text style={{textAlign:"center",fontSize:20,color:"#fff"}}>Login</Text>
        </TouchableOpacity>

        
            <Text style={{textAlign:"center",marginTop:22,fontSize:15,color:"#000"}}>
                New user registor here
                <TouchableOpacity onPress={()=>navigation.navigate("Signup")}>
                <Text style={{color:"red"}}>Signup</Text>
                </TouchableOpacity>
            </Text>
        <Loader visible={visible}/>
      </View>
    </View>
  )
}