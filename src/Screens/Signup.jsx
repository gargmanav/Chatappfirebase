import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import CallModal from '../Components/CallModal';

export default function Signup(props) {
  const [name, setname] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  // const [showmodal, setshowmodal] = useState(false)
  const navigation = useNavigation();

  const registoruser = () => {
    const userid = uuid.v4();
    firestore()
      .collection('users')
      .doc(userid)
      .set({
        name: name,
        mobile: mobile,
        password: password,
        email: email,
        userid: userid,
      })
      .then(res => {
        console.log('data created');
        navigation.navigate("Login")
        cleartext()
      })
      .catch(err => {
        console.log(err);
      });
  };

  const cleartext=()=>{
    setname("")
    setemail("")
    setmobile("")
    setpassword("")
    setconfirmpassword("")
  }

  const validate=()=>{
    let isvalid = true;
    if(name === "")isvalid = false;
    if(mobile === "")isvalid = false;
    if(email === "")isvalid = false;
    if(password === "")isvalid = false;
    if(confirmpassword !== password )isvalid = false;
    return isvalid
  }
      console.log(validate());
  return (
    <View style={{flex: 1, backgroundColor: 'purple'}}>
      <Text
        style={{
          paddingTop: 50,
          alignSelf: 'center',
          fontSize: 24,
          fontWeight: '800',
          color: '#fff',
        }}>
        Sign Up
      </Text>
      <View
        style={{
          padding: 20,
          marginTop: 50,
          backgroundColor: '#fff',
          flex: 1,
          borderTopStartRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <TextInput
          placeholder="Name"
          style={{
            borderWidth: 1,
            marginBottom: 10,
            borderRadius: 10,
            paddingLeft: 10,
            fontSize: 20,
            color:"#000"
          }}
          placeholderTextColor="#000"
          value={name}
          onChangeText={setname}
        />
        <TextInput
          placeholder="Mobile No"
          style={{
            borderWidth: 1,
            marginBottom: 10,
            borderRadius: 10,
            paddingLeft: 10,
            fontSize: 20,
            color:"#000"
          }}
          placeholderTextColor="#000"
          keyboardType="number-pad"
          value={mobile}
          onChangeText={setmobile}
        />
        <TextInput
          placeholder="Email"
          style={{
            borderWidth: 1,
            marginBottom: 10,
            borderRadius: 10,
            paddingLeft: 10,
            fontSize: 20,
            color:"#000"
          }}
          placeholderTextColor="#000"
          value={email}
          onChangeText={setemail}
        />
        <TextInput
          placeholder="Password"
          style={{
            borderWidth: 1,
            marginBottom: 10,
            borderRadius: 10,
            paddingLeft: 10,
            fontSize: 20,
            color:"#000"
          }}
          placeholderTextColor="#000"
          value={password}
          onChangeText={setpassword}
        />
        <TextInput
          placeholder="Confirm Password"
          style={{
            borderWidth: 1,
            marginBottom: 10,
            borderRadius: 10,
            paddingLeft: 10,
            fontSize: 20,
            color:"#000",
          }}
          placeholderTextColor="#000"
          value={confirmpassword}
          onChangeText={setconfirmpassword}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'purple',
            padding: 10,
            marginTop: 20,
            borderRadius: 15,
          }}
          onPress={() =>  {
            if(validate()){
              registoruser()
            }
            else{
              Alert.alert("Please enter correct Data")
            }
          }}>
          <Text style={{textAlign: 'center', fontSize: 20, color: '#fff'}}>
            Sign Up
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{backgroundColor:"purple",padding:10,marginTop:20,borderRadius:15}} onPress={()=>setshowmodal(!showmodal)}>
            <Text style={{textAlign:"center",fontSize:20,color:"#fff"}}>Showmodal</Text>
        </TouchableOpacity> */}
        {/* {showmodal ? <CallModal/> : null} */}
        <Text
          style={{
            textAlign: 'center',
            marginTop: 22,
            fontSize: 15,
            alignItems: 'center',
            justifyContent: 'center',
            color:"#000"
          }}>
          Already have an account click here
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: 'red'}}>&nbsp;&nbsp;&nbsp;Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
